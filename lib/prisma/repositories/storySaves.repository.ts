"use server";

import { CompactStory } from "@/app/types/types";
import { prisma } from "../prisma";
import { fetchStories } from "../helpers/story.helpers";
import { auth0 } from "@/lib/auth0/auth0";

/**
 * Creates a "Save" record for a specific user and story.
 * Acts as a bookmarking mechanism.
 * * @param storyId - The UUID of the story to be saved.
 * @param userId - The ID of the user performing the save.
 */
export const createStorySave = async (
  storyId: string,
  userId: string,
): Promise<void> => {
  await prisma.save.create({
    data: { storyId, userId },
  });
};

/**
 * Checks if a specific story has already been saved by a user.
 * Useful for toggling "Save" icons in the UI.
 * * @returns Boolean - True if a record exists, false otherwise.
 */
export const isStorySaved = async (
  storyId: string,
  userId: string,
): Promise<boolean> => {
  const save = await prisma.save.findFirst({
    where: { storyId, userId },
  });

  // Returns true if save is truthy, false if null
  return !!save;
};

/**
 * Retrieves all stories saved by the currently authenticated user.
 * Validates the session via Auth0 before querying.
 * * @throws Error "Unauthorized" if no valid session is found.
 * @returns A list of CompactStory objects.
 */
export const getSavedStories = async (): Promise<CompactStory[]> => {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Uses the shared fetchStories helper to filter by the user's "saves" relation
  return fetchStories({
    where: {
      save: {
        some: {
          userId: session.user.id,
        },
      },
    },
  });
};

/**
 * Removes a "Save" record, effectively un-bookmarking a story.
 * Uses deleteMany to avoid errors if for some reason multiple records
 * exist for the same user/story pair.
 */
export const deleteStorySave = async (
  storyId: string,
  userId: string,
): Promise<void> => {
  await prisma.save.deleteMany({
    where: { storyId, userId },
  });
};
