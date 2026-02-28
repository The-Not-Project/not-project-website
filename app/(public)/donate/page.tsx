import { Metadata } from "next";
import DonatePage from "./donatePage";
import { donatePageMetadata } from "@/static/metadata/metadata";

export const metadata : Metadata = donatePageMetadata

export default function Page() {
  return <DonatePage />
}
