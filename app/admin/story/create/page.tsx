"use client";

import { useState, FormEvent } from "react";
import { Category } from "@/app/types/types";
import { SimpleEditor } from "@/app/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  FormInput,
  FormLabel,
  FormTextArea,
  FormSelect,
  EditorContainer,
} from "../../shared/components/form/FormElements";
import FileInputContainer from "@/app/admin/shared/components/fileInput/fileInput.component";
import CategoriesSearch from "../../stories/components/categoriesSearch/categoriesSearch.component";
import {
  PageSection,
  SectionTitle,
  Separator,
} from "../../shared/components/layout/Section";
import { CreateStoryButton } from "../../shared/components/button/button";
import { useAdminServerActions } from "@/app/contexts/admin-server-actions";
import { redirect } from "next/navigation";

export default function CreateStoryPage() {
  const { createStory } = useAdminServerActions();

  const [submitting, setSubmitting] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);

    formData.append("content", editorContent);

    selectedCategories.forEach((category) => {
      formData.append("categories", category.id);
    });

    try {
      await createStory(formData);
    } catch (error) {
      console.error(error);
      alert("There was an error creating the story.");
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

  return (
    <PageSection>
      <SectionTitle>Create New Story</SectionTitle>

      <form onSubmit={handleSubmit}>
        <FormLabel>Thumbnail</FormLabel>
        <FileInputContainer url={""} />
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput name="title" required className="wide" />

        <FormLabel htmlFor="content">Content</FormLabel>
        <EditorContainer>
          <SimpleEditor value={editorContent} onChange={setEditorContent} />
        </EditorContainer>
        <Separator />

        <FormLabel htmlFor="summary">Summary</FormLabel>
        <FormTextArea height="100" name="summary" required />

        <FormLabel htmlFor="borough">Borough</FormLabel>
        <FormSelect name="borough" required>
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
          {submitting ? "Saving..." : "Create Story"}
        </CreateStoryButton>
      </form>
    </PageSection>
  );
}
