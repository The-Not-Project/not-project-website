"use client";

import { useState, useRef, useEffect } from "react";
import { CompactStory } from "@/app/types/types";
import Link from "next/link";
import clsx from "clsx";
import { FiArrowRight as Arrow } from "react-icons/fi";
import { BiMap as LocationPin } from "react-icons/bi";
import RotatingTextSVG from "./rotatingTextSVG.component";
import {
  RadarDescription,
  RadarPhoto,
  RadarCardContainer,
  ArrowLink,
  LocationContainer,
} from "../radarCard.styles";

export default function RadarCardClient({ radarStory }: { radarStory: CompactStory }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const thumbnail = encodeURI(radarStory.thumbnail);

  return (
    <RadarCardContainer ref={containerRef}>
      <RadarDescription
        $isVisible={isVisible}
        $url={thumbnail}
        className={clsx({ "is-visible": isVisible })}
      >
        <div className="main-info-container">
          <h2 className={clsx("title", "reveal-on-scroll", isVisible && "is-visible")}>
            {radarStory.title}
          </h2>
          <p className={clsx("summary", "reveal-on-scroll", isVisible && "is-visible")}>
            “{radarStory.summary}”
          </p>
          <p className={clsx("author", "reveal-on-scroll", isVisible && "is-visible")}>
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
          <Link href={radarStory.borough === "new york" ? "/stories" : `/stories/${radarStory.borough}`}>
            <LocationContainer className={clsx("slide-on-scroll", isVisible && "is-visible")}>
              <LocationPin className="pin" />
              <RotatingTextSVG borough={radarStory.borough} />
            </LocationContainer>
          </Link>
        </div>
      </RadarDescription>

      <RadarPhoto
        $url={thumbnail}
        className={clsx({ "is-visible": isVisible })}
      />
    </RadarCardContainer>
  );
}