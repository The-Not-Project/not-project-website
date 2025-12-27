import type { Metadata, Viewport } from "next";
import { Manrope as Font } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import AuthSyncer from "./(public)/shared/components/auth/AuthSyncer";
import projectMetadata from './constants/metadata'
import "./tiptap/styles/_keyframe-animations.scss";
import "./tiptap/styles/_variables.scss";
import "./globals.scss";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = projectMetadata

const manrope = Font({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head></head>
      <body className={manrope.className}>
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
