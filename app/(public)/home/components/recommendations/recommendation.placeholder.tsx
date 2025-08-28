import { PlaceholderContainer } from "./recommendations.styles";

export default function RecommendationPlaceholder() {
  return (
    <PlaceholderContainer>
      <div className="first-row">
        <p className="skeleton category-skeleton"></p>
        <p className="skeleton category-skeleton"></p>
      </div>
      <div className="skeleton image"></div>
      <div className="content">
        <h3 className="skeleton title"></h3>
        <h3 className="skeleton title"></h3>
        <br />
        <p className=" skeleton summary"></p>
        <p className=" skeleton summary"></p>
        <p className=" skeleton summary half"></p>
      </div>
    </PlaceholderContainer>
  );
}
