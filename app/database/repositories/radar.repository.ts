"use server";
import { CompactStory } from "../../types/types";
import { flattenCategories, STORY_RELATIONS, StoryWithRelations } from "../helpers/story.helpers";
import { prisma } from "../prisma";

/**
 * Get the current "Radar" story for the homepage.
 *
 * - First tries to fetch the story already marked as `isRadar`.
 * - If no radar exists, promotes the first recommended story to radar.
 * - If no recommended story exists, promotes the first published non-recommended story to radar.
 * - Always returns a processed `Story` object unless there are no published stories at all.
 *
 * @returns Promise<Story> — The radar story for display on the homepage.
 *
 * @throws Error if there are zero published stories in the database.
 *
 * Side effects:
 * - May update the `isRadar` flag in the database.
 */
export async function getRadarStory(): Promise<CompactStory | null> {
  // Try existing radar
  let story = await prisma.story.findFirst({
    where: { isPublished: true, isRadar: true },
    ...STORY_RELATIONS, 
  });

  // If no radar, try first recommended
  if (!story) {
    const recommended = await prisma.story.findFirst({
      where: { isPublished: true, isRecommended: true },
      ...STORY_RELATIONS,
    });

    if (recommended) {
      await prisma.story.update({
        where: { id: recommended.id },
        data: { isRadar: true },
      });
      story = recommended;
    }
  }

  // If still none, try first published non-recommended
  if (!story) {
    const fallback = await prisma.story.findFirst({
      where: { isPublished: true, isRecommended: false },
      ...STORY_RELATIONS,
    });

    if (fallback) {
      await prisma.story.update({
        where: { id: fallback.id },
        data: { isRadar: true },
      });
      story = fallback;
    }
  }

  // If absolutely no stories exist
  if (!story) {
    return null; // Return null gracefully instead of throwing null
  }

  // Cast to your relation type and flatten
  return flattenCategories(story as StoryWithRelations);
}

/**
 * Set a specific story as the "Radar" story.
 *
 * - Clears the `isRadar` flag from all stories.
 * - Sets the `isRadar` flag to `true` for the given story ID.
 *
 * @param id - The unique ID of the story to make the radar.
 *
 * Side effects:
 * - Updates the `isRadar` status for multiple stories in the database.
 */
export async function updateRadarStory(id: string) {
  // Remove radar flag from all stories
  await prisma.story.updateMany({
    where: { isRadar: true },
    data: { isRadar: false },
  });

  // Set radar flag for the chosen story
  await prisma.story.update({
    where: { id },
    data: { isRadar: true },
  });
}
