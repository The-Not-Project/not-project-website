import { createStory } from "@/lib/prisma/repositories/story.repository";
import CreateStoryForm from "./createForm";

export default function Page() {
  return <CreateStoryForm createAction={createStory} />
}
