"use client";

import Swal from "sweetalert2";
import { SignUpForm, SignUpSection } from "./form.styles";

type FormProps = {
  submitAction: (email: string, phone?: string) => Promise<string>;
};

export default function Form({ submitAction }: FormProps) {
  async function handleSignUp(formData: FormData): Promise<void> {
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address.",
        confirmButtonText: "close",
        customClass: {
          confirmButton: "popup-button",
        },
        buttonsStyling: false,
      });
      return;
    }

    const response = await submitAction(email, phone ?? null);

    if (response === "Email already subscribed") {
      Swal.fire({
        icon: "info",
        title: "Already Subscribed",
        text: "This email is already subscribed to our updates.",
        confirmButtonText: "close",

        customClass: {
          confirmButton: "popup-button",
        },
        buttonsStyling: false,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Thanks for subscribing!",
      text: "You have successfully signed up for updates.",
      confirmButtonText: "close",
      customClass: {
        confirmButton: "popup-button",
      },
      buttonsStyling: false,
    });
  }

  return (
    <SignUpSection>
      <SignUpForm action={handleSignUp}>
        <p>Be the first to know about our new stories.</p>

        <input
          type="email"
          name="email"
          placeholder="example@domain.com"
          required
        />
        <input type="tel" name="phone" placeholder="Phone number (optional)" />
        <button type="submit">Sign Up</button>
      </SignUpForm>
    </SignUpSection>
  );
}
