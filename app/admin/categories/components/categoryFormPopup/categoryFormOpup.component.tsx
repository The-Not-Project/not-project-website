'use client';
import { FormEvent, useState } from 'react';
import { Category } from '@/app/types/types';
import Popup from '@/app/admin/shared/components/popup/popup.component'; 
import { FormInput, FormLabel } from '../../../shared/components/form/FormElements'
import { Button, CloseButton } from '../../../shared/components/button/button';
import { SectionTitle } from '@/app/admin/shared/components/layout/Section';
import { ButtonsContainer } from '../../../shared/components/button/button';

interface CategoryFormPopupProps {
  isOpen: boolean;
  isEditing: boolean;
  category: Category | null;
  onCloseAction: () => void;
  onSubmitSuccessAction: () => void;
  createCategoryAction: (data: FormData) => Promise<void>;
  editCategoryAction: (id: string, data: FormData) => Promise<void>;
}

export default function CategoryFormPopup({
  isOpen,
  isEditing,
  category,
  onCloseAction,
  onSubmitSuccessAction,
  createCategoryAction,
  editCategoryAction,
}: CategoryFormPopupProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(event.currentTarget);

    try {
      if (isEditing && category) {
        await editCategoryAction(category.id, formData);
      } else {
        await createCategoryAction(formData);
      }
      onSubmitSuccessAction();
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setSubmitting(false);
      onCloseAction()
    }
  };

  if (!isOpen) return null;

  return (
    <Popup>
      <CloseButton onClick={onCloseAction} />
      <SectionTitle>
        {isEditing ? 'Edit Category' : 'Create Category'}
      </SectionTitle>

      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <FormInput
          name='name'
          required
          defaultValue={category?.name || ''}
        />

        <FormLabel htmlFor='description'>Description</FormLabel>
        <FormInput
          name='description'
          required
          defaultValue={category?.description || ''}
        />

        <ButtonsContainer>
          <Button type='submit' disabled={submitting}>
            {submitting ? 'Saving...' : isEditing ? 'Save' : 'Create'}
          </Button>
          <Button
            type='button'
            className='inverted'
            onClick={onCloseAction}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      </form>
    </Popup>
  );
}