import { Fragment } from "react";
import Link from "next/link";
import type { Story as StoryType } from "@/app/types/types";
import {
  StoryContainer,
  StoryContent,
  CategoriesContainer,
  StoryImageContainer,
} from "./storyCard.styles";
import {
  FaShare as ShareIcon,
  FaCalendar as CalenderIcon,
  FaTags as InfoIcon,
} from "react-icons/fa6";
import Image from "next/image";

export default function StoryCard({ story }: { story: StoryType }) {

  async function handleShare() {
    const url = `https://www.thenotproject.com/story/${story.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(url);
    }
  }

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
          <span onClick={handleShare}>
            <ShareIcon /> Share
          </span>
        </div>
        <StoryImageContainer>
          <Image
            src={story.thumbnail}
            alt="thumbnail"
            fill
            sizes="350px"
          />
        </StoryImageContainer>
      </>
    </StoryContainer>
  );
}
