"use client";

import { useState } from "react";
import { CaptchaNotice, FormContainer } from "./form.styles";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactForm() {
  const [type, setType] = useState<"feedback" | "collab">("feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const token = executeRecaptcha
      ? await executeRecaptcha("contact_form")
      : null;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        email: anonymous ? "" : email,
        type: type === "collab" ? "collab" : "feedback",
        token,
      }),
    });

    setStatus(res.ok ? "sent" : "error");
  }

  function handleChangeAnonymous(e: React.ChangeEvent<HTMLInputElement>) {
    setAnonymous(e.target.checked);
    if (e.target.checked) {
      setEmail("");
    }
  }

  function handleChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as "feedback" | "collab");
    if (e.target.value === "collab") {
      setAnonymous(false);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>We’d love to hear from you.</h2>
      <label htmlFor="subject">Subject</label>
      <select id="subject" value={type} onChange={(e) => handleChangeType(e)}>
        <option value="feedback">Feedback</option>
        <option value="collab">Collaboration</option>
      </select>
      <label htmlFor="email">
        {type == "feedback"
          ? "Your email (optional)"
          : "Best email to reach you (required)"}
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={anonymous ? true : false}
      />
      <label>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => handleChangeAnonymous(e)}
          disabled={type === "collab" ? true : false}
        />
        {"I'd rather stay anonymous"}
      </label>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          type === "feedback"
            ? "Tell us anything: feedback, thoughts, or just a hello."
            : "Tell us about your idea, project, or how you'd like to work together."
        }
      ></textarea>
      <CaptchaNotice>
      This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </CaptchaNotice>
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "sent" && <p>Message sent!</p>}
      {status === "error" && <p>Something went wrong.</p>}
    </FormContainer>
  );
}
