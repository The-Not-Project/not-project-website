"use client";

import { useEffect, useState, useCallback } from "react";
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
import { BoroughSummaries } from "@/app/constants/boroughs";

const BOROUGHS = ["queens", "brooklyn", "manhattan", "bronx", "statenisland"];

const formatBoroughName = (slug: string) => {
  const overrides: Record<string, string> = {
    bronx: "The Bronx",
    statenisland: "Staten Island",
  };
  return overrides[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

export default function Boroughs() {
  const isMobile = useStore((state) => state.mobileLayout.isMobile);

  const [data, setData] = useState({
    index: 0,
    file: "queens",
    active: "queens",
    visibleName: "Queens",
  });

  const transitionTo = useCallback((nextIndex: number) => {
    const nextSlug = BOROUGHS[nextIndex];

    setData((prev) => ({ ...prev, index: nextIndex }));

    setTimeout(() => {
      setData((prev) => ({ ...prev, file: nextSlug }));
    }, 100);

    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        active: nextSlug,
        visibleName: formatBoroughName(nextSlug),
      }));
    }, 333);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      transitionTo((data.index + 1) % BOROUGHS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data.index, transitionTo]);

  const summary =
    BoroughSummaries[
      data.active.toLowerCase() as keyof typeof BoroughSummaries
    ];

  return (
    <>
      <BoroughsSectionContainer
        className={clsx(data.file === "nyc" && isMobile && "secondary")}
      >
        <div className="description" key={data.index}>
          <h2>{data.visibleName}</h2>
          <hr />
          <p>{summary.description}</p>
          <Link href={`stories/${data.active}`}>
            Visit <Arrow />
          </Link>
        </div>

        <Background key={data.index + 1}>
          <NextImage
            src={`/media/boroughBackdrops/${data.file}.jpg`}
            alt={data.visibleName}
            className="object-cover"
            fill
          />
        </Background>
      </BoroughsSectionContainer>

      <BoroughSelector>
        {BOROUGHS.map((borough, idx) => (
          <BoroughButton
            key={borough}
            className={clsx({ active: data.index === idx })}
            onClick={() => transitionTo(idx)}
          />
        ))}
      </BoroughSelector>
    </>
  );
}
