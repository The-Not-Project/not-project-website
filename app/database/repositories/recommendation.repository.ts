import { Story } from "../../types/types";
import { processStories, STORY_INCLUDE } from "../helpers/story.helpers";
import { prisma } from "../prisma";

/**
 * Get up to 4 recommended stories.
 *
 * - Fetches stories with `isRecommended = true`.
 * - Includes additional fields defined in `STORY_INCLUDE`.
 * - Limits the result to 4 stories for homepage display.
 *
 * @returns Promise<Story[]> — Processed list of recommended stories.
 *
 * Note:
 * - No explicit ordering is applied, so the DB will return results in default order.
 *   If ordering matters, add `orderBy` to the query.
 */
export async function getRecommendations(): Promise<Story[]> {
  "use server";

  const recommendedStories = await prisma.story.findMany({
    where: { isRecommended: true },
    include: STORY_INCLUDE,
    take: 4,
  });

  return processStories(recommendedStories);
}

/**
 * Mark a story as recommended.
 *
 * @param id - The unique ID of the story to mark.
 *
 * Side effects:
 * - Sets `isRecommended` to `true` for the given story.
 * - Does not enforce a max of 4 recommendations — limit must be handled in application logic.
 */
export async function addRecommendation(id: string) {
  "use server";

  await prisma.story.update({
    where: { id },
    data: { isRecommended: true },
  });
}

/**
 * Remove a story from the recommendations list.
 *
 * @param id - The unique ID of the story to unmark.
 *
 * Side effects:
 * - Sets `isRecommended` to `false` for the given story.
 */
export async function removeRecommendation(id: string) {
  "use server";

  await prisma.story.update({
    where: { id },
    data: { isRecommended: false },
  });
}
