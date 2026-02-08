import Link from "next/link";
import {
  InstagramContainer,
  InstagramContent,
  InstagramInfo,
} from "./instagram.styles";
import { FaInstagram } from "react-icons/fa";
import { InstagramPosts } from "@/app/constants/instagramPosts";

export default function InstagramPage() {
  return (
    <InstagramContainer>
      <InstagramInfo>
        <span>@_thenotproject</span>
        <Link href="https://www.instagram.com/_thenotproject/" target="_blank">
          {" "}
          <FaInstagram /> Follow
        </Link>
      </InstagramInfo>
      <InstagramContent>
        <InstagramPosts />
      </InstagramContent>
    </InstagramContainer>
  );
}
