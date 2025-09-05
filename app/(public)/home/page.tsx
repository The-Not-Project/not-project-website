"use client";

import { useEffect, useState } from "react";
import { useStore } from "../../zustand/store";
import clsx from "clsx";
import RadarCard from "./components/radarCard/radarCard.component";
import Header from "./components/homepageHeader/homepageHeader.component";
import Boroughs from "./components/boroughsSection/boroughs.component";
import Recommendations from "./components/recommendations/recommendations.component";
import LoadingPage from "../shared/components/loadingPage/loadingPage.component";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);
  const setIsMobile = useStore((state) => state.mobileLayout.setIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);

    handleResize();
    window.addEventListener("resize", handleResize);

    window.scrollTo(0, 0);
    setTimeout(() => {
      setShowContent(true);
    }, 500);

    setTimeout(() => {
      setShowLoader(false);
    }, 1000);


    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx("page-wrapper max-height", { shifted: isMenuOpen })}>
      {showLoader  && <LoadingPage />}
      {showContent && (
        <>
          <Header />
          <RadarCard />
          <Boroughs />
          <Recommendations />
        </>
      )}
    </div>
  );
}
