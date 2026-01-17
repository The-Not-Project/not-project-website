"use client";

import { useEffect, useState, useCallback } from "react";
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
import {
  FaAngleRight as IconRight,
  FaAngleLeft as IconLeft,
} from "react-icons/fa6";

const BOROUGHS = ["queens", "brooklyn", "manhattan", "bronx", "statenisland"];

const formatBoroughName = (slug: string) => {
  const overrides: Record<string, string> = {
    bronx: "The Bronx",
    statenisland: "Staten Island",
  };
  return overrides[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

export default function Boroughs() {
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
      setData((prev) => ({
        ...prev,
        active: nextSlug,
        visibleName: formatBoroughName(nextSlug),
        file: nextSlug,
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
      <BoroughsSectionContainer>
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
            src={`/media/boroughBackdrops/${data.file}.webp`}
            alt={data.visibleName}
            style={{objectFit: 'cover'}}
            fill
            sizes="(max-width: 858px) 100vw, (min-width: 850px) 50vw"
          />
        </Background>
      </BoroughsSectionContainer>

      <BoroughSelector>
        <div
          className="icon"
          onClick={() => transitionTo((data.index - 1) % BOROUGHS.length)}
        >
          <IconLeft />
        </div>
        {BOROUGHS.map((borough, idx) => (
          <BoroughButton
            key={borough}
            className={clsx({ active: data.index === idx })}
          />
        ))}
        <div
          className="icon"
          onClick={() => transitionTo((data.index + 1) % BOROUGHS.length)}
        >
          <IconRight />
        </div>
      </BoroughSelector>
    </>
  );
}
