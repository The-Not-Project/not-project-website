"use client";

import { useAdminServerActions } from "@/app/contexts/admin-server-actions";
import { Category, Filters, Story } from "@/app/types/types";
import { useState, useEffect, useCallback } from "react";
import {
  PageSection,
  SectionTitle,
  StoriesSection,
} from "../shared/components/layout/Section";
import StoriesList from "./components/storiesList/storiesList.component";
import StoryFormPopup from "./components/storyFormPopup/storyFormPopup.component";
import StoriesSearch from "./components/storiesFilteredSearch/storiesFilteredSearch.component";
import { Button } from "../shared/components/button/button";
import StoriesToggle from "./components/StoriesToggle/storiesToggle.component";

type FormState = {
  isOpen: boolean;
  isEditing: boolean;
  currentStory: Story | null;
  selectedCategories: Category[];
};

const defaultFilters = {
  search: "",
  boroughs: [],
  categories: [],
};

export default function StoriesPage() {
  const {
    createStory,
    getStories,
    // deleteStory,
    editStory,
    getHiddenStories,
    unpublishStory,
    republishStory,
  } = useAdminServerActions();

  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    isOpen: false,
    isEditing: false,
    currentStory: null,
    selectedCategories: [],
  });

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const fetchStories = useCallback(
    async (appliedFilters: Filters = defaultFilters) => {
      setIsLoading(true);
      try {
        const data = await getStories(appliedFilters);
        setStories(data);
      } finally {
        setIsLoading(false);
      }
    },
    [getStories]
  );

  const fetchHiddenStories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getHiddenStories();
      setStories(data);
    } finally {
      setIsLoading(false);
    }
  }, [getHiddenStories]);

  useEffect(() => {
    if (showHidden) {
      fetchHiddenStories();
    } else {
      fetchStories(filters);
    }
  }, [filters, fetchStories, showHidden]);

  const handleOpenCreate = async () => {
    setFormState({
      isOpen: true,
      isEditing: false,
      currentStory: null,
      selectedCategories: [],
    });
  };

  const handleOpenEdit = (story: Story) => {
    setFormState({
      isOpen: true,
      isEditing: true,
      currentStory: story,
      selectedCategories: story.categories,
    });
  };

  const handleClosePopup = async () => {
    setFormState((prev) => ({
      ...prev,
      isOpen: false,
      currentStory: null,
      selectedCategories: [],
    }));
  };

  const handleSubmitSuccess = async () => {
    await fetchStories();
    handleClosePopup();
  };

  const handleHideStory = async (id: string) => {
    try {
      await unpublishStory(id);
      await fetchStories();
    } catch (error) {
      alert("Error hiding story: " + error);
    }
  };

  const handleRepublishStory = async (id: string) => {
    try {
      await republishStory(id);
      await fetchHiddenStories();
    } catch (error) {
      alert("Error republishing story: " + error);
    }
  };

  // const handleDeleteStory = async (id: string) => {
  //   try {
  //     await deleteStory(id);
  //     await fetchHiddenStories();
  //   } catch (error) {
  //     alert("Error deleting story: " + error);
  //   }
  // };

  return (
    <PageSection>
      <SectionTitle>Stories</SectionTitle>
      <StoriesToggle showHidden={showHidden} setShowHidden={setShowHidden} />
      <StoriesSection>
        <StoriesSearch filters={filters} setFilters={setFilters} />
        <div style={{ flexGrow: 1, marginTop: "10px" }}>
          <StoriesList
            isLoading={isLoading}
            stories={stories}
            onEdit={handleOpenEdit}
            // onDelete={handleDeleteStory}
            onHide={handleHideStory}
            onShow={handleRepublishStory}
          />

          {formState.isOpen && (
            <StoryFormPopup
              isOpen={formState.isOpen}
              isEditing={formState.isEditing}
              story={formState.currentStory}
              selectedCategories={formState.selectedCategories}
              onCloseAction={handleClosePopup}
              onSubmitSuccessAction={handleSubmitSuccess}
              onCategoriesChangeAction={(categories: Category[]) =>
                setFormState((prev) => ({
                  ...prev,
                  selectedCategories: categories,
                }))
              }
              createStoryAction={createStory}
              editStoryAction={editStory}
            />
          )}

          <Button className="cornered" onClick={handleOpenCreate}>
            Add
          </Button>
        </div>
      </StoriesSection>
    </PageSection>
  );
}
