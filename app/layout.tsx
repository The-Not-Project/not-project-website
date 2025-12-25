import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Manrope as Font } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import seoKeywords from "./constants/seoKeywords";
import './globals.scss';
import "./tiptap/styles/_keyframe-animations.scss";
import "./tiptap/styles/_variables.scss";
import AuthSyncer from "./(public)/shared/components/auth/AuthSyncer";

export const metadata: Metadata = {
  title: "The Not Project",
  description:
    "Unbridled Stories, Untamed Voices. Human-centered stories from NYC: blogs, interviews, films, and more.",
  authors: [{ name: "Tariq El Ghayate" }],
  creator: "The Not Project",
  metadataBase: new URL("https://www.thenotproject.com"),
  openGraph: {
    title: "The Not Project",
    description:
      "Explore meaningful stories from New York City, told without constraint or commercial pressure.",
    url: "https://www.thenotproject.com",
    siteName: "The Not Project",
    images: [
      {
        url: "/media/LoAndDavid.png",
        width: 1200,
        height: 630,
        alt: "The Not Project Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Not Project",
    description: "NYC stories with soul. Told raw and unfiltered.",
    images: ["/media/LoAndDavid.png"],
  },
  keywords: seoKeywords.home,
};

const oswald = Font({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: dark)"/>
        <link rel="preload" as="video" href="video.webm" type="video/webm"></link>
      </head>
      <body className={oswald.className}>
        <UserProvider>
          <AuthSyncer />
          {children}
          <Analytics />
        </UserProvider>
      </body>
    </html>
  );
}
