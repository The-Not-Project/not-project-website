import EditStoryForm from "./editForm";
import { getStoryAction, updateStoryAction } from "@/lib/internal-api/actions/story.actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { story } = await getStoryAction(id);

  if (!story) return <div>story not found.</div>;

  return <EditStoryForm story={story} updateAction={updateStoryAction} />;
}
