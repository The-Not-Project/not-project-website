import {
  BigTitle,
  RecommendationCardContainer,
  RecommendationsContainer,
  RecommendationsList,
  SecondaryTitle,
} from "./recommendations.styles";

export function RecommendationPlaceholder() {
  return (
    <RecommendationCardContainer>
      <div className="content">
        <h3 className="skeleton title"></h3>
        <br />
        <p className=" skeleton summary"></p>
        <p className=" skeleton summary"></p>
        <p className=" skeleton summary half"></p>
      </div>
            <div className="last-row">
        <p className="skeleton category"></p>
        <p className="skeleton category"></p>
      </div>
    </RecommendationCardContainer>
  );
}

export default function RecommendationsPlaceholder() {
  return (
    <RecommendationsContainer>
      <BigTitle>The collection</BigTitle>
      <SecondaryTitle>Stories we think you&apos;ll like.</SecondaryTitle>

      <RecommendationsList>
        <RecommendationPlaceholder />
        <RecommendationPlaceholder />
        <RecommendationPlaceholder />
        <RecommendationPlaceholder />
      </RecommendationsList>
    </RecommendationsContainer>
  );
}
