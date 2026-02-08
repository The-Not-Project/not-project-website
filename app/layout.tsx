import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import projectMetadata from "./constants/metadata";
import { Manrope } from "next/font/google";
import { georgia } from "./utils/font";
import "./globals.css";
import { auth0 } from "../lib/auth0/auth0";
import { createUser, getUser } from "@/lib/prisma/repositories/user.repository";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = projectMetadata;

const manrope = Manrope({ weight: "400", subsets: ["latin"] });

const initialStyles = ".loader{display:grid;place-items:center;}";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  if (session && session.user) {
    const existingUser = await getUser();

    if (!existingUser) {
      await createUser();
    }
  }
  return (
    <html lang="en">
      <head>
        <style>{initialStyles}</style>
      </head>
      <body className={`${manrope.className} ${georgia.variable}`}>
        <Auth0Provider>
          {children}
          <Analytics />
          <SpeedInsights />
        </Auth0Provider>
      </body>
    </html>
  );
}
