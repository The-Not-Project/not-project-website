"use server";

import { internalApiFetch } from "@/lib/internal-api";
import { CompactStory, Filters, Story } from "../../../app/types/types";
import { auth0 } from "@/lib/auth0/auth0";
import {
  getStoryData,
  processThumbnail,
} from "@/lib/internal-api/helpers/story.helpers";
import { redirect } from "next/navigation";
import { getUserAction } from "./user.actions";

export async function getStoriesAction(filters?: Filters) {
  const { data, error } = await internalApiFetch<CompactStory[]>("/stories", {
    method: "GET",
    params: {
      search: filters?.search,
      boroughs: filters?.boroughs,
      categories: filters?.categories,
    },
    next: {
      revalidate: 60,
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
        revalidate: 60,
        tags: ["hidden-stories"],
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
  const session = await auth0.getSession();
  const userId = session?.user?.sub || undefined;

  const { data, error, status } = await internalApiFetch<Story>(
    `/stories/s/${id}`,
    {
      method: "GET",
      params: { userId },
      next: {
        revalidate: 60,
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
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to view saved stories.",
        status: 401,
        stories: [],
      };
    }

    const userId = session.user.sub;

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
  let userRecord;

  try {
    const { user, success } = await getUserAction();

    if (!success || !user) {
      return {
        success: false,
        message: "User not found or authenticated",
        status: 401,
      };
    }

    if (!user.firstName || !user.lastName) {
      userRecord = user; // Store for redirect logic below
    } else {
      userRecord = user;
    }
  } catch (err) {
    return {
      success: false,
      message: "Authentication check failed",
      status: 500,
    };
  }

  if (!userRecord?.firstName || !userRecord?.lastName) {
    redirect("/admin/personal-info");
  }

  try {
    const { title, content, borough, summary, categoryIds, thumbnail } =
      getStoryData(formData);

    if (!thumbnail) {
      return { success: false, message: "Thumbnail is required" };
    }

    const thumbnailUrl = await processThumbnail(thumbnail as File);

    const { error, status } = await internalApiFetch("/stories", {
      method: "POST",
      body: {
        title,
        content,
        borough,
        summary,
        thumbnailUrl,
        categoryIds,
        authorId: userRecord.id,
      },
    });

    if (error) {
      return { success: false, message: error, status };
    }


    return {
      success: true,
      message: "Story created successfully!",
    };
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
  try {
    const { title, content, borough, summary, categoryIds, thumbnail } =
      getStoryData(formData);

    let thumbnailUrl: string | undefined;

    // Only process the thumbnail if a valid new file is present
    if (
      thumbnail &&
      thumbnail instanceof File &&
      thumbnail.size > 0 &&
      thumbnail.name !== "undefined"
    ) {
      thumbnailUrl = await processThumbnail(thumbnail as File);
    }

    const { error, status } = await internalApiFetch(`/stories/${id}`, {
      method: "PATCH",
      body: {
        title,
        content,
        borough,
        summary,
        categoryIds,
        thumbnailUrl,
      },
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
