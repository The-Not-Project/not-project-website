import { getStory } from "@/app/database/repositories/story.repository";
import { getStoryMetadata } from "@/app/constants/metadata";
import {
  StoryWrapper,
  StoryContainer
} from "./components/style";
import { Suspense } from "react";
import StoryContent from "./components/storyContent/storyContent.component";
import StorySkeleton from "./components/storySkeleton/story.skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return getStoryMetadata(null);

  const story = await getStory(id);
  return getStoryMetadata(story);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <StoryWrapper>
      <StoryContainer>
       <Suspense fallback={<StorySkeleton />}>
          <StoryContent id={id} />
        </Suspense>
      </StoryContainer>
    </StoryWrapper>
  );
}
