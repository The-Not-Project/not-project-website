import { CompactStory } from "@/app/types/types";
import {
  StoryContainer,
  StoryContentContainer,
  StoryImageContainer,
} from "./storyCard.styles";
import StoryActions from "../storyActions/storyActions.component";
import { unpublishStoryAction, republishStoryAction } from "@/lib/internal-api/actions/story.actions";


export default function StoryCard({ story }: { story: CompactStory }) {

  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <StoryContainer>
      <StoryImageContainer
        src={story.thumbnail}
        alt="Photo"
        width={150}
        height={100}
      />
      <StoryContentContainer>
        <h2>{story.title}</h2>
        <p>By {`${story.author.firstName} ${story.author.lastName}`}</p>
        <p>Created At {date}</p>
      </StoryContentContainer>
      <StoryActions
        id={story.id}
        isPublished={story.isPublished}
        unpublishAction={unpublishStoryAction}
        republishAction={republishStoryAction}
      />
    </StoryContainer>
  );
}
