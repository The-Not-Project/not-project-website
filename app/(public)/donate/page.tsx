import { Metadata } from "next";
import DonatePage from "./donatePage";
import { donatePageMetadata } from "@/app/constants/metadata";

export const metadata : Metadata = donatePageMetadata

export default function Page() {
  return <DonatePage />
}
