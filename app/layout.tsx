import { UserProvider } from "@auth0/nextjs-auth0/client";
import AuthSyncer from "./(public)/shared/components/auth/AuthSyncer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import projectMetadata from "./constants/metadata";
import { Manrope } from "next/font/google";
import { georgia } from "./utils/font";
import { styles } from "./utils/styles";
import "./globals.css";
import { preload } from "react-dom";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = projectMetadata;

const manrope = Manrope({ weight: "400", subsets: ["latin"] });
const BOROUGHS = ["manhattan", "brooklyn", "queens", "bronx", "statenisland"];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  BOROUGHS.forEach((borough) => {
    preload(
      `/_next/image?url=%2Fmedia%2FboroughBackdrops%2F${borough}.webp&w=3840&q=75`,
      {
        as: "image",
        fetchPriority: "high",
      },
    );
  });
  return (
    <html lang="en">
      <head>
        <style>{styles}</style>
      </head>
      <body className={`${manrope.className} ${georgia.variable}`}>
        <UserProvider>
          <AuthSyncer />
          {children}
          <Analytics />
          <SpeedInsights />
        </UserProvider>
      </body>
    </html>
  );
}
