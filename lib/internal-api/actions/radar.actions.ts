'use server'

import { internalApiFetch } from "@/lib/internal-api";
import { CompactStory } from "../../../app/types/types";
import { updateTag } from "next/cache";

export async function getRadarStoryAction() {
  const { data, error, status } = await internalApiFetch<CompactStory>("/stories/radar", {
    method: "GET",
    next: { 
      revalidate: 3600,
      tags: ["radar"],
    },
  });

  if (error || !data) {
    return {
      success: false,
      message: error || "Could not retrieve radar story",
      status,
      story: null,
    };
  }

  return {
    success: true,
    story: data,
  };
}

export async function updateRadarStoryAction(id: string) {
  updateTag("radar");
  updateTag("stories");
  try {
    const { error, status } = await internalApiFetch(`/stories/radar/${id}`, {
      method: "PATCH",
    });

    if (error) {
      return { 
        success: false, 
        message: error, 
        status 
      };
    }

    return { 
      success: true, 
      message: "Radar story updated successfully!" 
    };

  } catch (err: any) {
    console.error("UPDATE_RADAR_STORY_ERROR:", err);
    return { 
      success: false, 
      message: err.message || "Failed to update radar story.", 
      status: 500 
    };
  }
}