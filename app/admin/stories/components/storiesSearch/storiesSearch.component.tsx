'use client';
import type { Story } from '@/app/types/types';
import { Loader, SearchContainer } from './storiesSearch.styles';
import { NoStoriesMessage } from '../storiesList/storiesList.styles';
import {
  ImageContainer,
  RecommendationContainer,
  RecommendationsListContainer,
} from '../../../recommendations/components/recommendationsList/recommendationsList.styles';
import { FaPlus as PlusSign } from 'react-icons/fa6';


type SearchAndResultsProps = {
  placeholder?: string;
  searchValue: string;
  results: Story[];
  isLoading: boolean;
  onSearchChangeAction: (value: string) => void;
  onAddAction: (id: string) => void;
};

export default function RecommendationSearch({
  searchValue,
  placeholder,
  results,
  isLoading,
  onSearchChangeAction,
  onAddAction,
}: SearchAndResultsProps) {
  return (
    <div className='search-section'>
      <SearchContainer>
        <input
          type='text'
          value={searchValue}
          onChange={e => onSearchChangeAction(e.target.value)}
          placeholder={placeholder || 'Search stories...'}
        />
      </SearchContainer>

      {!isLoading && searchValue && (
        <div className='results-container'>
          {results.length === 0 ? (
            <NoStoriesMessage>No stories found.</NoStoriesMessage>
          ) : (
            <RecommendationsListContainer>
              {results.map(story => (
                <RecommendationContainer key={story.id}>
                  <h3>{story.title.slice(0, 15)}...</h3>
                  <h4>
                    By {`${story.author.firstName} ${story.author.lastName}`}
                  </h4>
                  <ImageContainer
                    src={story.thumbnail}
                    alt='Photo'
                    width={150}
                    height={100}
                  />
                  <p className='green' onClick={() => onAddAction(story.id)}>
                    <PlusSign />
                  </p>
                </RecommendationContainer>
              ))}
            </RecommendationsListContainer>
          )}
        </div>
      )}

      {isLoading && searchValue && <Loader />}
    </div>
  );
}
