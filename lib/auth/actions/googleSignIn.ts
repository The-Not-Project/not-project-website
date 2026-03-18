import { authClient } from "..";

export const googleSignInAction = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  });
};
