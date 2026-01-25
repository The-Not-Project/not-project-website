import { CompactStory as StoryType } from "@/app/types/types";
import {
  ActionsContainer,
  StoryContainer,
  StoryContentContainer,
  StoryImageContainer,
} from "./storyCard.styles";
import { Button } from "../../../shared/components/button/button";
import Link from "next/link";

type StoryProps = {
  story: StoryType;
  // onDelete: (id: string) => Promise<void>;
  onHide: (id: string) => Promise<void>;
  onShow: (id: string) => Promise<void>;
};

export default function Story({
  story,
  // onDelete,
  onHide,
  onShow,
}: StoryProps) {
  const date = new Date(story.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // const handleDelete = async (id: string) => {
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       await onDelete(id);
  //     } catch (error) {
  //       console.error("Failed to delete story:", error);
  //     }
  //   }
  // };

  return (
    <StoryContainer>
      <StoryImageContainer
        src={story.thumbnail}
        alt="Photo"
        width={150}
        height={100}
      />
      <StoryContentContainer>
        <h2>{story.title}</h2>
        <p>By {`${story.author.firstName} ${story.author.lastName}`}</p>
        <p>Created At {date}</p>
      </StoryContentContainer>
      <ActionsContainer>
        {story.isPublished ? (
          <>
            <Button className="inverted">
              <Link href={`/admin/story/edit/${story.id}`}>
                Edit
              </Link>
            </Button>
            <Button onClick={() => onHide(story.id)}>Hide</Button>
          </>
        ) : (
          <>
            <Button className="inverted" onClick={() => onShow(story.id)}>Restore</Button>
          </>
        )}
      </ActionsContainer>
    </StoryContainer>
  );
}
