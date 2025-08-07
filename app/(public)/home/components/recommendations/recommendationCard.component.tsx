import { useMemo } from "react";
import Link from "next/link";
import { Story } from "@/app/types/types";
import { RecommendationCardContainer } from "./recommendations.styles";

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: Story;
}) {
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedDate = useMemo(
    () => formatDate(recommendation.createdAt),
    [recommendation.createdAt]
  );

  return (
    <RecommendationCardContainer>
      <div className="first-row">
        <span className="date">{formattedDate}</span>
        <span className="category">{recommendation.categories[0].name}</span>
      </div>
      <img src={recommendation.thumbnail} alt="thumbnail" />
      <div className="content">
        <h3 className="title">{recommendation.title}</h3>
        <p className="summary">
          {recommendation.summary.slice(0, 150)}{" "}
          {recommendation.summary.length > 150 && "..."}
        </p>
      </div>
      <Link href={`/story/${recommendation.id}`}>Read more</Link>
    </RecommendationCardContainer>
  );
}
