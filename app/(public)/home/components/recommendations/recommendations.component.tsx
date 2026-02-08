import { getRecommendations } from "@/lib/prisma/repositories/recommendation.repository";
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
import { FiArrowUpRight as Arrow } from "react-icons/fi";
import RecommendationsPlaceholder from "./recommendation.placeholder";


export default async function Recommendations() {

  const recommendations = await getRecommendations()

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
            <RecommendationsPlaceholder />
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
