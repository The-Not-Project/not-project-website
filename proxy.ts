import { NextRequest } from "next/server";
import { auth0 } from "./app/lib/auth0";

export async function proxy(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  // Keeps Auth0 away from your PWA service worker and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js|workbox-).*)"],
};