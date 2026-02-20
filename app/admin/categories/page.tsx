import { getCategoriesAction } from "@/lib/internal-api/actions/categories.actions";
import { PageSection, SectionTitle } from "../shared/components/layout/Section";
import CategoriesTable from "./components/categoriesTable/categoriesTable.component";
import CategoryFormPopup from "./components/categoryFormPopup/categoryFormOpup.component";
import { OpenCreateButton } from "./components/categoriesTable/tableButtons";
import {
  createCategoryAction,
  editCategoryAction,
} from "@/lib/internal-api/actions/categories.actions";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) {
  const { categories } = await getCategoriesAction();

  const {create, edit} = await searchParams;

  const editingCategory = categories.find((c) => c.id === edit) || null;
  const isCreateOpen = create === "true";
  const isOpen = isCreateOpen || !!editingCategory;

  return (
    <PageSection>
      <SectionTitle>Categories</SectionTitle>

      <CategoriesTable categories={categories} />
      <OpenCreateButton />
      <CategoryFormPopup
        isOpen={isOpen}
        isEditing={!!editingCategory}
        category={editingCategory}
        createCategoryAction={createCategoryAction}
        editCategoryAction={editCategoryAction}
      />
    </PageSection>
  );
}
