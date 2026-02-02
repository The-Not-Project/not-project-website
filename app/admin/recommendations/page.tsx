import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import RecommendationsList from "./components/recommendationsList/recommendationsList.component";
import RecommendationSearch from "../stories/components/storiesSearch/storiesSearch.component";
import {
  addRecommendation,
  getRecommendations,
} from "@/app/database/repositories/recommendation.repository";

export default async function RecommendationsPage() {

  const recommendations = await getRecommendations();

  return (
    <PageSection>
      <SectionTitle>Recommended stories</SectionTitle>
      <RecommendationsList
        recommendations={recommendations}
      />
      {recommendations.length < 4 && (
        <RecommendationSearch
          onAddAction={addRecommendation}
          skippedStoryIds={recommendations.map(rec => rec.id)}
        />
      )}
    </PageSection>
  );
}
