"use client";
import {
  validateCooldownAction,
  setCooldownAction,
} from "@/lib/auth/actions/setLinkTimeout";
import {
  ErrorMessage,
  PasswordRecoveryForm,
  SuccessMessage,
  Timer,
} from "../styles";
import { PiEnvelopeLight } from "react-icons/pi";
import { useState, useTransition, useEffect } from "react";
import Loader from "@/app/(public)/shared/components/loader/loader";
import { requestPasswordResetAction } from "@/lib/auth/actions/requestPasswordReset";
import { FormInput } from "../shared/components/form-elements/form-elements";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState("");
  const [isPending, startTransition] = useTransition();
  const [timeLeft, setTimeLeft] = useState(0);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    const expiry = getCookie("reset_cooldown_expiry");
    if (expiry) {
      const remaining = Math.ceil((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) setTimeLeft(remaining);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleFormSubmit = async (formData: FormData) => {
    if (timeLeft > 0) return;

    startTransition(async () => {
      setError(null);
      const email = formData.get("email") as string;

      const { error: cooldownError } = await validateCooldownAction();
      if (cooldownError) return setError(cooldownError);

      const { error: authError } = await requestPasswordResetAction(email);

      if (authError) {
        setError(authError.message || "Failed to send reset email.");
      } else {
        await setCooldownAction();
        setSuccess(true);
        setEmailSentTo(email);
        setTimeLeft(120);
      }
    });
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <>
      <h1>Reset Password</h1>
      <p>Enter your email to receive reset instructions.</p>
      <form action={handleFormSubmit}>
        <PasswordRecoveryForm>
          <PiEnvelopeLight size={20} color="#afafaf" />
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email"
            disabled={timeLeft > 0}
          />
        </PasswordRecoveryForm>

        {success && (
          <SuccessMessage>Email sent to {emailSentTo}</SuccessMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button type="submit" disabled={isPending || timeLeft > 0}>
          {isPending ? <Loader /> : "Request password reset"}
        </button>

        {timeLeft > 0 && <Timer>Try again in {formatTime(timeLeft)}</Timer>}
      </form>
    </>
  );
}
