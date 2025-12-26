"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/app/zustand/store";
import Link from "next/link";
import NextImage from "next/image";
import {
  BoroughsSectionContainer,
  Background,
  BoroughSelector,
  BoroughButton,
} from "./boroughs.styles";
import { FiArrowUpRight as Arrow } from "react-icons/fi";
import clsx from "clsx";

const formatBoroughName = (slug: string) => {
  switch (slug) {
    case "bronx":
      return "The Bronx";
    case "statenisland":
      return "Staten Island";
    default:
      return slug;
  }
};

const boroughs = ["queens", "brooklyn", "manhattan", "bronx", "statenisland"];

export default function Boroughs() {
  const isMobile = useStore((state) => state.mobileLayout.isMobile);
  const [fileName, setFileName] = useState<string>("queens");
  const [visibleName, setVisibleName] = useState<string>("queens");
  const [activeBorough, setActiveBorough] = useState<string | undefined>();
  const [boroughIndex, setBoroughIndex] = useState<number>(0);

  const switchBorough = () => {
    setBoroughIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % boroughs.length;
      setTimeout(() => setFileName(boroughs[newIndex]), 100);
      setTimeout(
        () => setVisibleName(formatBoroughName(boroughs[newIndex])),
        333
      );
      return newIndex;
    });
  };

  useEffect(() => {
    const images = boroughs.map((name) => {
      const img = new Image();
      img.src = `/media/boroughBackdrops/${name}.jpg`;
      return img;
    });

    const Interval = setInterval(() => switchBorough(), 10 * 1000);

    return () => {
      images.forEach((img) => {
        img.src = "";
      });
      clearInterval(Interval);
    };
  }, [boroughIndex]);

  const handleButtonClick = (index: number) => {
    setBoroughIndex(index);
    const borough = boroughs[index];
    setActiveBorough(borough);
    setTimeout(() => setFileName(borough), 100);
    setTimeout(() => setVisibleName(formatBoroughName(borough)), 333);
  };

  return (
    <>
      <BoroughsSectionContainer
        key={activeBorough}
        className={fileName === "nyc" && isMobile ? "secondary" : ""}
      >
        <div className="description" key={boroughIndex}>
          <h2>{visibleName}</h2>
          <hr />
          <p key={boroughIndex}>
            {isMobile
              ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut doloribus."
              : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut doloribus, laboriosam exercitationem error saepe voluptatum."}
          </p>
          <Link href={`stories/${activeBorough}`}>
            Visit <Arrow />
          </Link>
        </div>

        <Background key={boroughIndex + 1}>
          <NextImage
            src={`/media/boroughBackdrops/${fileName}.jpg`}
            alt={fileName}
            className="object-cover"
            fill
            unoptimized
          />
        </Background>
      </BoroughsSectionContainer>
      <BoroughSelector>

        {boroughs.map((borough, index) => (
          <BoroughButton
          key={index}
          className={clsx({ active: boroughIndex === index })}
          onClick={() => handleButtonClick(index)}
        />
        ))}
      </BoroughSelector>
    </>
  );
}
