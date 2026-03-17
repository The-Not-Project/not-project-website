"use client";

import { authClient } from "@/lib/auth";
import { ErrorMessage, Notice, SocialsHeader } from "../styles";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const handleSignUp = async (formData: FormData) => {
    setError(null);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      role: "user",
      callbackURL: "/",
    });

    if (authError) {
      setError(authError.message || "An unexpected error occured.");
    } else {
      window.location.href = "/";
    }
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://www.thenotproject.com",
    });
  };

  return (
    <>
      <h1>Sign up for an account</h1>
      <form action={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" placeholder="John" required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" placeholder="Doe" required />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="hello@johndoe.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="●●●●●●●"
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button type="submit">Sign Up</button>
      </form>
      <p className="redirect">
        Already have an account? <Link href="/signin">Sign in</Link>
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
        By clicking on sign up, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </Notice>
    </>
  );
}
