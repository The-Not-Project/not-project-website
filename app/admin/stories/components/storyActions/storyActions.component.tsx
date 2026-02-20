'use client'

import { Button } from "@/app/admin/shared/components/button/button";
import { ActionsContainer } from "../storyCard/storyCard.styles";
import Link from "next/link";

type ActionProps = {
  id: string;
  isPublished: boolean;
  unpublishAction: (id: string) => Promise<{ success: boolean; message: string }>;
  republishAction: (id: string) => Promise<{ success: boolean; message: string }>;
};

export default function storyActions({
  id,
  isPublished,
  unpublishAction,
  republishAction,
}: ActionProps) {
  async function handleUnpublish() {
    try {
      await unpublishAction(id);
    } catch (err) {
      console.log("Error unpublishing story: ", err);
    }
  }

  async function handleRepublish() {
    try {
      await republishAction(id);
    } catch (err) {
      console.log("Error publishing story: ", err);
    }
  }
  return (
    <ActionsContainer>
      {isPublished ? (
        <>
          <Button className="inverted">
            <Link href={`/admin/story/edit/${id}`}>Edit</Link>
          </Button>
          <Button onClick={handleUnpublish}>Hide</Button>
        </>
      ) : (
        <>
          <Button className="inverted" onClick={handleRepublish}>
            Restore
          </Button>
        </>
      )}
    </ActionsContainer>
  );
}
