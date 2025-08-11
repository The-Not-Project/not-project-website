import { getSession } from "@auth0/nextjs-auth0/edge";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { getUser } from "./user.repository";
import {
  deleteStoryCategories,
  getStoryData,
  processCategories,
  processStories,
  processStory,
  processThumbnail,
  STORY_INCLUDE,
} from "../helpers/story.helpers";
import { Filters, RawStory, Story } from "../../types/types";

/**
 * Fetch published stories with optional filters.
 *
 * Filters:
 * - search: substring match on title
 * - boroughs: filter by one or more boroughs
 * - categories: stories that have at least one of the given category IDs
 *
 * Notes:
 * - Only `isPublished: true` stories are returned.
 * - No pagination or ordering applied; add `orderBy`, `skip`, `take` upstream if needed.
 */
export async function getStories(filters?: Filters): Promise<Story[]> {
  "use server";

  const { search, boroughs, categories } = filters || {};

  const stories = await prisma.story.findMany({
    where: {
      isPublished: true,
      ...(search ? { title: { contains: search } } : {}),
      ...(boroughs && boroughs.length > 0 ? { borough: { in: boroughs } } : {}),
      ...(categories && categories.length > 0
        ? { categories: { some: { categoryId: { in: categories } } } }
        : {}),
    },
    include: STORY_INCLUDE,
  });

  return processStories(stories);
}

/**
 * Fetch unpublished (hidden) stories.
 *
 * Notes:
 * - Useful for admin dashboards/moderation queues.
 * - No pagination or ordering applied.
 */
export async function getHiddenStories(): Promise<Story[]> {
  "use server";

  const stories = await prisma.story.findMany({
    where: { isPublished: false },
    include: STORY_INCLUDE,
  });

  return processStories(stories);
}

/**
 * Fetch a single story by ID.
 *
 * @param id - Story ID (string).
 * @returns The processed Story, or `null` if not found.
 *
 * Notes:
 * - Returns only published stories.
 */
export async function getStory(id: string): Promise<Story | null> {
  "use server";

  const story = await prisma.story.findUnique({
    where: { id },
    include: STORY_INCLUDE,
  });

  if (!story || !story.isPublished) return null;

  return processStory(story as RawStory);
}

/**
 * Create and publish a new story from form data.
 *
 * Auth:
 * - Requires an authenticated session.
 * - Requires a resolvable user (via `getUser`).
 * - If the user lacks first/last name, redirects to `/admin/personal-info`.
 *
 * Form fields (extracted by `getStoryData`):
 * - title, content, borough, summary, categoryIds, thumbnail (File)
 *
 * Side effects:
 * - Uploads/processes thumbnail via `processThumbnail`.
 * - Creates the story as `isPublished: true`.
 * - Creates StoryCategory links via `processCategories`.
 */
export async function createStory(formData: FormData) {
  "use server";

  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const user = await getUser(session.user.sub);
  if (!user) throw new Error("User not found");

  if (!user.firstName || !user.lastName) {
    redirect("/admin/personal-info");
  }

  const { title, content, borough, summary, categoryIds, thumbnail } =
    getStoryData(formData);

  if (!thumbnail) {
    throw new Error("Thumbnail is required");
  }
  const thumbnailUrl = await processThumbnail(thumbnail as File);

  const newStory = await prisma.story.create({
    data: {
      title,
      content,
      borough,
      summary: summary,
      author: { connect: { id: user.id } },
      thumbnail: thumbnailUrl,
      isPublished: true,
    },
  });

  await processCategories(newStory.id, categoryIds);
}

/**
 * Edit an existing story.
 *
 * @param id - Story ID to update.
 * @param formData - New field values (parsed by `getStoryData`).
 *
 * Behavior:
 * - Updates title/content/borough/summary.
 * - Conditionally replaces thumbnail if a valid File is provided.
 * - Replaces all category links via `processCategories` (deletes existing, then inserts provided IDs).
 */
export async function editStory(id: string, formData: FormData) {
  "use server";

  const { title, content, borough, summary, categoryIds, thumbnail } =
    getStoryData(formData);

  let thumbnailUrl: string | undefined;

  // Only process/replace if a new file is actually supplied
  if (
    thumbnail &&
    thumbnail instanceof File &&
    thumbnail.size > 0 &&
    thumbnail.name !== "undefined"
  ) {
    thumbnailUrl = await processThumbnail(thumbnail as File);
  }

  const updateData: {
    borough: string;
    summary: string;
    title: string;
    content: string;
    thumbnail?: string;
  } = {
    title,
    content,
    borough,
    summary,
  };

  if (thumbnailUrl) {
    updateData.thumbnail = thumbnailUrl;
  }

  await prisma.story.update({
    where: { id },
    data: updateData,
  });

  // Replace category links in one call
  await processCategories(id, categoryIds);
}


/**
 * Unpublish a story (make it hidden).
 *
 * @param id - Story ID.
 * @throws Error if the story is currently marked as Radar (cannot unpublish/delete).
 */
export async function unpublishStory(id: string) {
  "use server";

  const story = await prisma.story.findUnique({
    where: { id },
  });

  if (story?.isRadar) {
    throw new Error("Cannot unpublish radar story");
  }

  await prisma.story.update({
    where: { id },
    data: { isPublished: false },
  });
}

/**
 * Republish a story (make it live).
 *
 * @param id - Story ID.
 */
export async function republishStory(id: string) {
  "use server";

  await prisma.story.update({
    where: { id },
    data: { isPublished: true },
  });
}

/**
 * Permanently delete a story.
 *
 * @param id - Story ID.
 * @throws Error if the story is currently marked as Radar (blocked for safety).
 *
 * Side effects:
 * - Removes all StoryCategory joins before deleting the story.
 */
export async function deleteStory(id: string) {
  "use server";

  const story = await prisma.story.findUnique({
    where: { id },
  });

  if (story?.isRadar || story?.isPublished) {
    throw new Error("Cannot delete published story");
  }

  await deleteStoryCategories(id);

  await prisma.story.delete({
    where: {
      id,
    },
  });
}
