"use server";

import { auth0 } from "@/lib/auth0/auth0";
import { redirect } from "next/navigation";
import { getUser } from "./user.repository";
import {
  deleteStoryCategories,
  getStoryData,
  processCategories,
  processThumbnail,
  fetchStories,
  STORY_RELATIONS,
  flattenCategories,
  StoryWithRelations,
} from "../helpers/story.helpers";
import { CompactStory, Filters, Story } from "@/app/types/types";
import { prisma } from "../prisma";

/**
 * Fetches all published stories based on provided filters.
 * @param filters - Optional search terms, boroughs, and category IDs.
 * @returns A list of stories with the 'content' field omitted for performance.
 */
export async function getStories(filters?: Filters): Promise<CompactStory[]> {
  const { search, boroughs, categories } = filters || {};

  return await fetchStories({
    where: {
      isPublished: true,
      // Partial text match on the title
      ...(search ? { title: { contains: search } } : {}),
      // Filter by an array of boroughs
      ...(boroughs && boroughs.length > 0 ? { borough: { in: boroughs } } : {}),
      // Filter by many-to-many relationship with categories
      ...(categories && categories.length > 0
        ? { categories: { some: { categoryId: { in: categories } } } }
        : {}),
    },
    omit: { content: true }, // Keep the payload light for list views
  });
}

/**
 * Fetches stories that are currently in draft mode (isPublished: false).
 */
export async function getHiddenStories(): Promise<CompactStory[]> {
  return await fetchStories({
    where: { isPublished: false },
  });
}

/**
 * Retrieves a single published story by its unique ID.
 * Flattens the category structure for easier frontend consumption.
 */
export async function getStory(id: string): Promise<Story | null> {
  const story = await prisma.story.findUnique({
    where: { id },
    ...STORY_RELATIONS
  });

  if (!story || !story.isPublished) return null;

  return flattenCategories(story as StoryWithRelations);
}

/**
 * Creates a new story.
 * Requires an authenticated user with a complete profile (first/last name).
 * Processes the thumbnail image and category links as part of the creation.
 */
export async function createStory(formData: FormData) {
  // 1. Auth & Session Validation
  const session = await auth0.getSession();
  if (!session) throw new Error("User not authenticated");

  const user = await getUser();
  if (!user) throw new Error("User not found");

  // Redirect if profile is incomplete
  if (!user.firstName || !user.lastName) {
    redirect("/admin/personal-info");
  }

  // 2. Data Extraction
  const { title, content, borough, summary, categoryIds, thumbnail } =
    getStoryData(formData);

  if (!thumbnail) {
    throw new Error("Thumbnail is required");
  }

  // 3. Image Processing
  const thumbnailUrl = await processThumbnail(thumbnail as File);

  // 4. Database Persistence
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

  // Sync many-to-many categories
  await processCategories(newStory.id, categoryIds);
}

/**
 * Updates an existing story.
 * Only updates the thumbnail if a new file is provided.
 */
export async function editStory(id: string, formData: FormData) {
  const { title, content, borough, summary, categoryIds, thumbnail } =
    getStoryData(formData);

  let thumbnailUrl: string | undefined;

  // Validate if thumbnail is a new, non-empty file
  if (
    thumbnail &&
    thumbnail instanceof File &&
    thumbnail.size > 0 &&
    thumbnail.name !== "undefined"
  ) {
    thumbnailUrl = await processThumbnail(thumbnail as File);
  }

  const updateData: any = {
    title,
    content,
    borough,
    summary,
    updatedAt: new Date()
  };

  if (thumbnailUrl) {
    updateData.thumbnail = thumbnailUrl;
  }

  await prisma.story.update({
    where: { id },
    data: updateData,
  });

  // Re-sync categories
  await processCategories(id, categoryIds);
}

/**
 * Moves a story to draft status.
 * Prevents unpublishing if the story is marked as 'isRadar'.
 */
export async function unpublishStory(id: string) {
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
 * Sets a story's status to published.
 */
export async function republishStory(id: string) {
  await prisma.story.update({
    where: { id },
    data: { isPublished: true },
  });
}

/**
 * Permanently deletes a story from the database.
 * Safety Check: Only unpublished, non-radar stories can be deleted.
 */
export async function deleteStory(id: string) {
  const story = await prisma.story.findUnique({
    where: { id },
  });

  if (story?.isRadar || story?.isPublished) {
    throw new Error("Cannot delete published story");
  }

  // Remove category relations before deleting the story record
  await deleteStoryCategories(id);

  await prisma.story.delete({
    where: { id },
  });
}