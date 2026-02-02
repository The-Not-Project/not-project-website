"use client";
import type { CompactStory, Filters } from "@/app/types/types";
import { Loader, SearchContainer } from "./storiesSearch.styles";
import { NoStoriesMessage } from "../storiesList/storiesList.styles";
import {
  ImageContainer,
  RecommendationContainer,
  RecommendationsListContainer,
} from "../../../recommendations/components/recommendationsList/recommendationsList.styles";
import { FaPlus as PlusSign } from "react-icons/fa6";
import { useCallback, useState, useTransition } from "react";
import { getStories } from "@/app/database/repositories/story.repository";

const defaultFilters = {
  search: "",
  boroughs: [],
  categories: [],
};

type SearchAndResultsProps = {
  placeholder?: string;
  onAddAction: (id: string) => Promise<void>;
  skippedStoryIds: string[];
};

export default function StoriesSearch({
  placeholder,
  onAddAction,
  skippedStoryIds,
}: SearchAndResultsProps) {
  const [searchResults, setSearchResults] = useState<CompactStory[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isLoading, startTransition] = useTransition();

  function handleSearchChange(value: string) {
    setFilters({
      ...filters,
      search: value,
    });
    startTransition(() => {
      handleSearch(value);
    });
  }

  const handleSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue.trim()) {
        setSearchResults([]);
        return;
      }

      const data = await getStories({
        ...filters,
        search: searchValue,
      });

      setSearchResults(
        data.filter((story) => !skippedStoryIds.includes(story.id)),
      );
    },
    [filters],
  );

  async function handleAddRecommendation(id: string) {
    try {
      await onAddAction(id);
      setFilters(defaultFilters);
      setSearchResults([]);
    } catch (err) {
      console.log("Error adding recommendation: ", err);
    }
  }
  return (
    <div className="search-section">
      <SearchContainer>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder || "Search stories..."}
        />
      </SearchContainer>

      {isLoading ? (
        <Loader />
      ) : (
        filters.search && (
          <div className="results-container">
            {searchResults.length === 0 ? (
              <NoStoriesMessage>No stories found.</NoStoriesMessage>
            ) : (
              <RecommendationsListContainer>
                {searchResults.map((story) => (
                  <RecommendationContainer key={story.id}>
                    <h3>{story.title.slice(0, 15)}...</h3>
                    <h4>
                      By {`${story.author.firstName} ${story.author.lastName}`}
                    </h4>
                    <ImageContainer
                      src={story.thumbnail}
                      alt="Photo"
                      width={150}
                      height={100}
                    />
                    <p
                      className="green"
                      onClick={() => handleAddRecommendation(story.id)}
                    >
                      <PlusSign />
                    </p>
                  </RecommendationContainer>
                ))}
              </RecommendationsListContainer>
            )}
          </div>
        )
      )}
    </div>
  );
}
