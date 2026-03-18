import { authClient } from "..";

export const resetPasswordAction = async (newPassword: string, token: string) => {
  const { error } = await authClient.resetPassword({
    newPassword,
    token,
  });

  return { error: error ?? null };
};
