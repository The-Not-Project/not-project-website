import { Story } from "../../types/types";
import { processStories, STORY_INCLUDE } from "../helpers/story.helpers";
import { prisma } from "../prisma";

export async function getRecommendations(): Promise<Story[]> {
  "use server";


  const recommendedStories = await prisma.story.findMany({
    where: {
      isRecommended: true
    },
    include: STORY_INCLUDE,
    take: 4
  });

  return processStories(recommendedStories);
}

export async function addRecommendation(id: string) {
  "use server";

  await prisma.story.update({
    where: {
      id
    }, data: {
      isRecommended: true
    }
  })
}

export async function removeRecommendation(id: string) {
  "use server";

  await prisma.story.update({
    where: {
      id
    }, data: {
      isRecommended: false
    }
  })
}
