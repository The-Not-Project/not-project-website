// @/app/admin/categories/components/categoryFormPopup/categoryFormOpup.component.tsx
'use client';

import { useState } from 'react';
import { Category } from '@/app/types/types';
import Popup from '@/app/admin/shared/components/popup/popup.component'; 
import { FormInput, FormLabel } from '../../../shared/components/form/FormElements'
import { Button, CloseButton } from '../../../shared/components/button/button';
import { SectionTitle } from '@/app/admin/shared/components/layout/Section';
import { ButtonsContainer } from '../../../shared/components/button/button';
import { useRouter } from 'next/navigation';

interface CategoryFormPopupProps {
  isOpen: boolean;
  isEditing: boolean;
  category: Category | null;
  createCategoryAction: (data: FormData) => Promise<{ success: boolean; message: string; }>;
  editCategoryAction: (id: string, data: FormData) => Promise<{ success: boolean; message: string; }>;
}

export default function CategoryFormPopup({
  isOpen,
  isEditing,
  category,
  createCategoryAction,
  editCategoryAction,
}: CategoryFormPopupProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    router.push('/admin/categories'); 
  };

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      if (isEditing && category) {
        await editCategoryAction(category.id, formData);
      } else {
        await createCategoryAction(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Popup>
      <CloseButton onClick={handleClose} />
      <SectionTitle>
        {isEditing ? 'Edit Category' : 'Create Category'}
      </SectionTitle>

      <form action={handleSubmit}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <FormInput name='name' required defaultValue={category?.name || ''} />

        <FormLabel htmlFor='description'>Description</FormLabel>
        <FormInput name='description' required defaultValue={category?.description || ''} />

        <ButtonsContainer>
          <Button type='submit' disabled={submitting}>
            {submitting ? 'Saving...' : isEditing ? 'Save' : 'Create'}
          </Button>
          <Button type='button' className='inverted' onClick={handleClose}>
            Cancel
          </Button>
        </ButtonsContainer>
      </form>
    </Popup>
  );
}