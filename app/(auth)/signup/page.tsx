"use client";

import { useState, useTransition } from "react";
import { ErrorMessage } from "../styles";
import Loader from "@/app/(public)/shared/components/loader/loader";
import { signUpAction } from "@/lib/auth/actions/signUp";
import LegalNotice from "../shared/components/legal-notice/legal-notice.component";
import SocialSignIn from "../shared/components/social-signin/social-signin.component";
import AuthRedirect from "../shared/components/auth-redirect/auth-redirect.component";
import { FormInput } from "../shared/components/form-elements/form-elements";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignUp = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      const { error: authError } = await signUpAction(formData);

      if (authError) {
        setError(authError.message || "An unexpected error occured.");
      } else {
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      <h1>Sign up for an account</h1>
      <form action={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <FormInput name="firstName" placeholder="John" />

        <label htmlFor="lastName">Last Name</label>
        <FormInput name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email address</label>
        <FormInput name="email" type="email" placeholder="hello@johndoe.com" />

        <label htmlFor="password">Password</label>
        <FormInput name="password" type="password" placeholder="●●●●●●●" />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button type="submit" disabled={isPending}>
          {isPending ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <AuthRedirect href="/signin" />
      <SocialSignIn />
      <LegalNotice />
    </>
  );
}
