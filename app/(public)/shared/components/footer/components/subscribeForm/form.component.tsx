import Swal from "sweetalert2";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import { SignUpForm, SignUpSection } from "./form.styles";

export default function Form() {
  const { createSubscriber } = usePublicServerActions();

  type SignUpFormFields = {
    email: { value: string };
    phone: { value: string };
  };

  async function handleSignUp(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement & SignUpFormFields;
    const email: string = form.email.value;
    const phone: string = form.phone.value;

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

    const response = await createSubscriber(email, phone ?? null);

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

    form.reset();
  }

  return (
    <SignUpSection>
      <SignUpForm onSubmit={(e) => handleSignUp(e)}>
        <p>Be the first to know about our new stories.</p>
     
          <input type="email" name="email" placeholder="example@domain.com" required />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number (optional)"
          />
          <button type="submit">Sign Up</button>
      
      </SignUpForm>
      
    </SignUpSection>
  );
}
