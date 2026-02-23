"use client";

import { useRef, useState, useTransition } from "react";
import { Category } from "@/app/types/types";
import { SimpleEditor, SimpleEditorHandle } from "@/app/tiptap/components/tiptap-templates/simple/simple-editor";
import {
  FormInput,
  FormLabel,
  FormTextArea,
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
import { useRouter } from "next/navigation";
import {
  FilterOptionsContainer as BoroughsContainer,
  FilterOption as BoroughOption,
} from "../../stories/components/storiesFilteredSearch/storiesFilteredSearch.styles";
import { getCategoriesAction } from "@/lib/internal-api/actions/categories.actions";

export default function CreateStoryForm({
  createAction,
}: {
  createAction: (formData: FormData) => Promise<{ success: boolean; message: string }>;
}) {
  const editorRef = useRef<SimpleEditorHandle>(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedBorough, setSelectedBorough] = useState<string>("new york");
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

    const editorFiles = editorRef.current?.getPendingFiles()
    if (editorFiles) {
      editorFiles.forEach((file, blobUrl) => {
        formData.append("editor_images", file, blobUrl)
      })
    }

    startTransition(async () => {
      try {
        await createAction(formData);
        router.push("/admin/stories");
      } catch (error) {
        console.error(error);
        alert("There was an error creating the story.");
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
      <SectionTitle>Create New Story</SectionTitle>

      <form action={formAction}>
        <FormLabel>Thumbnail</FormLabel>
        <FileInputContainer url={""} />
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput name="title" required className="wide" />

        <FormLabel htmlFor="content">Content</FormLabel>
        <EditorContainer>
          <SimpleEditor ref={editorRef} value={editorContent} onChange={setEditorContent} />
        </EditorContainer>
        <Separator />

        <FormLabel htmlFor="summary">Summary</FormLabel>
        <FormTextArea height="100" name="summary" required />

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
          getCategories={getCategoriesAction}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <CreateStoryButton type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Create Story"}
        </CreateStoryButton>
      </form>
    </PageSection>
  );
}
