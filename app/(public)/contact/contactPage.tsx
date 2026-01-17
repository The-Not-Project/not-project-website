"use client";

import ContactForm from "./components/form/form.component";
import { ContactContainer, HeaderContainer, HeaderImage, PageContainer } from "./styles";
import CaptchaWrapper from "./components/form/captcha-wrapper";

export default function ContactPage() {

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
      <ContactContainer>
        <CaptchaWrapper>
          <ContactForm />
        </CaptchaWrapper>
      </ContactContainer>
    </PageContainer>
  );
}
