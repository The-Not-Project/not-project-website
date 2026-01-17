"use client";

import Image from "next/image";
import {
  CenterTitle,
  HeaderBackground,
  HeaderContainer,
  HeaderVideo,
  SeperatorContainer,
} from "./homepageHeader.styles";
import useHeaderScroll from "@/app/hooks/useHeaderScroll";
import { useRef } from "react";

export default function HomePageHeader() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useHeaderScroll(videoRef);

  return (
    <HeaderContainer>
      <HeaderBackground>
        <HeaderVideo
          ref={videoRef}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/firstframe.webp"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </HeaderVideo>
      </HeaderBackground>
      {/* <div className='quote'>“Not who they expected, exactly who I am”</div> */}
      <CenterTitle>
        <h2>Unbridled Stories, Untamed Voices.</h2>
        <h1>THE NOT</h1>
        <SeperatorContainer>
          <Image
            src="/media/knot-separator.png"
            alt="Logo"
            fill
            sizes="800px"
            unoptimized={false}
          />
        </SeperatorContainer>
        <h1>PROJECT</h1>
        <p>
          Explore meaningful stories from New York City, told without constraint
          or agenda.
        </p>
      </CenterTitle>
    </HeaderContainer>
  );
}
