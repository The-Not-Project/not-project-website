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
import {FaShare as ShareIcon, FaCalendar as CalenderIcon, FaTags as InfoIcon} from 'react-icons/fa6'
import { useRouter } from "next/navigation";

export default function Story({ story }: { story: StoryType }) {
  const isMobile = useStore((state) => state.mobileLayout.isMobile);
  const router = useRouter();

  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StoryContainer
      onClick={() => isMobile && router.push(`/story/${story.id}`)}
    >
      {isMobile ? (
        <MobileStoryBody>
          <div className="first-row">
            <img src={story.thumbnail} alt="thumbnail" />
            <div className="content">
              <h2>{story.title}</h2>
              <p>{story.summary.slice(0, 150 - story.title.length)}...</p>
            </div>
          </div>
          <div className="second-row">
            <span> <CalenderIcon />{" "}
              {new Date(story.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            {story.categories.length > 0 && (
              <span> <InfoIcon /> {story.categories[0].name}</span>
            )}
            <span><ShareIcon /> Share</span>
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
          <img src={story.thumbnail} className="desktop-thumbnail" alt="thumbnail" />
        </>
      )}
    </StoryContainer>
  );
}
