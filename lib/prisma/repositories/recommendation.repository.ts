"use server";

import { CompactStory } from "@/app/types/types";
import { fetchStories } from "../helpers/story.helpers";
import { prisma } from "../prisma";

/**
 * Retrieves a limited set of stories flagged as recommendations.
 * * @returns A promise resolving to an array of up to 4 CompactStory objects.
 * Useful for featured sections or "Our Collection" components.
 */
export async function getRecommendations(): Promise<CompactStory[]> {
  // Debug log to track execution during server-side rendering or revalidation.
  console.log('run');

  return await fetchStories({
    where: { isRecommended: true },
    take: 4, // Limits the result set to ensure the UI remains focused.
  });
}

/**
 * Flags a specific story as a recommendation.
 * * @param id - The unique UUID of the story to be promoted.
 */
export async function addRecommendation(id: string) {
  await prisma.story.update({
    where: { id },
    data: { isRecommended: true },
  });
}

/**
 * Removes the recommendation flag from a specific story.
 * * @param id - The unique UUID of the story to be demoted.
 */
export async function removeRecommendation(id: string) {
  await prisma.story.update({
    where: { id },
    data: { isRecommended: false },
  });
}