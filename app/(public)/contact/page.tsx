import { Metadata } from "next";
import ContactPage from "./contactPage";
import { contactPageMetadata } from "@/app/constants/metadata";

export const metadata : Metadata = contactPageMetadata

export default function Page() {
  return <ContactPage />
}
