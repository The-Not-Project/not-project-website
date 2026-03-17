"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth";
import { ErrorMessage, Notice, SocialsHeader } from "../styles";
import { FaGoogle } from "react-icons/fa6";
import Loader from "@/app/(public)/shared/components/loader/loader";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleLogin(formData: FormData) {
    startTransition(async () => {
      setError(null);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const { error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "An unexpected error occured.");
      } else {
        window.location.href = "/";
      }
    });
  }

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    });
  };

  return (
    <>
      <h1>Sign in to your account</h1>
      <form action={handleLogin}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="hello@johndoe.com"
          required
        />

        <label htmlFor="password">
          Password <Link href="/forgot-password"> Forgot your password?</Link>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●"
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button type="submit" disabled={isPending}>
          {isPending ? <Loader /> : "Sign In"}
        </button>
      </form>

      <p className="redirect">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>

      <SocialsHeader>
        <hr />
        <p>Or continue with</p>
      </SocialsHeader>

      <button type="button" onClick={loginWithGoogle}>
        <FaGoogle />
        Google
      </button>

      <Notice>
        By clicking on sign in, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </Notice>
    </>
  );
}
