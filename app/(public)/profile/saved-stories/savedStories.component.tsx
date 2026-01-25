import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import { PageSection, SectionDescription } from "../styles";
import { StoriesContainer } from "./savedStories.styles";
import { useEffect, useState } from "react";
import { CompactStory } from "@/app/types/types";
import SavedStory from "./savedStory.component";

export default function SavedStories({ userId }: { userId: string }) {
  const { getSavedStories } = usePublicServerActions();

  const [savedStories, setSavedStories] = useState<CompactStory[] | null>([]);

  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        const stories = await getSavedStories(userId);
        setSavedStories(stories);
      } catch (error) {
        console.error("Failed to fetch saved stories:", error);
      }
    };
    fetchSavedStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
