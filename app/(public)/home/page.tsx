"use client";

import { useEffect, useState } from "react";
import RadarCard from "./components/radarCard/radarCard.component";
import Header from "./components/homepageHeader/homepageHeader.component";
import Boroughs from "./components/boroughsSection/boroughs.component";
import Recommendations from "./components/recommendations/recommendations.component";
import LoadingPage from "../shared/components/loadingPage/loadingPage.component";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  return (
    <main>
      {showLoader && <LoadingPage />}
      <Header />
      <RadarCard />
      <Boroughs />
      <Recommendations />
    </main>
  );
}
