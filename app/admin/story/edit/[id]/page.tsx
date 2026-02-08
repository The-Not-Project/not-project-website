import {
  editStory,
  getStory,
} from "@/lib/prisma/repositories/story.repository";
import EditStoryForm from "./editForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) return <div>story not found.</div>

  return <EditStoryForm story={story} editAction={editStory} />;
}
