"use client";

import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import useRadarVisibility from "@/app/hooks/useRadarVisibility";
import {
  RadarDescription,
  RadarPhoto,
  RadarCardContainer,
  CategoriesContainer,
  Category,
  ArrowLink,
  LocationContainer,
} from "./radarCard.styles";
import { useEffect, useState } from "react";
import { Story } from "@/app/types/types";
import { useRouter } from "next/navigation";
import clsx from "clsx";
// import { FaArrowRight as Arrow } from "react-icons/fa6";
import { FiArrowRight as Arrow } from "react-icons/fi";

import { BiMap as Location } from "react-icons/bi";

export default function RadarCard() {
  const { getRadarStory } = usePublicServerActions();
  const [radarStory, setRadarStory] = useState<Story | null>(null);
  const { ref, isVisible } = useRadarVisibility({ threshold: 1 });
  const router = useRouter();

  useEffect(() => {
    async function fetchRadarStory() {
      const story = await getRadarStory();
      setRadarStory(story);
    }

    fetchRadarStory();
  }, [getRadarStory]);

  if (!radarStory)
    return (
      <>
        <RadarCardContainer>
          <RadarDescription $isVisible={isVisible} $url={""}>
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
    <RadarCardContainer
      ref={ref}
      //  onClick={() => router.push(`story/${radarStory.id}`)}
    >
      <>
        <RadarDescription
          $isVisible={isVisible}
          $url={radarStory.thumbnail}
          ref={ref}
          className={clsx({ "is-visible": isVisible })}
        >
          {/* <CategoriesContainer>
            {radarStory.categories.map((category) => (
              <Category key={category.id}>{category.name}</Category>
            ))}
          </CategoriesContainer> */}
          <div className="main-info-container">
            <h2
              className={clsx(
                "title",
                "reveal-on-scroll",
                isVisible && "is-visible"
              )}
            >
              {radarStory.title}
            </h2>
            <p
              className={clsx(
                "summary",
                "reveal-on-scroll",
                isVisible && "is-visible"
              )}
            >
              “{radarStory.summary}”
            </p>
            <p
              className={clsx(
                "author",
                "reveal-on-scroll",
                isVisible && "is-visible"
              )}
            >
              By {radarStory.author.firstName} {radarStory.author.lastName}
            </p>
          </div>
          <div className="secondary-info-container">
            <ArrowLink
              href={`story/${radarStory.id}`}
              className={clsx("slide-on-scroll", isVisible && "is-visible")}
            >
              <Arrow />
            </ArrowLink>
            <LocationContainer
              onClick={() => router.push(`stories/${radarStory.borough}`)}
              className={clsx("slide-on-scroll", isVisible && "is-visible")}
            >
              <Location className="pin" />
              <svg viewBox="0 0 300 300" aria-hidden="true" className="circle">
                <defs>
                  <path
                    id="circlePath"
                    d="
          M 150,150
          m -100,0
          a 100,100 0 1,1 200,0
          a 100,100 0 1,1 -200,0
        "
                  />
                </defs>

                <text>
                  <textPath
                    href="#circlePath"
                    // text-anchor="middle"
                  >
                    • {radarStory.borough} • New York •
                  </textPath>
                </text>
              </svg>
            </LocationContainer>

            {/* <p className="date">{date}</p> */}
          </div>

          {/* <p className="date">{date}</p> */}
        </RadarDescription>
        <RadarPhoto
          $url={radarStory.thumbnail}
          className={clsx({ "is-visible": isVisible })}
        />
      </>
    </RadarCardContainer>
  );
}
