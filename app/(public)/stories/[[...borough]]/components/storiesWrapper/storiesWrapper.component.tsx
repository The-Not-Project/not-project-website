// app/your-page/StoriesWrapper.tsx
import { getStoriesAction } from "@/lib/internal-api/actions/story.actions";
import StoriesList from "../storiesList/storiesList.component";
import { Filters } from "@/app/types/types";

export default async function StoriesWrapper({
  filters,
  boroughName,
}: {
  filters: Filters;
  boroughName: string;
}) {
  const { stories, success, message } = await getStoriesAction(filters);

  if (!success) {
    return (
      <div className="error-container">
        <p>Could not load stories: {message}</p>
      </div>
    );
  }

  return <StoriesList stories={stories} borough={boroughName} />;
}
