import { getRadarStoryAction, updateRadarStoryAction } from "@/lib/internal-api/actions/radar.actions";
import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import StoriesSearch from "../stories/components/storiesSearch/storiesSearch.component";
import RadarStory from "./components/radarStory/radarStory.component";

export default async function Page() {

  const {story: radarStory} = await getRadarStoryAction()

  if (!radarStory) {
    return (
      <PageSection>
        <SectionTitle>Radar Story</SectionTitle>
        <p>Could not load radar story.</p>
      </PageSection>
    );
  }


  return (
    <PageSection>
      <SectionTitle>Radar Story</SectionTitle>
          <RadarStory
            story={radarStory}
          />
          <StoriesSearch
            placeholder="Replace radar story"
            onAddAction={updateRadarStoryAction}
            skippedStoryIds={[radarStory.id]}
          />
    </PageSection>
  );
}
