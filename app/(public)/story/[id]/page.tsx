import { getStory } from "@/app/database/repositories/story.repository";
import StoryPage from "./storyPage";
import { getStoryMetadata } from "@/app/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return getStoryMetadata(null)

  const story = await getStory(id);
  return getStoryMetadata(story)
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StoryPage id={id} />;
}
