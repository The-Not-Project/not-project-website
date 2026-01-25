import StoryCard from '../storyCard/storyCard.component';
import { StoriesContainer, NoStoriesMessage } from './storiesList.styles';
import LoadingPage from '@/app/admin/shared/components/loadingPage/loadingPage.component'; 
import type { CompactStory as StoryType } from '@/app/types/types';

type StoriesListProps = {
  stories: StoryType[];
  isLoading: boolean;
  // onDelete: (id: string) => Promise<void>;
  onHide: (id: string) => Promise<void>;
  onShow: (id: string) => Promise<void>;
};

export default function StoriesList({
  isLoading,
  stories,
  // onDelete,
  onHide,
  onShow
}: StoriesListProps) {
  if (isLoading) {
    return <LoadingPage />;
  }

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
              // onDelete={onDelete}
              onHide={onHide}
              onShow={onShow}
            />
          ))}
        </StoriesContainer>
      )}
    </>
  );
}
