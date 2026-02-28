import privacyData from "@/static/legal/privacy-data.json";
import { PrivacyContainer } from "./styles";

export default function page() {
  return (
    <PrivacyContainer>
      <h1>The Not Project Privacy Policy</h1>
      {privacyData.sections.map((section) => (
        <div key={section.id}>
          <h2>{`${section.id}. ${section.heading}`}</h2>
          <p>{section.content}</p>
        </div>
      ))}
      <p className="date">Last Updated: {privacyData.lastUpdated}</p>
    </PrivacyContainer>
  );
}
