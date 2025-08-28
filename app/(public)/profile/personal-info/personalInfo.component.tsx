"use client";
import { usePublicServerActions } from "@/app/contexts/public-server-actions";
import { User } from "@/app/types/types";
import { useEffect, useState } from "react";
import { PageSection, PageSectionTitle, SectionDescription } from "../styles";
import {
  ButtonsContainer,
  FormButton,
  FormButtonOutlined,
  FormInput,
  FormLabel,
  InputsContainer,
  StyledForm,
} from "./personalInfo.styles";

export default function Page({userId}: { userId: string }) {
  const { UpdateUser, getUser } = usePublicServerActions();



  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(dbUsed => {
        setCurrentUser(dbUsed);
      })
      .catch(error => {
        console.error("Failed to fetch user:", error);
      })
  }, [userId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      await UpdateUser(data, currentUser);
      setDisabled(true);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      <PageSectionTitle>About you</PageSectionTitle>
      <PageSection>
        <SectionDescription>
          <h2>Personal Info</h2>
          <p>Provide your Personal Info</p>
        </SectionDescription>
        <StyledForm onSubmit={handleSubmit}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="text"
            id="email"
            name="email"
            defaultValue={currentUser?.email}
            disabled
            required
          />
          <InputsContainer>
            <div>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <FormInput
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={currentUser?.firstName}
                disabled={disabled}
                required
              />
            </div>
            <div>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <FormInput
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={currentUser?.lastName}
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
                  className="inverted"
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
