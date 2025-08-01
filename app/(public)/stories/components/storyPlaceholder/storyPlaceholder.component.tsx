import { useStore } from "@/app/zustand/store";
import {
  StoryContainer,
  StoryContent,
  MobileStoryBody,
} from "./storyPlaceholder.styles";

export default function StoryPlaceholder() {
  const isMobile = useStore((state) => state.mobileLayout.isMobile);

  return (
    <StoryContainer>
      {isMobile ? (
        <MobileStoryBody>
          <div className="first-row">
            <div className="skeleton thumbnail"></div>
            <div className="content">
              <div>
                <div className="skeleton title"></div>
                <div className="skeleton title half"></div>
              </div>
              <div>
                <div className="skeleton summary"></div>
                <div className="skeleton summary"></div>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="skeleton summary"></div>
            <div className="skeleton summary"></div>
            <div className="skeleton summary"></div>
          </div>
        </MobileStoryBody>
      ) : (
        <>
          <StoryContent>
            <div className="skeleton title"></div>
            <p className="skeleton summary"></p>
            <p className="skeleton summary"></p>
            <p className="skeleton summary half"></p>
          </StoryContent>
          <div className="skeleton desktop-thumbnail"></div>
        </>
      )}
    </StoryContainer>
  );
}
