import About from "./aboutPage";
import { Metadata } from "next";
import { aboutPageMetadata } from "@/app/constants/metadata";

export const metadata: Metadata = aboutPageMetadata;

export default function Page() {
  return <About />;
}
