"use client";

import { useState, FormEvent, useEffect } from "react";
import { useParams } from "next/navigation";
import { Category, Story } from "@/app/types/types";
import { SimpleEditor } from "@/app/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  FormInput,
  FormLabel,
  FormTextArea,
  FormSelect,
  EditorContainer,
} from "../../../shared/components/form/FormElements";
import FileInputContainer from "@/app/admin/shared/components/fileInput/fileInput.component";
import CategoriesSearch from "../../../stories/components/categoriesSearch/categoriesSearch.component";
import {
  PageSection,
  SectionTitle,
  Separator,
} from "../../../shared/components/layout/Section";
import { CreateStoryButton } from "../../../shared/components/button/button";
import { useAdminServerActions } from "@/app/contexts/admin-server-actions";
import { redirect } from "next/navigation";

export default function EditStoryPage() {
  const { id } = useParams();
  const { getStory, editStory } = useAdminServerActions();

  const [story, setStory] = useState<Story | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchStory() {
      try {
        const fetchedStory = await getStory(id as string);

        if (!fetchedStory) {
          alert("Story not found.");
          redirect("/admin/stories");
        }
        setStory(fetchedStory);
        setEditorContent(fetchedStory.content);
        setSelectedCategories(fetchedStory.categories);
      } catch (error) {
        console.error(error);
        alert("There was an error fetching the story.");
        redirect("/admin/stories");
      }
    }

    fetchStory();
  }, [id, getStory]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    formData.append("content", editorContent);

    selectedCategories.forEach((category) => {
      formData.append("categories", category.id);
    });

    try {
      await editStory(id as string, formData);
    } catch (error) {
      console.error(error);
      alert("There was an error updating the story.");
    } finally {
      setSubmitting(false);
      redirect("/admin/stories");
    }
  };

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <PageSection>
      <SectionTitle>Edit Story</SectionTitle>

      <form onSubmit={handleSubmit}>
        <FormLabel>Thumbnail</FormLabel>
        <FileInputContainer url={story.thumbnail} />
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          name="title"
          required
          defaultValue={story.title}
          className="wide"
        />

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
          defaultValue={story.summary}
        />

        <FormLabel htmlFor="borough">Borough</FormLabel>
        <FormSelect
          name="borough"
          required
          defaultValue={story.borough}
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
          setSelectedCategories={setSelectedCategories}
        />


        <CreateStoryButton type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </CreateStoryButton>
      </form>
    </PageSection>
  );
}
