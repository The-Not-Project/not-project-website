import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import RecommendationsList from "./components/recommendationsList/recommendationsList.component";
import RecommendationSearch from "../stories/components/storiesSearch/storiesSearch.component";
import { addRecommendationAction, getRecommendationsAction } from "@/lib/internal-api/actions/recommendations.actions";

export default async function RecommendationsPage() {

  const {stories: recommendations} = await getRecommendationsAction();

  return (
    <PageSection>
      <SectionTitle>Recommended stories</SectionTitle>
      <RecommendationsList
        recommendations={recommendations}
      />
      {recommendations.length < 4 && (
        <RecommendationSearch
          onAddAction={addRecommendationAction}
          skippedStoryIds={recommendations.map(rec => rec.id)}
        />
      )}
    </PageSection>
  );
}
