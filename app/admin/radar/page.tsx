"use client";
import { useAdminServerActions } from "@/app/contexts/admin-server-actions";
import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import StoriesSearch from "../stories/components/storiesSearch/storiesSearch.component";
import { useCallback, useEffect, useState } from "react";
import { Filters, Story } from "@/app/types/types";
import RadarStory from "./components/radarStory/radarStory.component";
import { NoStoriesMessage } from "@/app/admin/stories/components/storiesList/storiesList.styles";
import LoadingPage from "../shared/components/loadingPage/loadingPage.component";

const defaultFilters = {
  search: "",
  boroughs: [],
  categories: [],
};

export default function Page() {
  const { getRadarStory, updateRadarStory, getStories } =
    useAdminServerActions();
  const [searchResults, setSearchResults] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIsLoading, setsearchIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [radarStory, setRadarStory] = useState<Story | null>(null);

  const fetchRadarStory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRadarStory();

      setRadarStory(data);
    } finally {
      setIsLoading(false);
    }
  }, [getRadarStory]);

  useEffect(() => {
    fetchRadarStory();
  }, [fetchRadarStory]);

  const handleSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue.trim()) {
        setSearchResults([]);
        return;
      }
      setsearchIsLoading(true);

      const data = await getStories(
        {
          ...filters,
          search: searchValue,
        }
      );

      const radarId = radarStory?.id;

      setSearchResults(data.filter((story) => story.id !== radarId));
      setsearchIsLoading(false);
    },
    [filters, radarStory, getStories]
  );

  const handleSetRadarStory = useCallback(
    async (id: string) => {
      await updateRadarStory(id);
      setFilters(defaultFilters);
      await fetchRadarStory();
    },
    [updateRadarStory, fetchRadarStory]
  );

  return (
    <PageSection>
      <SectionTitle>Radar Story</SectionTitle>
      {isLoading ? (
        <LoadingPage />
      ) : radarStory ? (
        <>
          <RadarStory
            story={radarStory}
          />
          <StoriesSearch
            placeholder="Replace radar story"
            searchValue={filters.search}
            results={searchResults}
            isLoading={searchIsLoading}
            onSearchChangeAction={(value) => {
              setFilters((prev) => ({ ...prev, search: value }));
              handleSearch(value);
            }}
            onAddAction={handleSetRadarStory}
          />
        </>
      ) : (
        <>
          <NoStoriesMessage>No radar story found.</NoStoriesMessage>
        </>
      )}
    </PageSection>
  );
}
