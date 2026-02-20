'use client';
import { PageSection, SectionTitle } from '../shared/components/layout/Section';
import { FormLabel, FormInput } from '../shared/components/form/FormElements';
import { Button, ButtonsContainer } from '../shared/components/button/button';
import { useState } from 'react';

type FormProps = {
  userInfo: {
    email: string,
    firstName: string,
    lastName: string
  };
  updateAction: (formData: FormData) => Promise<{ success: boolean; message: string; }>;
}

export default function PersonalInformationForm({userInfo, updateAction}: FormProps) {

  const [disabled, setDisabled] = useState(true);



  const handleAction = async (formData: FormData) => {
    try {
      await updateAction(formData);
      setDisabled(true);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <PageSection>
      <SectionTitle>Basic Information</SectionTitle>
      <form action={handleAction}>
        <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <FormInput
          type='text'
          id='firstName'
          name='firstName'
          defaultValue={userInfo.firstName}
          disabled={disabled}
          required
        />
        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <FormInput
          type='text'
          id='lastName'
          name='lastName'
          defaultValue={userInfo.lastName}
          disabled={disabled}
          required
        />
        <FormLabel htmlFor='email'>Email</FormLabel>
        <FormInput
          type='text'
          id='email'
          name='email'
          defaultValue={userInfo.email}
          disabled
          required
        />
        {disabled ? (
          <Button type='button' onClick={() => setDisabled(false)}>
            Edit
          </Button>
        ) : (
          <ButtonsContainer>
            <Button
              type='button'
              className='inverted'
              onClick={() => setDisabled(true)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </ButtonsContainer>
        )}
      </form>
    </PageSection>
  );
}
