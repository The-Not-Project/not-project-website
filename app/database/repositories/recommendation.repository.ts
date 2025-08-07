import { Story } from "../../types/types";
import { processStories, STORY_INCLUDE } from "../helpers/story.helpers";
import { prisma } from "../prisma";

export async function getRecommendations(): Promise<Story[]> {
  "use server";

  const recommendedStoriesIds = await prisma.recommendation.findMany();

  const recommendedStories = await prisma.story.findMany({
    where: {
      id: {
        in: recommendedStoriesIds.map((rec) => rec.storyId),
      },
    },
    include: STORY_INCLUDE,
  });

  return processStories(recommendedStories);
}

export async function addRecommendation(id: string) {
  "use server";

  await prisma.recommendation.create({
    data: {
      storyId: id,
    },
  });
}

export async function removeRecommendation(id: string) {
  "use server";

  await prisma.recommendation.delete({
    where: {
      storyId: id,
    },
  });
}
