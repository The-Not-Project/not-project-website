import { Metadata } from "next";
import { contactPageMetadata } from "@/app/constants/metadata";
import ContactForm from "./components/form/form.component";
import { ContactContainer, HeaderContainer, PageContainer } from "./styles";
import CaptchaWrapper from "./components/form/captcha-wrapper";
import Image from "next/image";

export const metadata: Metadata = contactPageMetadata;

export default function ContactPage() {
  return (
    <PageContainer>
      <HeaderContainer>
        <Image
          src="/media/tariqWIceCream.JPG"
          alt="About Us"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
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
