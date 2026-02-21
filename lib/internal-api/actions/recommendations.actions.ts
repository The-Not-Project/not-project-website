"use server";

import { internalApiFetch } from "@/lib/internal-api";
import { CompactStory } from "../../../app/types/types";
import { updateTag } from "next/cache";

export async function getRecommendationsAction() {
  const { data, error, status } = await internalApiFetch<CompactStory[]>(
    "/stories/recommended",
    {
      method: "GET",
      next: {
        revalidate: 3600,
        tags: ["recommendations"],
      },
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
}

export async function addRecommendationAction(id: string) {
  updateTag("recommendations");
  try {
    const { error, status } = await internalApiFetch(
      `/stories/${id}/recommend`,
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
      message: "Story added to recommendations!",
    };
  } catch (err) {
    console.error("ADD_RECOMMENDATION_ERROR:", err);
    return {
      success: false,
      message: "Failed to update recommendation status.",
      status: 500,
    };
  }
}

export async function removeRecommendationAction(id: string) {
  updateTag("recommendations");
  try {
    const { error, status } = await internalApiFetch(
      `/stories/${id}/recommend`,
      {
        method: "DELETE",
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
      message: "Recommendation removed successfully.",
    };
  } catch (err) {
    console.error("REMOVE_RECOMMENDATION_ERROR:", err);
    return {
      success: false,
      message: "Failed to remove recommendation status.",
      status: 500,
    };
  }
}
