import { Story } from "@/app/types/types";
import { StoryContainer, StoryContent } from "./savedStories.styles";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SavedStory({ story }: { story: Story }) {

    const router = useRouter();
    
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <StoryContainer
    onClick={() => router.push(`/story/${story.id}`)}
    >
      <StoryContent>
            <h2 className="title">
              <Link href={`/story/${story.id}`}>{story.title}</Link>
            </h2>
            <div className="info">
              <span>{date}</span>
              <span className="divider">・</span>
              {story.categories.length > 0 && (
                  <span>{story.categories[0].name}</span>
              )}
            </div>
            
      </StoryContent>
      <img src={story.thumbnail} alt="thumbnail" />

    </StoryContainer>
  );
}
