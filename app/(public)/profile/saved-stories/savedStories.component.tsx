import { getSavedStories } from "@/lib/prisma/repositories/storySaves.repository";
import { PageSection, SectionDescription } from "../styles";
import { StoriesContainer } from "./savedStories.styles";
import SavedStory from "./savedStory.component";

export default async function SavedStories() {

  const savedStories = await getSavedStories()

  return (
    <PageSection>
      <SectionDescription>
        <h2>Saved Stories</h2>
        <p>Here you can find all the stories you have saved.</p>
      </SectionDescription>

      <StoriesContainer>
        {savedStories && savedStories.length > 0 ? (
          savedStories.map((story) => (
            <SavedStory key={story.id} story={story} />
          ))
        ) : (
          <p>You have no saved stories.</p>
        )}
      </StoriesContainer>
    </PageSection>
  );
}
