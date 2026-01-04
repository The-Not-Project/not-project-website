// import { useState, useRef } from 'react';
import { Fragment } from "react";
import Link from "next/link";
import { useStore } from "@/app/zustand/store";
import { Story as StoryType } from "@/app/types/types";
import {
  StoryContainer,
  StoryContent,
  CategoriesContainer,
  MobileStoryBody,
} from "./storyCard.styles";
import {
  FaShare as ShareIcon,
  FaCalendar as CalenderIcon,
  FaTags as InfoIcon,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Story({ story }: { story: StoryType }) {
  const isMobile = useStore((state) => state.mobileLayout.isMobile);
  const router = useRouter();

  async function handleShare() {
    const url = `https://www.thenotproject.com/story/${story.id}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          // text: `Story written by ${story.author.firstName} ${story.author.lastName}`,
          url
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      alert('Link copied to clipboard!')
      navigator.clipboard.writeText(url)
    }
  }

  function openStory() {
    router.push(`/story/${story.id}`)
  }

  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StoryContainer>
      {isMobile ? (
        <MobileStoryBody>
          <div
            className="first-row"
            onClick={openStory}
          >
            <Image
              src={story.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover"
            />
            <div className="content">
              <h2>{story.title}</h2>
              <p>{story.summary.slice(0, 150 - story.title.length)}...</p>
            </div>
          </div>
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
        </MobileStoryBody>
      ) : (
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
          <div className="image-container">
            <Image
              src={story.thumbnail}
              className="object-cover"
              alt="thumbnail"
              fill
            />
          </div>
        </>
      )}
    </StoryContainer>
  );
}
