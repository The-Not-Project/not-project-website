import { Story } from "@/app/types/types";
import { prisma } from "../prisma";
import { processStories, STORY_INCLUDE } from "../helpers/story.helpers";

/**
 * Save (bookmark) a story for a specific user.
 *
 * @param storyId - The ID of the story to save.
 * @param userId - The ID of the user saving the story.
 *
 * Side effects:
 * - Inserts a row into the `save` table linking the story and user.
 * - Does not check for duplicates — if this function is called twice with the same IDs,
 *   Prisma will throw if you have a unique constraint on (storyId, userId).
 */
export const createStorySave = async (
  storyId: string,
  userId: string
): Promise<void> => {
  "use server";

  await prisma.save.create({
    data: { storyId, userId },
  });
};

/**
 * Check if a story is saved by a specific user.
 *
 * @param storyId - The ID of the story.
 * @param userId - The ID of the user.
 * @returns `true` if the story is saved by the user, otherwise `false`.
 *
 * Notes:
 * - Uses `findFirst` since (storyId, userId) pair is expected to be unique.
 * - No need to select fields — only existence matters.
 */
export const isStorySaved = async (
  storyId: string,
  userId: string
): Promise<boolean> => {
  "use server";

  const save = await prisma.save.findFirst({
    where: { storyId, userId },
  });

  return !!save;
};

/**
 * Get all stories saved by a specific user.
 *
 * @param userId - The ID of the user.
 * @returns An array of processed `Story` objects.
 *
 * Steps:
 * 1. Fetch all save entries for the user (only story IDs).
 * 2. Use the list of IDs to fetch the corresponding stories with `STORY_INCLUDE`.
 * 3. Process the stories via `processStories` before returning.
 *
 * Notes:
 * - Returns stories in the order provided by the DB; add `orderBy` if needed.
 * - If a saved story has been deleted, it will not appear in the results.
 */
export const getSavedStories = async (userId: string): Promise<Story[]> => {
  "use server";

  const saves = await prisma.save.findMany({
    where: { userId },
    select: { storyId: true },
  });

  const savedStoryIds = saves.map(save => save.storyId);

  const stories = await prisma.story.findMany({
    where: { id: { in: savedStoryIds } },
    include: STORY_INCLUDE,
  });

  return processStories(stories);
};

/**
 * Remove a saved story for a specific user.
 *
 * @param storyId - The ID of the story.
 * @param userId - The ID of the user.
 *
 * Side effects:
 * - Deletes the `save` record linking the story to the user.
 * - Uses `deleteMany` to handle the case where duplicates exist.
 */
export const deleteStorySave = async (
  storyId: string,
  userId: string
): Promise<void> => {
  "use server";

  await prisma.save.deleteMany({
    where: { storyId, userId },
  });
};
