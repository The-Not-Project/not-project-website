import { StoryContainer, StoryContent } from "./storyPlaceholder.styles";

export default function StoryPlaceholder() {
  return (
    <StoryContainer>
      <StoryContent>
        <div className="skeleton title"></div>
        <p className="skeleton summary"></p>
        <p className="skeleton summary"></p>
        <p className="skeleton summary half"></p>
      </StoryContent>
      <div className="skeleton thumbnail"></div>
    </StoryContainer>
  );
}
