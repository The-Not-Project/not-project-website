import { auth0 } from "@/lib/auth0/auth0";
import {
  CategoriesContainer,
  ErrorMessage,
  InfoContainer,
  ThumbnailContainer,
} from "../style";
import SaveButton from "../saveButton/saveButton.component";
import { Fragment } from "react";
import Image from "next/image";
import { StoryReader } from "../storyReader/storyReader";
import { getStoryAction } from "@/lib/internal-api/actions/story.actions";
import Link from "next/link";

export default async function StoryContent({ id }: { id: string }) {
  const session = await auth0.getSession();
  const user = session?.user;

  const { story, success, status, message } = await getStoryAction(id);

  if (!success || !story) {
    if (status === 404) {
      return (
        <ErrorMessage>
          We couldn&apos;t find the story you&apos;re looking for :&apos;(
        </ErrorMessage>
      );
    } else {
      return <ErrorMessage>{message}</ErrorMessage>;
    }
  }

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
          initialSaved={story.isSaved}
          userId={user?.sub}
        />
        {story.categories.map((category, index) => (
          <Fragment key={category.id}>
            <Link href={`/stories?cat=${category.id}`}>{category.name}</Link>
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
