import { CompactStory } from "@/app/types/types";
import { RecommendationsListContainer } from "./recommendationsList.styles";
import { NoStoriesMessage } from "@/app/admin/stories/components/storiesList/storiesList.styles";
import RecommendationCard from "../recommendationCard/recommendationCard.component";
import { removeRecommendation } from "@/lib/prisma/repositories/recommendation.repository";
type RecommendationsListProps = {
  recommendations: CompactStory[];
};

export default function RecommendationsList({
  recommendations,
}: RecommendationsListProps) {
  if (!recommendations.length)
    return (
      <NoStoriesMessage>We have no recommended stories lol.</NoStoriesMessage>
    );

  return (
    <RecommendationsListContainer>
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          recommendation={rec}
          onRemoveAction={removeRecommendation}
        />
      ))}
    </RecommendationsListContainer>
  );
}
