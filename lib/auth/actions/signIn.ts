import { authClient } from "..";

export async function signInAction(formData: FormData) {

      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

    return {error: error ?? null}
  }