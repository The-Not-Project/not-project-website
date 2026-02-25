import { Metadata } from "next";
import { aboutPageMetadata } from "@/app/constants/metadata";
import Team from "./components/team/team.component";
import {
  HeaderContainer,
  HeaderImage,
  AboutContainer,
  WhatWeDoContainer,
  WhatWeDoImage,
  WhatWeDoContent,
  WhatWeDoDifferentContainer,
  WhatWeDoDifferentContent,
  WhatWeDoDifferentImage,
  WhoIsItForContainer,
  WhoIsItForContent,
  PageContainer,
} from "./styles";

export const metadata: Metadata = aboutPageMetadata;

export default function Page() {
  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderImage
          src="/media/LorenzoInflushing.jpg"
          alt="About Us"
          fill
          sizes="100vw"
        />
      </HeaderContainer>
      <AboutContainer>
        <h1>ABOUT US</h1>
        <p>
          At The Not Project, we’re not just another media brand; we’re a
          movement. Born from being overlooked and underestimated, we decided to
          create a space that celebrates the voices that make New York what it
          is: real, raw, and unfiltered. We built The Not Project to give voice
          to the streets, the boroughs, the people who make this city real.
        </p>
      </AboutContainer>
      <WhatWeDoContainer>
        <WhatWeDoContent>
          <h1>WHAT WE DO</h1>
          <p>
            From boroughs to block parties, from stoops to subways; we’re here
            to document the city and its people, not just the highlight reel.
            Through photos, videos, interviews, and conversations, we dig deep
            into the stories that define NYC’s true identity. We document the
            pulse of the city; its music, its culture, its art, its struggles,
            and its wins; through the eyes of its people. Every photo and every
            video is a testament to the city’s resilience and creativity. We
            capture what others overlook.
          </p>
          <p>We are a culture.</p>
        </WhatWeDoContent>
        <WhatWeDoImage src="/media/LoAndDavid.png" alt="What We Do" />
      </WhatWeDoContainer>
      <WhatWeDoDifferentContainer>
        <WhatWeDoDifferentImage
          src="/media/TareekFlic.png"
          alt="What We Do Differently"
        />

        <WhatWeDoDifferentContent>
          <h1>WHAT WE DO DIFFERENTLY</h1>
          <p>
            We’re not journalists, influencers, or celebrities. We’re not the
            news; and we’re definitely not chasing headlines. We’re a grassroots
            crew, real and raw, capturing stories as they are. No fancy
            equipment, no filters; just us, flaws and all, giving NYC the voice
            it deserves. We don’t filter the truth to fit expectations. We
            celebrate the gritty, the real, the voices that make NYC what it is:
            diverse, loud, and proud.
          </p>
        </WhatWeDoDifferentContent>
      </WhatWeDoDifferentContainer>

      <WhoIsItForContainer>
        <WhoIsItForContent>
          <h1>WHO IS IT FOR?</h1>
          <p>
            This is for the underdogs, the dreamers, the hustlers, the artists,
            the storytellers, the ones who refuse to be defined by labels. This
            is for every borough, every block, every background. If you’ve ever
            felt overlooked or misunderstood, The Not Project is for you. We’re
            here to remind you that your voice matters.
          </p>
        </WhoIsItForContent>
      </WhoIsItForContainer>
      <Team />
    </PageContainer>
  );
}
