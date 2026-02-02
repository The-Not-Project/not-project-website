import { StoriesListContainer } from "./storiesList.styles";
import StoryPlaceholder from "../storyPlaceholder/storyPlaceholder.component";

export default function StoriesListSkeleton() {
  return (
    <StoriesListContainer>
      <StoryPlaceholder />
      <StoryPlaceholder />
      <StoryPlaceholder />
      <StoryPlaceholder />
    </StoriesListContainer>
  );
}
