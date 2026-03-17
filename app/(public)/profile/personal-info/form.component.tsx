"use client";

import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ButtonsContainer,
  Disabled,
  FallbackNotice,
  FormButton,
  FormButtonOutlined,
  FormInput,
  FormLabel,
  StyledForm,
  SuccessMessage,
  VerifiedStatus,
} from "./personal-info.styles";
import { PageSection, PageSectionTitle, SectionDescription } from "../styles";
import {
  IoMdInformationCircleOutline as Info,
  IoMdCheckmark as Checkmark,
} from "react-icons/io";
import {
  setCooldownAction,
  validateCooldownAction,
} from "@/lib/auth/actions/setLinkTimeout";

type FormProps = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    name: string;
    emailVerified: boolean;
  };
};

export default function PersonalInfoForm({ user }: FormProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const splitFirstName = user.name?.split(" ")[0] || "";
  const splitLastName = user.name?.split(" ").slice(1).join(" ") || "";
  const isUsingSplitFallback = !user.firstName || !user.lastName;

  async function handleEmailVerification() {
    const { error: cooldownError } = await validateCooldownAction();
    if (cooldownError) {
      alert(cooldownError);
      return;
    }
    const { error } = await authClient.sendVerificationEmail({
      email: user.email,
      callbackURL: "http://localhost:3000/",
    });

    if (error) {
      console.log(error);
    } else {
      await setCooldownAction();
      setShowSuccess(true);
    }
  }

  async function handleUpdate(formData: FormData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    try {
      const { error } = await authClient.updateUser({
        firstName: firstName as string,
        lastName: lastName as string,
        name: `${firstName} ${lastName}`,
      });

      if (!error) {
        router.refresh();
      }
      setDisabled(true);
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  return (
    <div>
      <PageSectionTitle>About you</PageSectionTitle>
      <PageSection>
        <SectionDescription>
          <h2>Personal Info</h2>
          <p>Provide your Personal Info</p>
        </SectionDescription>
        <StyledForm action={handleUpdate}>
          <FormLabel htmlFor="email" className="email">
            Email
            <FormInput
              type="text"
              name="email"
              defaultValue={user.email}
              disabled
            />
            <VerifiedStatus>
              {!!user.emailVerified ? (
                <span>
                  <Checkmark />
                  verified
                </span>
              ) : (
                <button type="button" onClick={() => handleEmailVerification()}>
                  verify
                </button>
              )}
            </VerifiedStatus>
          </FormLabel>
          {showSuccess && (
            <SuccessMessage>
              Check your email for verification link.
            </SuccessMessage>
          )}

          <FormLabel htmlFor="firstName">
            First name
            <FormInput
              type="text"
              name="firstName"
              defaultValue={user.firstName || splitFirstName}
              disabled={disabled}
              required
            />
            {disabled && <Disabled />}
          </FormLabel>
          <FormLabel htmlFor="lastName">
            Last name
            <FormInput
              type="text"
              name="lastName"
              defaultValue={user.lastName || splitLastName}
              disabled={disabled}
              required
            />
            {disabled && <Disabled />}
          </FormLabel>
          {user.name !== null && isUsingSplitFallback && (
            <FallbackNotice>
              <Info size={18} color="#3b82f6" />
              <span>
                We've suggested these based on your Google account name.
              </span>
            </FallbackNotice>
          )}
          <ButtonsContainer>
            {disabled ? (
              <FormButton type="button" onClick={() => setDisabled(false)}>
                Edit
              </FormButton>
            ) : (
              <>
                <FormButtonOutlined
                  type="button"
                  onClick={() => setDisabled(true)}
                >
                  Cancel
                </FormButtonOutlined>
                <FormButton type="submit">Save</FormButton>
              </>
            )}
          </ButtonsContainer>
        </StyledForm>
      </PageSection>
    </div>
  );
}
