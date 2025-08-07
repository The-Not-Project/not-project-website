import { getSession } from "@auth0/nextjs-auth0";
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

export async function getStories(filters?: Filters): Promise<Story[]> {
  "use server";

  const { search, boroughs, categories } = filters || {};

  const stories = await prisma.story.findMany({
    where: {
      title: { not: "" },
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

export async function getStory(id: string): Promise<Story | null> {
  "use server";

  const story = await prisma.story.findUnique({
    where: { id },
    include: STORY_INCLUDE,
  });

  if (!story) return null;

  return processStory(story as RawStory);
}

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
    },
  });

  await processCategories(newStory.id, categoryIds);
}

export async function editStory(id: string, formData: FormData) {
  "use server";

  const { title, content, borough, summary, categoryIds, thumbnail } =
    getStoryData(formData);

  let thumbnailUrl: string | undefined;

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

  await deleteStoryCategories(id);
  await processCategories(id, categoryIds);
}

export async function deleteStory(id: string) {
  "use server";

  await deleteStoryCategories(id);

  await prisma.story.delete({
    where: {
      id,
    },
  });
}
