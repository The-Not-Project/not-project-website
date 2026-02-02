"use client";

import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { SaveButton } from "./saveButton.styles";
import { createStorySave, deleteStorySave } from "@/app/database/repositories/storySaves.repository";
import clsx from "clsx";

export default function SaveButtonClient({ 
  storyId, initialSaved, userId 
}: { 
  storyId: string; initialSaved: boolean; userId?: string 
}) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [clicked, setClicked] = useState(false);

  const handleSave = async () => {
    if (!userId) {
      alert("You need to be logged in to save a story.");
      return;
    }

    const newStatus = !isSaved;
    setIsSaved(newStatus);

    if (newStatus) {
      setClicked(true);
      setTimeout(() => setClicked(false), 2000);
      await createStorySave(storyId, userId);
    } else {
      await deleteStorySave(storyId, userId);
    }
  };

  return (
    <SaveButton
      className={clsx("save-button", { saved: isSaved })}
      onClick={handleSave}
    >
      <span className={clsx({ visible: clicked })}>Saved!</span>
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
    </SaveButton>
  );
}