import { Fragment } from "react";
import Link from "next/link";
import type { CompactStory as StoryType } from "@/app/types/types";
import {
  StoryContainer,
  StoryContent,
  CategoriesContainer,
  StoryImageContainer,
} from "./storyCard.styles";
import {
  FaCalendar as CalenderIcon,
  FaTags as InfoIcon,
} from "react-icons/fa6";
import Image from "next/image";
import ShareButton from "./components/shareButton";

export default function StoryCard({ story }: { story: StoryType }) {
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StoryContainer>
      <>
        <StoryContent>
          {story.categories.length > 0 && (
            <CategoriesContainer>
              {story.categories.map((category, index) => (
                <Fragment key={category.id}>
                  <span>{category.name}</span>
                  {index < story.categories.length - 1 && (
                    <span className="divider">|</span>
                  )}
                </Fragment>
              ))}
            </CategoriesContainer>
          )}
          <h2 className="title">
            <Link href={`/story/${story.id}`}>{story.title}</Link>
          </h2>
          <p>{story.summary}</p>
          <p className="createdAt">{date}</p>
        </StoryContent>
        <div className="second-row">
          <span>
            <CalenderIcon /> {date}
          </span>
          {story.categories.length > 0 && (
            <span>
              <InfoIcon /> {story.categories[0].name}
            </span>
          )}
          <ShareButton id={story.id} title={story.title} />
        </div>
        <StoryImageContainer>
          <Image
            src={story.thumbnail}
            alt="thumbnail"
            fill
            sizes="350px"
            style={{ objectFit: "cover" }}
          />
        </StoryImageContainer>
      </>
    </StoryContainer>
  );
}
