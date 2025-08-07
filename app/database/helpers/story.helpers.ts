import { uploadToS3WithCompression } from "@/app/utils/media";
import { prisma } from "../prisma";
import { Category, RawStory, Story } from "@/app/types/types";

export function getStoryData(formData: FormData) {
  const [title, content, borough, summary] = [
    "title",
    "content",
    "borough",
    "summary",
  ].map((field) => formData.get(field)?.toString());

  const categoryIds = formData
    .getAll("categories")
    .map((val) => val.toString());

  const thumbnail = formData.get("thumbnail");

  if (!title || !content || !borough || !summary) {
    throw new Error("Missing required story fields");
  }

  return { title, content, borough, summary, categoryIds, thumbnail };
}

export async function processCategories(
  storyId: string,
  categoryIds: string[]
) {
  for (const catId of categoryIds) {
    await prisma.storyCategory.create({
      data: {
        storyId,
        categoryId: catId,
      },
    });
  }
}

export async function deleteStoryCategories(id: string) {
  "use server";

  await prisma.storyCategory.deleteMany({
    where: {
      storyId: id,
    },
  });
}


export async function processThumbnail(file: File): Promise<string> {
  const url = await uploadToS3WithCompression(file);
  return url;
}


export async function processStories(
  stories: RawStory[],
): Promise<Story[]> {
  return Promise.all(stories.map((story) => processStory(story)));
}

export async function processStory(
  story: RawStory,
): Promise<Story> {
  return {
    ...story,
    categories: story.categories.map(
      (sc: { category: Category }) => sc.category
    ),
  };
}

export const STORY_INCLUDE = {
  categories: {
    include: {
      category: true,
    },
  },
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
};
