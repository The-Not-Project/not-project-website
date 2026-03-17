import termsData from "@/static/legal/terms-data.json";
import { LegalContainer } from "../styles";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | The Not Project',
};

export default function page() {
  return (
    <LegalContainer>
      <h1>The Not Project Terms of Service</h1>
      {termsData.sections.map((section) => (
        <div key={section.id}>
          <h2>{`${section.id}. ${section.heading}`}</h2>
          <p>{section.content}</p>
        </div>
      ))}
      <p className="date">Last Updated: {termsData.lastUpdated}</p>
    </LegalContainer>
  );
}
