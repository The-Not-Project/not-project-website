import Image from "next/image";
import InstagramPage from "./instagram/instagram.component";
import { Banner, SocialsContainer } from "./socials.styles";

export default function SocialsSection() {
  return (
    <SocialsContainer>
      <Banner>
        <Image
          src="/media/preview-card.jpeg"
          alt="banner"
          fill
          style={{ objectFit: "cover" }}
        />
        <h2>
          Follow our social pages <br /> for the latest projects <br />
          and updates.
        </h2>
      </Banner>
      <InstagramPage />
    </SocialsContainer>
  );
}
