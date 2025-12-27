import ProfilePage from "./profilePage";
import { Metadata } from "next";
import { profilePageMetadata } from "@/app/constants/metadata";

export const metadata : Metadata = profilePageMetadata

export default function Page() {
  return <ProfilePage />
}
