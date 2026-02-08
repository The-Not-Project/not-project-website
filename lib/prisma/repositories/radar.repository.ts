"use server";
import { CompactStory } from "@/app/types/types";
import { flattenCategories, STORY_RELATIONS, StoryWithRelations } from "../helpers/story.helpers";
import { prisma } from "../prisma";

/**
 * Retrieves the current "Radar" story.
 * * Logic Flow (Fallback System):
 * 1. Attempts to find a story explicitly marked as 'isRadar'.
 * 2. If none exists, it promotes the first 'isRecommended' story to Radar.
 * 3. If no recommendations exist, it promotes the first available published story to Radar.
 * * @returns A promise resolving to the prioritized CompactStory.
 */
export async function getRadarStory(): Promise<CompactStory> {
  // 1. Primary Attempt: Find the explicitly assigned Radar story
  let story = await prisma.story.findFirst({
    where: { isPublished: true, isRadar: true },
    ...STORY_RELATIONS, 
  });

  // 2. First Fallback: Promote a Recommended story if Radar is missing
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

  // 3. Second Fallback: Promote any published story if all else fails
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
  
  // Return the story with processed/flattened category relations
  return flattenCategories(story as StoryWithRelations);
}

/**
 * Updates which story is currently featured as the "Radar" story.
 * This is a singleton-style update: it removes the flag from all other 
 * stories before assigning it to the new one.
 * * @param id - The unique ID of the story to be promoted to Radar.
 */
export async function updateRadarStory(id: string) {
  // Ensure only one story is marked as Radar at any given time
  await prisma.story.updateMany({
    where: { isRadar: true },
    data: { isRadar: false },
  });

  // Set the new target story as the Radar story
  await prisma.story.update({
    where: { id },
    data: { isRadar: true },
  });
}