"use client";

import {
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
      <div className="center-title">Unbridled Stories, Untamed Voices.</div>
    </HeaderContainer>
  );
}