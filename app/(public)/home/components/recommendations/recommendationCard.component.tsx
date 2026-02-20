import { useMemo } from "react";
import Link from "next/link";
import { CompactStory } from "@/app/types/types";
import {
  ImageContainer,
  RecommendationCardContainer,
} from "./recommendations.styles";
import Image from "next/image";
import { FiArrowUpRight as Arrow } from "react-icons/fi";

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: CompactStory;
}) {
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  const formattedDate = useMemo(
    () => formatDate(recommendation.createdAt),
    [recommendation.createdAt]
  );

  return (
    <RecommendationCardContainer>
      <ImageContainer>
        <Image
          src={recommendation.thumbnail}
          alt="thumbnail"
          fill
          sizes="500px"
          style={{objectFit: 'cover'}}
        />
      </ImageContainer>
      <div className="content">
        <span className="date">{formattedDate}</span>
        <h3 className="title">{recommendation.title}</h3>
        <div className="second-row">
          <span className="category">{recommendation.categories[0].name}</span>
          <Link href={`/story/${recommendation.id}`}>
            Read <Arrow />
          </Link>
        </div>
      </div>
    </RecommendationCardContainer>
  );
}
