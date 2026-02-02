import type { CompactStory as StoryType } from '@/app/types/types';
import StoryCard from '../storyCard/storyCard.component';
import { StoriesContainer, NoStoriesMessage } from './storiesList.styles';

type StoriesListProps = {
  stories: StoryType[];
};

export default function StoriesList({
  stories,
}: StoriesListProps) {

  return (
    <>
      {stories.length === 0 ? (
        <NoStoriesMessage>No stories found.</NoStoriesMessage>
      ) : (
        <StoriesContainer>
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              story={story}
            />
          ))}
        </StoriesContainer>
      )}
    </>
  );
}
