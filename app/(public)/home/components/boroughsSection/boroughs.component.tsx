"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/zustand/store";
import Link from "next/link";
import NextImage from "next/image";
import {
  BoroughsSectionContainer,
  SVGContainer,
  Background,
  BoroughPopup,
  BoroughSelector,
  BoroughButton,
} from "./boroughs.styles";
import MapSVG from "./MapSVG";
import CompactMap from "./MapSGVCompact";
import { IoChevronForwardSharp } from "react-icons/io5";
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
  const [shrinkingBorough, setShrinkingBorough] = useState<
    string | undefined
  >();
  const router = useRouter();

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

  // useEffect(() => {
  //   const defaultBorough = isMobile ? undefined : "queens";
  //   setActiveBorough(defaultBorough);
  //   setFileName(defaultBorough ?? "nyc");
  //   setVisibleName(formatBoroughName(defaultBorough ?? "nyc"));
  // }, [isMobile]);

  const handleClick = (borough: string) => {
    if (window.innerWidth <= 600) {
      if (borough === activeBorough) {
        setShrinkingBorough(borough);
        setActiveBorough(undefined);
        setFileName("nyc");
        setTimeout(() => {
          setShrinkingBorough(undefined);
        }, 2);
      } else {
        setActiveBorough(borough);
        setFileName(borough);
        setVisibleName(formatBoroughName(borough));
      }
    } else {
      router.push(`/stories/${borough}`);
    }
  };

  const handleButtonClick = (index: number) => {
    setBoroughIndex(index);
    const borough = boroughs[index];
    setActiveBorough(borough);
    setTimeout(() => setFileName(borough), 100);
    setTimeout(() => setVisibleName(formatBoroughName(borough)), 333);
  };

  const handleMouseEnter = (borough: string) => {
    if (borough === activeBorough) return;

    setActiveBorough(borough);
    setTimeout(() => setFileName(borough), 100);
    setTimeout(() => setVisibleName(formatBoroughName(borough)), 250);
  };

  return (
    <>
      <BoroughsSectionContainer
        key={activeBorough}
        className={fileName === "nyc" && isMobile ? "secondary" : ""}
      >
        {isMobile ? (
          <>
            {fileName != "nyc" ? (
              <BoroughPopup onClick={() => handleClick(activeBorough ?? "")}>
                <h2>
                  <Link href={`stories/${activeBorough}`}>
                    {visibleName} <IoChevronForwardSharp className="icon" />
                  </Link>
                </h2>
                {/* <Link href={`stories/${activeBorough}`}>See stories</Link> */}
                {/* <button onClick={() => handleClick(activeBorough ?? '')}>collapse</button> */}
              </BoroughPopup>
            ) : (
              <h1>The Five Boroughs</h1>
            )}
          </>
        ) : (
          <div className="description">
            <h2 key={boroughIndex + 1}>{visibleName}</h2>
            <hr />
            <p key={boroughIndex}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
              doloribus, laboriosam exercitationem error saepe voluptatum.
            </p>
            <Link href={`stories/${activeBorough}`}>
              Visit <Arrow />
            </Link>
          </div>
        )}

        <Background key={boroughIndex}>
          <NextImage
            src={`/media/boroughBackdrops/${fileName}.jpg`}
            alt={fileName}
            className="object-cover"
            fill
            unoptimized
          />
          {/* <SVGContainer>
            {isMobile ? (
              <CompactMap
                activeBorough={activeBorough}
                onClickAction={handleClick}
                shrinkingBorough={shrinkingBorough}
              />
            ) : (
              <MapSVG
                activeBorough={activeBorough}
                onMouseEnterAction={handleMouseEnter}
                onClickAction={handleClick}
              />
            )}
          </SVGContainer> */}
        </Background>
      </BoroughsSectionContainer>
      <BoroughSelector>
        <BoroughButton
          className={clsx({ active: boroughIndex === 0 })}
          onClick={() => handleButtonClick(0)}
        />
        <BoroughButton
          className={clsx({ active: boroughIndex === 1 })}
          onClick={() => handleButtonClick(1)}
        />
        <BoroughButton
          className={clsx({ active: boroughIndex === 2 })}
          onClick={() => handleButtonClick(2)}
        />
        <BoroughButton
          className={clsx({ active: boroughIndex === 3 })}
          onClick={() => handleButtonClick(3)}
        />
        <BoroughButton
          className={clsx({ active: boroughIndex === 4 })}
          onClick={() => handleButtonClick(4)}
        />
      </BoroughSelector>
    </>
  );
}
