"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ErrorMessage } from "../styles";
import Loader from "@/app/(public)/shared/components/loader/loader";
import { signInAction } from "@/lib/auth/actions/signIn";
import LegalNotice from "../shared/components/legal-notice/legal-notice.component";
import SocialSignIn from "../shared/components/social-signin/social-signin.component";
import AuthRedirect from "../shared/components/auth-redirect/auth-redirect.component";
import { FormInput } from "../shared/components/form-elements/form-elements";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSignIn(formData: FormData) {
    startTransition(async () => {
      setError(null);

      const { error: authError } = await signInAction(formData);

      if (authError) {
        setError(authError.message || "An unexpected error occured.");
      } else {
        window.location.href = "/";
      }
    });
  }

  return (
    <>
      <h1>Sign in to your account</h1>
      <form action={handleSignIn}>
        <label htmlFor="email">Email address</label>
        <FormInput name="email" type="email" placeholder="hello@johndoe.com" />

        <label htmlFor="password">
          Password <Link href="/forgot-password"> Forgot your password?</Link>
        </label>
        <FormInput name="password" type="password" placeholder="●●●●●●●" />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button type="submit" disabled={isPending}>
          {isPending ? <Loader /> : "Sign In"}
        </button>
      </form>

      <AuthRedirect href="/signup" />
      <SocialSignIn />
      <LegalNotice />
    </>
  );
}
