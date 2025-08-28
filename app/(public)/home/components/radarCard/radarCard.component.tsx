"use client";

import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import useRadarVisibility from "@/app/hooks/useRadarVisibility";
import {
  RadarDescription,
  RadarPhoto,
  RadarCardContainer,
  CategoriesContainer,
  Category,
} from "./radarCard.styles";
import { useEffect, useState } from "react";
import { Story } from "@/app/types/types";
import { useRouter } from "next/navigation";

export default function RadarCard() {
  const { getRadarStory } = usePublicServerActions();
  const [radarStory, setRadarStory] = useState<Story | null>(null);
  const { ref, isVisible } = useRadarVisibility({ threshold: 0.9 });
  const router = useRouter();

  useEffect(() => {
    async function fetchRadarStory() {
      const story = await getRadarStory();
      setRadarStory(story);
    }

    fetchRadarStory();
  }, [getRadarStory]);

  if (!radarStory) return (
    <>
    <RadarCardContainer>
      <RadarDescription $isVisible={false} $url={""}>
        <div className="overlay"></div>
      </RadarDescription>
    </RadarCardContainer>
    </>
  );

  const date = new Date(radarStory.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <RadarCardContainer onClick={() => router.push(`story/${radarStory.id}`)}>
      <>
        <RadarDescription $isVisible={isVisible} $url={radarStory.thumbnail} ref={ref}>
          <CategoriesContainer>
            {radarStory.categories.map((category) => (
              <Category key={category.id}>{category.name}</Category>
            ))}
          </CategoriesContainer>
          <h2 className="title">{radarStory.title}</h2>
          <p className="summary">“{radarStory.summary}”</p>
          <p className="date">{date}</p>
          <div className="overlay"></div>
        </RadarDescription>
        <RadarPhoto $url={radarStory.thumbnail} />
      </>
    </RadarCardContainer>
  );
}
