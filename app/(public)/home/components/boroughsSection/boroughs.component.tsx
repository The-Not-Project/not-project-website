"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import boroughs from "@/static/boroughs/boroughs.json";
import {
  BoroughsSectionContainer,
  Background,
  BoroughSelector,
  BoroughButton,
  ArrowContainer,
} from "./boroughs.styles";
import { FiArrowUpRight as Arrow } from "react-icons/fi";
import {
  FaAngleRight as IconRight,
  FaAngleLeft as IconLeft,
} from "react-icons/fa6";

const BOROUGHS = ["queens", "brooklyn", "manhattan", "bronx", "statenisland"];

export default function Boroughs() {
  const [activeBorough, setActiveBorough] = useState<{
    index: number;
    key: string;
    status: "idle" | "active";
  }>({
    index: 0,
    key: "queens",
    status: "idle",
  });

  const transitionTo = useCallback((nextIndex: number) => {
    const nextSlug = BOROUGHS[nextIndex];

    setActiveBorough((prev) => ({
      ...prev,
      index: nextIndex,
      status: "active",
    }));

    setTimeout(() => {
      setActiveBorough((prev) => ({
        ...prev,
        key: nextSlug,
      }));
    }, 333);

    setTimeout(() => {
      setActiveBorough((prev) => ({
        ...prev,
        status: "idle",
      }));
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      transitionTo((activeBorough.index + 1) % BOROUGHS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [activeBorough.index, transitionTo]);

  const { name, description } =
    boroughs[activeBorough.key.toLowerCase() as keyof typeof boroughs];

  return (
    <>
      <BoroughsSectionContainer>
        <div className={`description ${activeBorough.status}`}>
          <h2>{name}</h2>
          <hr />
          <p>{description}</p>
          <Link href={`stories/${activeBorough.key}`}>
            Visit <Arrow />
          </Link>
        </div>

        <Background className={activeBorough.status}>
          {BOROUGHS.map((borough) => (
            <Image
              key={borough}
              src={`/media/boroughBackdrops/${borough}.webp`}
              alt={borough}
              style={{
                objectFit: "cover",
                display: activeBorough.key === borough ? "block" : "none",
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
              activeBorough.index === 0
                ? BOROUGHS.length - 1
                : activeBorough.index - 1,
            )
          }
        >
          <IconLeft />
        </ArrowContainer>
        {BOROUGHS.map((borough, idx) => (
          <BoroughButton
            key={borough}
            className={clsx({ active: activeBorough.index === idx })}
          />
        ))}
        <ArrowContainer
          onClick={() =>
            transitionTo((activeBorough.index + 1) % BOROUGHS.length)
          }
        >
          <IconRight />
        </ArrowContainer>
      </BoroughSelector>
    </>
  );
}
