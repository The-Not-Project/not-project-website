import { Story } from "@/app/types/types";
import { prisma } from "../prisma";
import { processStories, STORY_INCLUDE } from "../helpers/story.helpers";

export const createStorySave = async (
  storyId: string,
  userId: string
): Promise<void> => {
  "use server";
  await prisma.save.create({
    data: {
      storyId,
      userId,
    },
  });
};

export const isStorySaved = async (
  storyId: string,
  userId: string
): Promise<boolean> => {
  "use server";
  const save = await prisma.save.findFirst({
    where: {
      storyId,
      userId,
    },
  });
  return !!save;
};

export const getSavedStories = async (userId: string): Promise<Story[]> => {
  "use server";

  const saves = await prisma.save.findMany({
    where: {
      userId,
    },
    select: {
        storyId: true,
    }
  });

  const savedStoryIds = saves.map((save) => save.storyId);

  const stories = await prisma.story.findMany({
    where: {
      id: {
        in: savedStoryIds,
      }
    },
    include: STORY_INCLUDE,
  });

  return processStories(stories)
};

export const deleteStorySave = async (
  storyId: string,
  userId: string
): Promise<void> => {
  "use server";
  await prisma.save.deleteMany({
    where: {
      storyId,
      userId,
    },
  });
};
