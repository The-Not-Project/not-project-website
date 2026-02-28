import type { Metadata, Viewport } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";
import { createUserAction, getUserAction } from "@/lib/internal-api/actions/user.actions";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import projectMetadata from "@/static/metadata/metadata";
import { Manrope } from "next/font/google";
import { georgia } from "./styles/font";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = projectMetadata;

const manrope = Manrope({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  if (session && session.user) {
    const { user: existingUser } = await getUserAction();

    if (!existingUser) {
      await createUserAction();
    }
  }
  return (
    <html lang="en">
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
