import { getStory } from "@/lib/prisma/repositories/story.repository";
import { auth0 } from "@/lib/auth0/auth0";
import {
  CategoriesContainer,
  InfoContainer,
  NotFound,
  ThumbnailContainer,
} from "../style";
import { isStorySaved } from "@/lib/prisma/repositories/storySaves.repository";
import SaveButton from "../saveButton/saveButton.component";
import { Fragment } from "react";
import Image from "next/image";
import { StoryReader } from "../storyReader/storyReader";

export default async function StoryContent({ id }: { id: string }) {
  const [story, session] = await Promise.all([
    getStory(id),
    auth0.getSession(),
  ]);

  if (!story)
    return (
      <NotFound>
        {" "}
        We couldn&apos;t find the story you&apos;re looking for :&apos;(
      </NotFound>
    );

  const user = session?.user;
  const initialSaved = user ? await isStorySaved(id, user.sub) : false;

  const author = `${story.author.firstName} ${story.author.lastName}`;
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <CategoriesContainer>
        <SaveButton
          storyId={id}
          initialSaved={initialSaved}
          userId={user?.sub}
        />
        {story.categories.map((category, index) => (
          <Fragment key={category.id}>
            <span>{category.name}</span>
            {index < story.categories.length - 1 && (
              <span className="divider">|</span>
            )}
          </Fragment>
        ))}
      </CategoriesContainer>

      <h1 className="title">{story.title}</h1>
      <ThumbnailContainer>
        <Image src={story.thumbnail || ""} alt="thumbnail" fill priority />
      </ThumbnailContainer>

      <InfoContainer>
        <p>By {author}</p>
        <p>{date}</p>
      </InfoContainer>

      <div className="prose">
        <StoryReader value={story.content} />
      </div>
    </>
  );
}
