import { Metadata } from "next";
import { aboutPageMetadata } from "@/static/metadata/metadata";
import aboutData from "@/static/about/about.json";
import Team from "./components/team/team.component";
import {
  HeaderContainer,
  AboutSection,
  CenteredSection,
  CenteredSectionContent,
  AboutUsContainer,
  ContentContainer,
  ImageContainer,
} from "./styles";
import Image from "next/image";

export const metadata: Metadata = aboutPageMetadata;

export default function Page() {
  return (
    <main>
      <HeaderContainer>
        <Image
          style={{ objectFit: "cover" }}
          src="/media/LorenzoInflushing.jpg"
          alt="About Us"
          fill
          sizes="100vw"
        />
      </HeaderContainer>
      <AboutUsContainer>
        <AboutSection className="intro">
          <div>
            <h2>{aboutData.about.header}</h2>
            <p>{aboutData.about.content}</p>
          </div>
        </AboutSection>
        <AboutSection>
          <ContentContainer>
            <h2>{aboutData.whatWeDo.header}</h2>
            <p>{aboutData.whatWeDo.content}</p>
          </ContentContainer>
          <ImageContainer>
            <Image
              src={`/media/${aboutData.whatWeDo.img}`}
              alt="What We Do"
              fill
              sizes="100vw"
            />
          </ImageContainer>
        </AboutSection>
        <AboutSection>
          <ImageContainer>
            <Image
              src={`/media/${aboutData.whatsDifferent.img}`}
              alt="What We Do Differently"
              fill
              sizes="100vw"
            />
          </ImageContainer>
          <ContentContainer>
            <h2>{aboutData.whatsDifferent.header}</h2>
            <p>{aboutData.whatsDifferent.content}</p>
          </ContentContainer>
        </AboutSection>
      </AboutUsContainer>
      <CenteredSection>
        <CenteredSectionContent>
          <h2>{aboutData.forWho.header}</h2>
          <p>{aboutData.forWho.content}</p>
        </CenteredSectionContent>
      </CenteredSection>

      <Team />
    </main>
  );
}
