"use client";

import Image from "next/image";
import {
  CenterTitle,
  HeaderBackground,
  HeaderContainer,
  HeaderVideo,
} from "./homepageHeader.styles";
import useHeaderScroll from "@/app/hooks/useHeaderScroll";

export default function HomePageHeader() {
  const { backgroundPosition } = useHeaderScroll();

  return (
    <HeaderContainer>
      <HeaderBackground>
        <HeaderVideo
          $position={backgroundPosition}
          autoPlay
          loop
          muted
          playsInline
          poster="/media/firstframe.png"
        >
          <source src="/media/output.webm" type="video/webm" />
        </HeaderVideo>
      </HeaderBackground>
      {/* <div className='quote'>“Not who they expected, exactly who I am”</div> */}
      <CenterTitle>
        <h2>Unbridled Stories, Untamed Voices.</h2>
        <h1>THE NOT</h1>
        <div>
          <Image src="/media/knot-separator.png" alt="Logo" fill />
        </div>
        <h1>PROJECT</h1>
        <p>Explore meaningful stories from New York City, told without constraint or agenda.</p>
      </CenterTitle>
    </HeaderContainer>
  );
}
