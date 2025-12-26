"use client";

import clsx from "clsx";
import { useEffect } from "react";
import ContactForm from "./components/form/form.component";
import { ContactContainer, HeaderContainer, HeaderImage, PageContainer } from "./styles";
import { useStore } from "@/app/zustand/store";
import CaptchaWrapper from "./components/form/captcha-wrapper";

export default function ContactPage() {
  const setIsMobile = useStore((state) => state.mobileLayout.setIsMobile);
  const isMenuOpen = useStore((state) => state.mobileLayout.isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderImage
          src="/media/tariqWIceCream.JPG"
          alt="About Us"
          width={1920}
          height={1080}
        />
      </HeaderContainer>
      <ContactContainer
        className={clsx("page-wrapper", { shifted: isMenuOpen })}
      >
        <CaptchaWrapper>
          <ContactForm />
        </CaptchaWrapper>
      </ContactContainer>
    </PageContainer>
  );
}
