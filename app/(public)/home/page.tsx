import RadarCard from "./components/radarCard/radarCard.component";
import Header from "./components/homepageHeader/homepageHeader.component";
import Boroughs from "./components/boroughsSection/boroughs.component";
import Recommendations from "./components/recommendations/recommendations.component";
import { Suspense } from "react";
import RadarPlaceholder from "./components/radarCard/components/radarPlaceholder.component";
import RecommendationsPlaceholder from "./components/recommendations/recommendation.placeholder";


export default function HomePage() {
  return (
    <main>
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
