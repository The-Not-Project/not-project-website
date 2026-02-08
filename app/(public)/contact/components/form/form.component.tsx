"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  CaptchaNotice,
  ContactContainer,
  ContactInfo,
  EnvelopeIcon,
  FormContainer,
} from "./form.styles";
import Link from "next/link";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [type, setType] = useState<"feedback" | "collab">("feedback");
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(formData: FormData) {
    setStatus("sending");

    const token = executeRecaptcha
      ? await executeRecaptcha("contact_form")
      : null;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        token,
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <ContactContainer>
      <ContactInfo>
        <EnvelopeIcon />
        <p>
          For feedback and collaboration requests, <br />
          please email:{" "}
          <Link href="mailto:contact@thenotproject.com">
            contact@thenotproject.com
          </Link>
          <span>or Send a message via this form </span>
        </p>
      </ContactInfo>

        <FormContainer action={handleSubmit}>
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="feedback">Feedback</option>
            <option value="collab">Collaboration</option>
          </select>

          <label htmlFor="email">
            Email{type === "collab" ? "*" : " (optional)"}
          </label>
          <input
            name="email"
            type="email"
            id="email"
            required={type === "collab"}
          />

          <label htmlFor="message">Write a message</label>
          <textarea name="message" id="message" required />

          <CaptchaNotice>
            This site is protected by reCAPTCHA; the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms</a> apply.
          </CaptchaNotice>

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send"}
          </button>

          {status === "sent" && <p>Message sent!</p>}
          {status === "error" && <p>Something went wrong.</p>}
        </FormContainer>
    </ContactContainer>
  );
}
