import RadarCard from "./components/radarCard/radarCard.component";
import Header from "./components/homepageHeader/homepageHeader.component";
import Boroughs from "./components/boroughsSection/boroughs.component";
import Recommendations from "./components/recommendations/recommendations.component";
// import LoadingPage from "../shared/components/loadingPage/loadingPage.component";
// import { preload } from "react-dom";
import { Suspense } from "react";
import RadarPlaceholder from "./components/radarCard/components/radarPlaceholder.component";
import RecommendationsPlaceholder from "./components/recommendations/recommendation.placeholder";

// const BOROUGHS = ["manhattan", "brooklyn", "queens", "bronx", "statenisland"];

// BOROUGHS.forEach((borough) => {
//   preload(
//     `/_next/image?url=%2Fmedia%2FboroughBackdrops%2F${borough}.webp&w=3840&q=75`,
//     {
//       as: "image",
//       fetchPriority: "high",
//     },
//   );
// });

export default function HomePage() {
  return (
    <main>
      {/* <LoadingPage /> */}
      <Header />
      <Suspense fallback={<RadarPlaceholder />}>
        <RadarCard />
      </Suspense>
      <Boroughs />
      <Suspense fallback={<RecommendationsPlaceholder />}>
        <Recommendations />
      </Suspense>
    </main>
  );
}
