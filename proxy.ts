import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/reset-password") {
    if (!searchParams.get("token")) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    return NextResponse.next();
  }

  const cookie = request.headers.get("cookie") || "";
  let session = null;

  try {
    const authRes = await fetch(`${process.env.AUTH_API_URL}/get-session`, {
      headers: { cookie },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    session = await authRes.json();
  } catch (error) {
    console.error("Auth Fetch Error:", error);
  }

  const user = session?.user;
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const isAuthPage = ["/signin", "/signup", "/forgot-password"].includes(
    pathname,
  );
  const isProfilePage = pathname === "/profile";
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProfilePage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAdminPage && !isAdmin) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  const response = NextResponse.next();
  if (isAuthenticated) {
    response.headers.set("x-user-id", user.id);
  }

  return response;
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/profile",
    "/admin/:path*",
  ],
};
