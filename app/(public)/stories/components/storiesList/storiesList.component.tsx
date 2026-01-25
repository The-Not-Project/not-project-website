import { CompactStory as StoryType } from "@/app/types/types";
import StoryCard from "../storyCard/storyCard.component";
import {
  FollowupMessage,
  NoStoriesMessage,
  StoriesListContainer,
} from "./storiesList.styles";
import Link from "next/link";
import StoryPlaceholder from "../storyPlaceholder/storyPlaceholder.component";

interface StoriesListProps {
  stories: StoryType[];
  borough?: string;
  loading: boolean;
}

export default function StoriesList({
  stories,
  borough,
  loading,
}: StoriesListProps) {
  return (
    <StoriesListContainer>
      {loading ? (
        <>
        <StoryPlaceholder />
        <StoryPlaceholder />
        <StoryPlaceholder />
        </>
      ) : stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <>
          <NoStoriesMessage>
            No stories from {borough ? borough.toLowerCase() : "new york"}...
            yet.
          </NoStoriesMessage>
          <FollowupMessage>
            <Link href="/contact">Want to help change that?</Link>
          </FollowupMessage>
        </>
      )}
    </StoriesListContainer>
  );
}
