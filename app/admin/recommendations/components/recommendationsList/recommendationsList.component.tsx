// components/recommendationsList/recommendationsList.component.tsx
'use client';
import { Story } from '@/app/types/types';
import {
  ImageContainer,
  RecommendationContainer,
  RecommendationsListContainer,
} from './recommendationsList.styles';
import LoadingPage from '../../../shared/components/loadingPage/loadingPage.component';
import { FaTrash as TrashCan } from 'react-icons/fa6';
import { NoStoriesMessage } from '@/app/admin/stories/components/storiesList/storiesList.styles'; 
type RecommendationsListProps = {
  recommendations: Story[];
  onRemoveAction: (id: string) => void;
  isLoading: boolean;
};

export default function RecommendationsList({
  recommendations,
  onRemoveAction,
  isLoading,
}: RecommendationsListProps) {
  if (isLoading) return <LoadingPage />;
  if (!recommendations.length)
    return <NoStoriesMessage>We have no recommended stories lol.</NoStoriesMessage>;

  return (
    <RecommendationsListContainer>
      {recommendations.map(rec => (
        <RecommendationContainer key={rec.id}>
          <h3>
            {rec.title.slice(0, 15)}
            {rec.title.length > 15 && '...'}
          </h3>
          <h4>By {`${rec.author.firstName} ${rec.author.lastName}`}</h4>
          <ImageContainer
            src={rec.thumbnail}
            alt='Photo'
            width={150}
            height={100}
          />
          <p onClick={() => onRemoveAction(rec.id)}>
            <TrashCan />
          </p>
        </RecommendationContainer>
      ))}
    </RecommendationsListContainer>
  );
}
