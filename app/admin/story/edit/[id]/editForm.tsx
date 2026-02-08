"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category, Story } from "@/app/types/types";
import { SimpleEditor } from "@/app/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  FormInput,
  FormLabel,
  FormTextArea,
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
import {
  FilterOptionsContainer as BoroughsContainer,
  FilterOption as BoroughOption,
} from "../../../stories/components/storiesFilteredSearch/storiesFilteredSearch.styles";
import { getCategories } from "@/lib/prisma/repositories/category.repository"

type FormProps = {
  story: Story;
  editAction: (id: string, formData: FormData) => Promise<void>;
};
export default function EditStoryPage({ story, editAction }: FormProps) {
  const [editorContent, setEditorContent] = useState(story.content);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    story.categories,
  );
  const [selectedBorough, setSelectedBorough] = useState<string>(story.borough);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBoroughClick = (borough: string) => {
    if (selectedBorough !== borough) {
      setSelectedBorough(borough);
    }
  };

  const formAction = (formData: FormData) => {
    formData.append("content", editorContent);
    formData.append("borough", selectedBorough);

    selectedCategories.forEach((category) => {
      formData.append("categories", category.id);
    });

    startTransition(async () => {
      try {
        await editAction(story.id, formData);
        router.push("/admin/stories");
      } catch (error) {
        console.error(error);
        alert("There was an error updating the story.");
      }
    });
  };

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <PageSection>
      <SectionTitle>Edit Story</SectionTitle>

      <form action={formAction}>
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
        <BoroughsContainer>
          {[
            "new york",
            "brooklyn",
            "manhattan",
            "bronx",
            "queens",
            "staten island",
          ].map((borough) => (
            <BoroughOption
              key={borough}
              className={selectedBorough === borough ? "selected" : ""}
              onClick={() => handleBoroughClick(borough)}
            >
              {capitalizeWords(borough)}
            </BoroughOption>
          ))}
        </BoroughsContainer>

        <FormLabel>Categories</FormLabel>
        <CategoriesSearch
          getCategories={getCategories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <CreateStoryButton type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </CreateStoryButton>
      </form>
    </PageSection>
  );
}
