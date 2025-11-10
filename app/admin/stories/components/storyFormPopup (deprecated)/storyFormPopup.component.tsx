"use client";

import { useState, FormEvent } from "react";
import { Category, Story } from "@/app/types/types";
import Popup from "../../../shared/components/popup/popup.component"
import { SimpleEditor } from "@/app/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  FormInput,
  FormLabel,
  FormTextArea,
  FormSelect,
  EditorContainer,
} from "../../../shared/components/form/FormElements";
import { CloseButton } from "../../../shared/components/button/button";
import FileInputContainer from "@/app/admin/shared/components/fileInput/fileInput.component";
import CategoriesSearch from "../categoriesSearch/categoriesSearch.component";
import { SectionTitle, Separator } from "../../../shared/components/layout/Section";
import { CreateStoryButton } from "../../../shared/components/button/button"; 

interface StoryFormPopupProps {
  isOpen: boolean;
  isEditing: boolean;
  story: Story | null;
  selectedCategories: Category[];
  onCloseAction: () => void;
  onSubmitSuccessAction: () => void;
  onCategoriesChangeAction: (categories: Category[]) => void;
  createStoryAction: (formData: FormData) => Promise<void>;
  editStoryAction: (id: string, formData: FormData) => Promise<void>;
}

export default function StoryFormPopup({
  isOpen,
  isEditing,
  story,
  selectedCategories,
  onCloseAction,
  onSubmitSuccessAction,
  onCategoriesChangeAction,
  createStoryAction,
  editStoryAction,
}: StoryFormPopupProps) {
  const [submitting, setSubmitting] = useState(false);
  const [editorContent, setEditorContent] = useState(story?.content || '');


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    formData.append("content", editorContent);

    selectedCategories.forEach((category) => {
      formData.append("categories", category.id);
    });

    try {
      if (isEditing && story) {
        await editStoryAction(story.id, formData);
      } else {
        await createStoryAction(formData);
      }
      onSubmitSuccessAction();
    } catch (error) {
      console.error(error);
      alert(
        `There was an error ${isEditing ? "updating" : "creating"} the story.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (!isOpen) return null;

  return (
    <Popup>
      <CloseButton onClick={() => onCloseAction()} />
      <SectionTitle>
        {isEditing ? "Edit Story" : "Create New Story"}
      </SectionTitle>

      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput name="title" required defaultValue={story?.title || ""} className="wide" />

        <FormLabel htmlFor="content">Content</FormLabel>
        <EditorContainer>
          <SimpleEditor value={editorContent} onChange={setEditorContent} />
        </EditorContainer>
        <Separator />

        <FormLabel htmlFor="summary">Summary</FormLabel>
        <FormTextArea
          height="100"
          name="summary"
          required
          defaultValue={story?.summary || ""}
        />

        <FormLabel htmlFor="borough">Borough</FormLabel>
        <FormSelect
          name="borough"
          required
          defaultValue={story?.borough || "new york"}
        >
          {[
            "new york",
            "brooklyn",
            "manhattan",
            "bronx",
            "queens",
            "staten island",
          ].map((borough) => (
            <option key={borough} value={borough}>
              {capitalizeWords(borough)}
            </option>
          ))}
        </FormSelect>

        <FormLabel>Categories</FormLabel>
        <CategoriesSearch
          selectedCategories={selectedCategories}
          setSelectedCategories={onCategoriesChangeAction}
        />

        <FormLabel>Thumbnail</FormLabel>
        <FileInputContainer
          url={story?.thumbnail || ""}
        />

        <CreateStoryButton type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditing ? "Save" : "Create Story"}
        </CreateStoryButton>
      </form>
    </Popup>
  );
}
