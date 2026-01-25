"use client";

import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import { useAdminServerActions } from "@/app/contexts/admin-server-actions";
import { Filters, CompactStory } from "@/app/types/types";
import { useState, useEffect, useCallback } from "react";
import RecommendationsList from "./components/recommendationsList/recommendationsList.component";
import RecommendationSearch from "../stories/components/storiesSearch/storiesSearch.component";

const defaultFilters = {
  search: "",
  boroughs: [],
  categories: [],
};

export default function RecommendationsPage() {
  const {
    getRecommendations,
    addRecommendation,
    getStories,
    removeRecommendation,
  } = useAdminServerActions();

  const [recommendations, setRecommendations] = useState<CompactStory[]>([]);
  const [searchResults, setSearchResults] = useState<CompactStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIsLoading, setsearchIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRecommendations();
      setRecommendations(data);
    } finally {
      setIsLoading(false);
    }
  }, [getRecommendations]);

  const handleSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue.trim()) {
        setSearchResults([]);
        return;
      }
      setsearchIsLoading(true);

      const data = await getStories({
        ...filters,
        search: searchValue,
      });

      const recommendedIds = new Set(recommendations.map((rec) => rec.id));

      setSearchResults(data.filter((story) => !recommendedIds.has(story.id)));
      setsearchIsLoading(false);
    },
    [filters, getStories, recommendations]
  );

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleAddRecommendation = useCallback(
    async (id: string) => {
      await addRecommendation(id);
      setFilters(defaultFilters);
      await fetchRecommendations();
    },
    [addRecommendation, fetchRecommendations]
  );

  const handleRemoveRecommendation = useCallback(
    async (id: string) => {
      await removeRecommendation(id);
      setFilters(defaultFilters);
      await fetchRecommendations();
    },
    [removeRecommendation, fetchRecommendations]
  );

  return (
    <PageSection>
      <SectionTitle>Recommended stories</SectionTitle>
      <RecommendationsList
        recommendations={recommendations}
        onRemoveAction={handleRemoveRecommendation}
        isLoading={isLoading}
      />
      {recommendations.length < 4 && (
        <RecommendationSearch
          searchValue={filters.search}
          results={searchResults}
          isLoading={searchIsLoading}
          onSearchChangeAction={(value) => {
            setFilters((prev) => ({ ...prev, search: value }));
            handleSearch(value);
          }}
          onAddAction={handleAddRecommendation}
        />
      )}
    </PageSection>
  );
}
