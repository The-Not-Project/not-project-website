import { createStoryAction } from "@/lib/internal-api/actions/story.actions";
import CreateStoryForm from "./createForm";

export default function Page() {
  return <CreateStoryForm createAction={createStoryAction} />
}
