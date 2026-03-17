import privacyData from "@/static/legal/privacy-data.json";
import { LegalContainer } from "../styles";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Not Project',
};

export default function page() {
  return (
    <LegalContainer>
      <h1>The Not Project Privacy Policy</h1>
      {privacyData.sections.map((section) => (
        <div key={section.id}>
          <h2>{`${section.id}. ${section.heading}`}</h2>
          <p>{section.content}</p>
        </div>
      ))}
      <p className="date">Last Updated: {privacyData.lastUpdated}</p>
    </LegalContainer>
  );
}
