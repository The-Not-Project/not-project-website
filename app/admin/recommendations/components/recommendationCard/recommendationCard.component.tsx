'use client'

import { CompactStory } from "@/app/types/types";
import {
  ImageContainer,
  RecommendationContainer,
} from "../recommendationsList/recommendationsList.styles";
import { FaTrash as TrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type RecommendationCardProps = {
  recommendation: CompactStory;
  onRemoveAction: (id: string) => Promise<{ success: boolean; message?: string }>;
};

export default function RecommendationCard({
  recommendation,
  onRemoveAction,
}: RecommendationCardProps) {
  const router = useRouter();

  const handleRemoveRecommendation = async (id: string) => {
    try {
      await onRemoveAction(id);
      router.refresh();
    } catch (err) {
      console.log("Error removing recommendation: ", err);
    }
  };
  return (
    <RecommendationContainer>
      <h3>
        {recommendation.title.slice(0, 15)}
        {recommendation.title.length > 15 && "..."}
      </h3>
      <h4>
        By{" "}
        {`${recommendation.author.firstName} ${recommendation.author.lastName}`}
      </h4>
      <ImageContainer
        src={recommendation.thumbnail}
        alt="Photo"
        width={150}
        height={100}
      />
      <p onClick={() => handleRemoveRecommendation(recommendation.id)}>
        <TrashCan />
      </p>
    </RecommendationContainer>
  );
}
