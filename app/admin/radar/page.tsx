import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import StoriesSearch from "../stories/components/storiesSearch/storiesSearch.component";
import RadarStory from "./components/radarStory/radarStory.component";
import { getRadarStory, updateRadarStory } from "@/app/database/repositories/radar.repository";

export default async function Page() {

  const radarStory = await getRadarStory()


  return (
    <PageSection>
      <SectionTitle>Radar Story</SectionTitle>
          <RadarStory
            story={radarStory}
          />
          <StoriesSearch
            placeholder="Replace radar story"
            onAddAction={updateRadarStory}
            skippedStoryIds={[radarStory.id]}
          />
    </PageSection>
  );
}
