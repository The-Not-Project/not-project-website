"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BoroughsSectionContainer,
  Background,
  BoroughSelector,
  BoroughButton,
  ArrowContainer,
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
  const [data, setData] = useState<{
    index: number;
    active: string;
    status: "idle" | "active";
  }>({
    index: 0,
    active: "queens",
    status: "idle",
  });

  const transitionTo = useCallback((nextIndex: number) => {
    const nextSlug = BOROUGHS[nextIndex];

    setData((prev) => ({ ...prev, index: nextIndex, status: "active" }));

    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        active: nextSlug
      }));
    }, 333);

        setTimeout(() => {
      setData((prev) => ({
        ...prev,
        status: "idle",
      }));
    }, 1000);
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
        <div className={`description ${data.status}`}>
          <h2>{formatBoroughName(data.active)}</h2>
          <hr />
          <p>{summary.description}</p>
          <Link href={`stories/${data.active}`}>
            Visit <Arrow />
          </Link>
        </div>

        <Background className={data.status}>
          {BOROUGHS.map((borough) => (
            <Image
              key={borough}
              src={`/media/boroughBackdrops/${borough}.webp`}
              alt={borough}
              style={{
                objectFit: "cover",
                display: data.active === borough ? "block" : "none",
              }}
              fill
              sizes="(max-width: 858px) 100vw, (min-width: 850px) 50vw"
              preload={true}
            />
          ))}
        </Background>
      </BoroughsSectionContainer>

      <BoroughSelector>
        <ArrowContainer
          onClick={() =>
            transitionTo(
              data.index === 0 ? BOROUGHS.length - 1 : data.index - 1,
            )
          }
        >
          <IconLeft />
        </ArrowContainer>
        {BOROUGHS.map((borough, idx) => (
          <BoroughButton
            key={borough}
            className={clsx({ active: data.index === idx })}
          />
        ))}
        <ArrowContainer
          onClick={() => transitionTo((data.index + 1) % BOROUGHS.length)}
        >
          <IconRight />
        </ArrowContainer>
      </BoroughSelector>
    </>
  );
}
