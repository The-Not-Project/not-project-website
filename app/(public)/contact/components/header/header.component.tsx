import Image from "next/image";
import { HeaderContainer, HeaderText } from "./header.styles";

export default function ContactHeader() {
    return (
        <HeaderContainer>
        <Image
          src="/media/thePeople.png"
          alt="About Us"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <HeaderText>
          We’d love to hear from you.
        </HeaderText>
      </HeaderContainer>
    )
}