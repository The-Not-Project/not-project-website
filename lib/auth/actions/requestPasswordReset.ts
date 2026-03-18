import { authClient } from "..";

  export async function requestPasswordResetAction (email: string) {

      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

    return {error: error ?? null}
  };