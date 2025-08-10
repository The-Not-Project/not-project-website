import { RawStory, Story } from "../../types/types";
import { processStory, STORY_INCLUDE } from "../helpers/story.helpers";

import { prisma } from "../prisma";

export async function getRadarStory(): Promise<Story> {
  "use server";

  // Try existing radar
  let story = await prisma.story.findFirst({
    where: { isPublished: true, isRadar: true },
    include: STORY_INCLUDE,
  });

  // If no radar, try first recommended
  if (!story) {
    const recommended = await prisma.story.findFirst({
      where: { isPublished: true, isRecommended: true },
      include: STORY_INCLUDE,
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
      include: STORY_INCLUDE,
    });

    if (fallback) {
      await prisma.story.update({
        where: { id: fallback.id },
        data: { isRadar: true },
      });
      story = fallback;
    }
  }

  if (!story) {
    throw new Error("No published stories found to set as radar.");
  }

  return processStory(story as RawStory);
}


export async function updateRadarStory(id: string) {
  "use server";

  await prisma.story.updateMany({
    where: {
      isRadar: true,
    },
    data: {
      isRadar: false,
    },
  });

  await prisma.story.update({
    where: {
      id,
    },
    data: {
      isRadar: true,
    },
  });
}
