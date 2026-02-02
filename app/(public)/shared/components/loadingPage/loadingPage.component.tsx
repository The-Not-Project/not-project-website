"use client";

import Image from "next/image";
import { LoadingPageContainer } from "./loadingPage.styles";
import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [showLoader, setShowLoader] = useState(true);

  return showLoader ? (
    <LoadingPageContainer
      className="loader"
      onAnimationEnd={() => setShowLoader(false)}
    >
      <Image
        src="/media/its_in_motion.png"
        width={300}
        height={300}
        alt="logo"
        priority
      />
    </LoadingPageContainer>
  ) : null;
}
