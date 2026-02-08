import Link from "next/link";
import SubscribeForm from "./components/subscribeForm/form.component";
import BottomBar from "./components/bottomBar/bottomBar.component";

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterWrapper,
  Headline,
  SectionTitle,
} from "./footer.styles";
import { createSubscriber } from "@/lib/prisma/repositories/subscriber.repository";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Headline>
          Join <br /> Us.
        </Headline>
        <hr />
        <FooterContent>
          <FooterSection>
            <SectionTitle>Contact</SectionTitle>
            <Link
              href="mailto:contact@thenotproject.com"
              target="_blank"
              className="bold no-underline"
            >
              contact@thenotproject.com
            </Link>
            <Link className="bold" href="/contact">
              Or visit our contact page
            </Link>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Socials</SectionTitle>
            <Link
              href="https://www.instagram.com/_thenotproject/"
              className="no-underline"
              target="_blank"
            >
              Instagram ↗
            </Link>
            <Link
              href="https://x.com/TheNotProject"
              className="no-underline"
              target="_blank"
            >
              Twitter ↗
            </Link>
            <Link
              href="https://www.youtube.com/@thenotproject"
              className="no-underline"
              target="_blank"
            >
              YouTube ↗
            </Link>
          </FooterSection>
          <FooterSection>
            <SectionTitle>Subscribe</SectionTitle>
            <SubscribeForm submitAction={createSubscriber} />
          </FooterSection>
        </FooterContent>

        <BottomBar />
      </FooterContainer>
    </FooterWrapper>
  );
}
