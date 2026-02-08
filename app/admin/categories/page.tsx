import { getCategories } from "@/lib/prisma/repositories/category.repository";
import CategoriesClient from "./categoriesClient.component";

export default async function CategoriesPage() {
  const initialCategories = await getCategories();

  return <CategoriesClient initialCategories={initialCategories} />;
}