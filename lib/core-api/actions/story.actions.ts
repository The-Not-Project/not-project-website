"use server";

import { internalApiFetch } from "..";
import { CompactStory, Filters, Story } from "@/app/types/types";
import { updateTag } from "next/cache";
import { headers } from "next/headers";

export async function getStoriesAction(filters?: Filters) {
  const { data, error } = await internalApiFetch<CompactStory[]>("/stories", {
    method: "GET",
    params: {
      search: filters?.search,
      boroughs: filters?.boroughs,
      categories: filters?.categories,
    },
    next: {
      revalidate: 300,
      tags: ["stories"],
    },
  });

  if (error) {
    return {
      success: false,
      message: error,
      stories: [],
    };
  }

  return {
    success: true,
    stories: data || [],
  };
}

export async function getHiddenStoriesAction() {
  const { data, error } = await internalApiFetch<CompactStory[]>(
    "/stories/hidden",
    {
      method: "GET",
      next: {
        revalidate: 300,
        tags: ["stories"],
      },
    },
  );

  if (error) {
    return {
      success: false,
      message: error,
      stories: [],
    };
  }

  return {
    success: true,
    stories: data || [],
  };
}

export async function getStoryAction(id: string) {
  const headerList = await headers();
  const userId = headerList.get("x-user-id") ?? undefined;

  const { data, error, status } = await internalApiFetch<Story>(
    `/stories/s/${id}`,
    {
      method: "GET",
      params: userId ? { userId } : {},
      next: {
        revalidate: 300,
        tags: [`story-${id}`],
      },
    },
  );

  if (error || !data) {
    return {
      success: false,
      message:
        status === 404 ? "Story not found" : error || "An error occurred",
      status,
      story: null,
    };
  }

  return {
    success: true,
    story: data,
  };
}

export const getSavedStoriesAction = async () => {
  try {
    const headerList = await headers();
    const userId = headerList.get("x-user-id") ?? undefined;

    const { data, error, status } = await internalApiFetch<CompactStory[]>(
      `/stories/saved/${userId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (error) {
      return {
        success: false,
        message: error,
        status,
        stories: [],
      };
    }

    return {
      success: true,
      stories: data || [],
    };
  } catch (err) {
    console.error("GET_SAVED_STORIES_ERROR:", err);
    return {
      success: false,
      message: "An unexpected error occurred",
      status: 500,
      stories: [],
    };
  }
};

export async function createStoryAction(formData: FormData) {
  updateTag("stories");
  const headerList = await headers();
  const userId = headerList.get("x-user-id");

  if (!userId) {
    throw new Error("NO_USER_SESSION_DETECTED");
  }

  try {
    formData.append("authorId", userId);
    const { error, status } = await internalApiFetch("/stories", {
      method: "POST",
      body: formData,
    });

    if (error) return { success: false, message: error, status };

    return { success: true, message: "Story created successfully!" };
  } catch (err: any) {
    console.error("CREATE_STORY_ERROR:", err);
    return {
      success: false,
      message: err.message || "Failed to create story",
      status: 500,
    };
  }
}

export async function updateStoryAction(id: string, formData: FormData) {
  updateTag("stories");
  updateTag(`story-${id}`);

  try {
    const { error, status } = await internalApiFetch(`/stories/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (error) {
      return { success: false, message: error, status };
    }

    return {
      success: true,
      message: "Story updated successfully!",
    };
  } catch (err: any) {
    console.error("EDIT_STORY_ERROR:", err);
    return {
      success: false,
      message:
        err.message || "An unexpected error occurred while updating the story.",
      status: 500,
    };
  }
}

export async function unpublishStoryAction(id: string) {
  updateTag("stories");

  try {
    const { error, status } = await internalApiFetch(
      `/stories/unpublish/${id}`,
      {
        method: "PATCH",
      },
    );

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Story unpublished successfully.",
    };
  } catch (err) {
    console.error("UNPUBLISH_STORY_ERROR:", err);
    return {
      success: false,
      message: "Failed to unpublish story. Please try again.",
      status: 500,
    };
  }
}

export async function republishStoryAction(id: string) {
  updateTag("stories");

  try {
    const { error, status } = await internalApiFetch(
      `/stories/republish/${id}`,
      {
        method: "PATCH",
      },
    );

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Story republished successfully!",
    };
  } catch (err) {
    console.error("REPUBLISH_STORY_ERROR:", err);
    return {
      success: false,
      message: "An error occurred while attempting to republish the story.",
      status: 500,
    };
  }
}

export async function createStorySaveAction(storyId: string, userId: string) {
  updateTag(`story-${storyId}`);
  try {
    const { error, status } = await internalApiFetch("/stories/save", {
      method: "POST",
      body: {
        storyId,
        userId,
      },
    });

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Story saved to your collection!",
    };
  } catch (err) {
    console.error("CREATE_STORY_SAVE_ERROR:", err);
    return {
      success: false,
      message: "Failed to save story. Please try again.",
      status: 500,
    };
  }
}

export async function deleteStorySaveAction(storyId: string, userId: string) {
  updateTag(`story-${storyId}`);
  try {
    const { error, status } = await internalApiFetch("/stories/save", {
      method: "DELETE",
      body: {
        storyId,
        userId,
      },
    });

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Story removed from your saved list.",
    };
  } catch (err) {
    console.error("DELETE_STORY_SAVE_ERROR:", err);
    return {
      success: false,
      message: "Failed to unsave story. Please try again.",
      status: 500,
    };
  }
}
