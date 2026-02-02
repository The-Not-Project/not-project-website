'use client';

import { Category } from '@/app/types/types';
import { PageSection, SectionTitle } from '../shared/components/layout/Section';
import { Button } from '../shared/components/button/button';
import CategoriesTable from './components/categoriesTable/categoriesTable.component';
import { useState } from 'react';
import CategoryFormPopup from './components/categoryFormPopup/categoryFormOpup.component';
import { createCategory, editCategory, deleteCategory, getCategories } from '@/app/database/repositories/category.repository'

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [formState, setFormState] = useState({
    isOpen: false,
    isEditing: false,
    currentCategory: null as Category | null,
  });

  const refresh = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleOpenCreate = () => {
    setFormState({ isOpen: true, isEditing: false, currentCategory: null });
  };

  const handleOpenEdit = (category: Category) => {
    setFormState({ isOpen: true, isEditing: true, currentCategory: category });
  };

  const handleClosePopup = () => {
    setFormState(prev => ({ ...prev, isOpen: false }));
    console.log('popup closed');
    
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this category?")) {
      await deleteCategory(id);
      await refresh();
    }
  };

  return (
    <PageSection>
      <SectionTitle>Categories</SectionTitle>

      <CategoriesTable
        categories={categories}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <Button className='cornered' onClick={handleOpenCreate}>
        Add
      </Button>

      <CategoryFormPopup
        isOpen={formState.isOpen}
        isEditing={formState.isEditing}
        category={formState.currentCategory}
        onCloseAction={handleClosePopup}
        onSubmitSuccessAction={refresh}
        createCategoryAction={createCategory}
        editCategoryAction={editCategory}
      />
    </PageSection>
  );
}