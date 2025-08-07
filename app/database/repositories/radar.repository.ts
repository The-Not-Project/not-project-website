import { RawStory, Story } from "../../types/types";
import { processStory, STORY_INCLUDE } from "../helpers/story.helpers";

import { prisma } from "../prisma";

export async function getRadarStory(): Promise<Story | null> {
  "use server";

  const radarStory = await prisma.radar.findFirst();

  if (!radarStory) {
    return null;
  }

  const story = await prisma.story.findUnique({
    where: {
      id: radarStory.storyId,
    },
    include: STORY_INCLUDE,
  });

  return processStory(story as RawStory);
}

export async function updateRadarStory(id: string) {
  "use server";

  await prisma.radar.deleteMany();

  await prisma.radar.create({
    data: {
      storyId: id,
    },
  });
}
