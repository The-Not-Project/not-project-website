"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import { Filters, Story } from "@/app/types/types";
import StoriesList from "../storiesList/storiesList.component";
import {
  SectionTitle,
  StoriesContainer,
} from "./storiesPage.styles";
import Header from "../header/header.component";
import { BoroughSummaries } from "@/app/constants/boroughs";
import { useStore } from "@/app/zustand/store";
import clsx from "clsx";

interface StoriesPageProps {
  boroughParam?: string;
}

export default function StoriesPageComponent({
  boroughParam,
}: StoriesPageProps) {
  const currentBorough = boroughParam
    ? BoroughSummaries[
        boroughParam.toLowerCase() as keyof typeof BoroughSummaries
      ]
    : BoroughSummaries.nyc;

  const defaultFilters = useMemo<Filters>(
    () => ({
      search: "",
      boroughs: boroughParam ? [boroughParam.toLowerCase()] : [],
      categories: [],
    }),
    [boroughParam]
  );

  const { getStories } = usePublicServerActions();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  // const [filters, setFilters] = useState<Filters>(defaultFilters);
  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);
  const setIsMobile = useStore((state) => state.mobileLayout.setIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStories = useCallback(
    async (appliedFilters: Filters = defaultFilters) => {
      const finalFilters = boroughParam
        ? { ...appliedFilters, boroughs: [boroughParam.toLowerCase()] }
        : appliedFilters;

      const data = await getStories(finalFilters);
      setStories(data);
      setLoading(false);
    },
    [boroughParam, getStories, defaultFilters]
  );

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <div className={clsx("page-wrapper", { shifted: isMenuOpen })}>
      <Header borough={currentBorough} />
      
      <SectionTitle>
        <h2>OUR ORIGINAL WORK</h2>
        <h3>Stories Of {currentBorough.boroughName}</h3>
      </SectionTitle>
      <StoriesContainer>
        {/* <StoriesSearch filters={filters} setFilters={setFilters} /> */}
        <StoriesList
          stories={stories}
          borough={currentBorough.boroughName}
          loading={loading}
        />
      </StoriesContainer>
    </div>
  );
}
