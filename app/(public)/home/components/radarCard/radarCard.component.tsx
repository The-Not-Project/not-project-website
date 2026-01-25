"use client";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import {
  RadarDescription,
  RadarPhoto,
  RadarCardContainer,
  ArrowLink,
  LocationContainer,
} from "./radarCard.styles";
import { useEffect, useState, useRef, useCallback } from "react";
import { CompactStory } from "@/app/types/types";
import clsx from "clsx";
import { FiArrowRight as Arrow } from "react-icons/fi";

import { BiMap as LocationPin } from "react-icons/bi";
import Link from "next/link";
import RotatingTextSVG from "./assets/rotatingTextSVG.component";

export default function RadarCard() {
  const { getRadarStory } = usePublicServerActions();
  const [radarStory, setRadarStory] = useState<CompactStory | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    async function fetchStory() {
      const story = await getRadarStory();
      setRadarStory(story);
    }
    fetchStory();
  }, [getRadarStory]);

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            setIsVisible(true);
            observer.current?.disconnect();
          }
        },
        { threshold: 1.0 }
      );

      observer.current.observe(node);
    }
  }, []);

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

  return (
    <RadarCardContainer ref={containerRef}>
        <RadarDescription
          $isVisible={isVisible}
          $url={encodeURI(radarStory.thumbnail)}
          className={clsx({ "is-visible": isVisible })}
        >
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
            <Link
              href={
                radarStory.borough == "new york"
                  ? "/stories"
                  : `/stories/${radarStory.borough}`
              }
            >
              <LocationContainer
                className={clsx("slide-on-scroll", isVisible && "is-visible")}
              >
                <LocationPin className="pin" />
                <RotatingTextSVG borough={radarStory.borough} />
              </LocationContainer>
            </Link>
          </div>

        </RadarDescription>
        <RadarPhoto
          $url={encodeURI(radarStory.thumbnail)}
          className={clsx({ "is-visible": isVisible })}
        />
    </RadarCardContainer>
  );
}
