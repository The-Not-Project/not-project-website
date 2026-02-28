import Link from "next/link";
import Image from "next/image";
import instagramData from "@/static/instagram/instagram-data.json";
import {
  InstagramContainer,
  InstagramContent,
  InstagramInfo,
} from "./instagram.styles";
import { FaInstagram } from "react-icons/fa";

export default function InstagramPage() {
  return (
    <InstagramContainer>
      <InstagramInfo>
        <span>@_thenotproject</span>
        <Link href="https://www.instagram.com/_thenotproject/" target="_blank">
          <FaInstagram /> Follow
        </Link>
      </InstagramInfo>
      <InstagramContent>
        {instagramData.map((post, index) => {
          const href = Object.keys(post)[0];
          const src = Object.values(post)[0];

          return (
            <div key={index}>
              <Link href={href} target="_blank">
                <Image src={src} alt="" fill sizes="33vw" />
              </Link>
            </div>
          );
        })}
      </InstagramContent>
    </InstagramContainer>
  );
}
