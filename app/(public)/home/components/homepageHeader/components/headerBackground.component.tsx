"use client";

import { useRef } from "react";
import { HeaderVideo, HeaderBackgroundContainer } from "../homepageHeader.styles";
import useHeaderScroll from "@/app/hooks/useHeaderScroll";

export default function HeaderBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useHeaderScroll(videoRef);
  return (
    <HeaderBackgroundContainer>
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
    </HeaderBackgroundContainer>
  );
}
