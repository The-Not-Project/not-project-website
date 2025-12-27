"use client";

import Link from "next/link";
import { useStore } from "@/app/zustand/store";
import SubscribeForm from "./components/subscribeForm/form.component";
import BottomBar from "./components/bottomBar/bottomBar.component";

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  Headline,
  SectionTitle,
} from "./footer.styles";
import clsx from "clsx";

export default function Footer() {
  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);

  return (
    <FooterContainer className={clsx("page-wrapper", { shifted: isMenuOpen })}>
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
          <SubscribeForm />
        </FooterSection>
      </FooterContent>

      <BottomBar />
    </FooterContainer>
  );
}
