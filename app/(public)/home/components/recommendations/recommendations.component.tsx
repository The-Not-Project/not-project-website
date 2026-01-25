"use client";

import { useCallback, useEffect, useState } from "react";
import { CompactStory } from "@/app/types/types";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import {
  RecommendationsContainer,
  BigTitle,
  SecondaryTitle,
  RecommendationsList,
  StoriesPageLinkContainer,
  StoriesPageLink,
  LinkLabel,
} from "./recommendations.styles";
import RecommendationCard from "./recommendationCard.component";
import RecommendationPlaceholder from "./recommendation.placeholder";
import { FiArrowUpRight as Arrow } from "react-icons/fi";


export default function Recommendations() {
  const { getRecommendations } = usePublicServerActions();
  const [recommendations, setRecommendations] = useState<CompactStory[]>([]);

  const fetchRecommendations = useCallback(async () => {
    const recommendations = await getRecommendations();
    setRecommendations(recommendations);
  }, [getRecommendations]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <RecommendationsContainer>
      <BigTitle>The collection</BigTitle>
      <SecondaryTitle>Stories we think you&apos;ll like.</SecondaryTitle>
      <RecommendationsList>
          {recommendations.length > 0 ? recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          )) : (
            <>
              <RecommendationPlaceholder />
              <RecommendationPlaceholder />
              <RecommendationPlaceholder />
              <RecommendationPlaceholder />
            </>
          )}
          <StoriesPageLinkContainer>
            <StoriesPageLink href='/stories'>
                <Arrow />
            </StoriesPageLink>
            <LinkLabel>View All Stories</LinkLabel>
          </StoriesPageLinkContainer>
      </RecommendationsList>
    </RecommendationsContainer>
  );
}
