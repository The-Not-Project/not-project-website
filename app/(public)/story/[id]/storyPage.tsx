"use client";

import clsx from "clsx";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Story } from "@/app/types/types";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  CategoriesContainer,
  StoryContainer,
  SaveButton,
  SkeletonContainer,
  Skeleton,
  NotFound,
  StoryWrapper,
  ThumbnailContainer,
  InfoContainer,
} from "./style";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { StoryReader } from "./storyReader";
import Image from "next/image";

export default function StoryPage({ id }: { id: string }) {
  const { getStory, createStorySave, deleteStorySave, isStorySaved } =
    usePublicServerActions();

  const [story, setStory] = useState<Story | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const fetchStory = useCallback(async () => {
    const story = await getStory(id);
    setStory(story);
    setLoading(false);
  }, [id, getStory]);

  const handleSave = async () => {
    if (!user?.sub) {
      alert("You need to be logged in to save a story.");
      return;
    }

    if (isSaved) {
      setIsSaved(false);
      await deleteStorySave(id, user.sub);
    } else {
      setClicked(true);
      setIsSaved(true);
      setTimeout(() => {
        setClicked(false);
      }, 2000);
      await createStorySave(id, user.sub);
    }
  };

  useEffect(() => {
    (async () => {
      if (!user?.sub) return;
      const saved = await isStorySaved(id, user.sub);
      setIsSaved(saved);
    })();
  }, [id, isStorySaved, user?.sub]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  if (loading)
    return (
      <SkeletonContainer>
        <Skeleton className="title" />
        <Skeleton className="title half" />
        <Skeleton className="thumbnail" />
        <Skeleton className="paragraph" />
        <Skeleton className="paragraph" />
        <Skeleton className="paragraph" />
        <Skeleton className="paragraph" />
        <Skeleton className="paragraph half" />
      </SkeletonContainer>
    );

  if (!story)
    return (
      <NotFound>
        We couldn&apos;t find the story you&apos;re looking for :&apos;(
      </NotFound>
    );

  const author = `${story.author.firstName} ${story.author.lastName}`;
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StoryWrapper>
      {loading ? (
        <SkeletonContainer />
      ) : (
        <StoryContainer>
          {story.categories.length > 0 && (
            <CategoriesContainer>
              <SaveButton
                className={clsx("save-button", { saved: isSaved })}
                onClick={handleSave}
              >
                <span className={clsx({ visible: clicked })}>Saved!</span>
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </SaveButton>
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
          <h1 className="title">{story.title}</h1>
          <ThumbnailContainer>
            <Image
              src={story.thumbnail || ""}
              alt="thumbnail"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 850px) 100vw, 1200px"
              priority
            />
          </ThumbnailContainer>
          <InfoContainer>
            <p>By {author}</p>
            <p>{date}</p>
          </InfoContainer>
          <div className="prose">
            <StoryReader value={story.content} />
          </div>
        </StoryContainer>
      )}
    </StoryWrapper>
  );
}
