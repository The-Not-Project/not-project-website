"use client";

import { useState } from "react";
import {
  ButtonsContainer,
  FormButton,
  FormButtonOutlined,
  FormInput,
  FormLabel,
  InputsContainer,
  StyledForm,
} from "./personalInfo.styles";
import { PageSection, PageSectionTitle, SectionDescription } from "../styles";

type FormProps = {
  userInfo: {
    email: string,
    firstName: string,
    lastName: string
  };
  updateAction: (formData: FormData) => Promise<void>;
}

export default function PersonalInfoForm({ userInfo, updateAction }: FormProps) {
  const [disabled, setDisabled] = useState(true);

  async function handleAction(formData: FormData) {
    try {
      await updateAction(formData);
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
        <StyledForm action={handleAction}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="text"
            id="email"
            name="email"
            defaultValue={userInfo.email}
            disabled 
          />

          <InputsContainer>
            <div>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                defaultValue={userInfo.firstName}
                disabled={disabled}
                required
              />
            </div>
            <div>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <FormInput
                type="text"
                name="lastName"
                defaultValue={userInfo.lastName}
                disabled={disabled}
                required
              />
            </div>
          </InputsContainer>

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
