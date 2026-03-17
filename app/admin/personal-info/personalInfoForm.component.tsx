"use client";
import { FormLabel, FormInput } from "../shared/components/form/FormElements";
import { Button, ButtonsContainer } from "../shared/components/button/button";
import { useState } from "react";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

type FormProps = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

export default function PersonalInformationForm({ user }: FormProps) {
  const router = useRouter()
  const [disabled, setDisabled] = useState(true);

  async function handleUpdate(formData: FormData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    try {
      const {error} = await authClient.updateUser({
        firstName: firstName as string,
        lastName: lastName as string,
        name: `${firstName} ${lastName}`,
      });

      if (!error) router.refresh()
      setDisabled(true);
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    <form action={handleUpdate}>
      <FormLabel htmlFor="firstName">First Name</FormLabel>
      <FormInput
        type="text"
        id="firstName"
        name="firstName"
        defaultValue={user.firstName}
        disabled={disabled}
        required
      />
      <FormLabel htmlFor="lastName">Last Name</FormLabel>
      <FormInput
        type="text"
        id="lastName"
        name="lastName"
        defaultValue={user.lastName}
        disabled={disabled}
        required
      />
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="text"
        id="email"
        name="email"
        defaultValue={user.email}
        disabled
        required
      />
      {disabled ? (
        <Button type="button" onClick={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <ButtonsContainer>
          <Button
            type="button"
            className="inverted"
            onClick={() => setDisabled(true)}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </ButtonsContainer>
      )}
    </form>
  );
}
