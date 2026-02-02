import { getActiveCategories } from "@/app/database/repositories/category.repository";
import StoriesSearch from "../storiesSearch/storiesSearch.component";

export default async function SearchWrapper({ filters }: { filters: any }) {
  const categories = await getActiveCategories();
  return <StoriesSearch initialFilters={filters} availableCategories={categories} />;
}