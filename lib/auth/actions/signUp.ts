import { authClient } from "..";

export const signUpAction = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await authClient.signUp.email({
    email,
    password,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    role: "user",
    callbackURL: "/",
  });

  return { error: error ?? null };
};
