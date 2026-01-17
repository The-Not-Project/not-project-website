import { Story } from "@/app/types/types";
import {
  StoryContainer,
  StoryContent,
  ThumbnailContainer,
} from "./savedStories.styles";
import Link from "next/link";
import Image from "next/image";

export default function SavedStory({ story }: { story: Story }) {
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <StoryContainer>
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
      <ThumbnailContainer>
        <Image
          src={story.thumbnail}
          alt="thumbnail"
          fill
          style={{objectFit: 'cover'}}
          sizes="(max-width: 850px) 100vw, 250px"
        />
      </ThumbnailContainer>
    </StoryContainer>
  );
}
