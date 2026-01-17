import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

type RouteParams = {
  auth0: string;
};

const authHandler = handleAuth({
  login: handleLogin({
    returnTo: "/",
    authorizationParams: {
      audience: process.env.AUTHO_API_IDENTIFIER,
    },
  }),
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
      audience: process.env.AUTHO_API_IDENTIFIER,
    },
    returnTo: "/",
  }),
});

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) => {
  const awaitedParams = await params;

  return authHandler(request, { params: awaitedParams });
};
