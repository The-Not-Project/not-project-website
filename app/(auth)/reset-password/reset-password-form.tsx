"use client";

import { authClient } from "@/lib/auth";
import { useState, useTransition } from "react";
import { ErrorMessage } from "../styles";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/(public)/shared/components/loader/loader";

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");

  const handleResetPassword = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const newPassword = formData.get("password") as string;
      const confirmedPassword = formData.get("confirm-password");

      if (newPassword !== confirmedPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!token) {
        setError("Invalid or missing token.");
        return;
      }

      const { error: authError } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (authError) {
        setError(authError.message || "An unexpected error occurred.");
      } else {
        router.push("/signin");
      }
    });
  };

  return (
    <form action={handleResetPassword}>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="●●●●●●●"
        required
      />
      
      <label htmlFor="confirm-password">Confirm password</label>
      <input
        id="confirm-password"
        type="password"
        name="confirm-password"
        placeholder="●●●●●●●"
        required
      />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <button type="submit" disabled={isPending}>
        {isPending ? <Loader /> : "Reset password"}
      </button>
    </form>
  );
}