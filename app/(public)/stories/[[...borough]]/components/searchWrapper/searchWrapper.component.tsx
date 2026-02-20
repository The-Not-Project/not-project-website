import { getActiveCategoriesAction } from "@/lib/internal-api/actions/categories.actions";
import StoriesSearch from "../storiesSearch/storiesSearch.component";
import { Filters } from "@/app/types/types";

export default async function SearchWrapper({ filters }: { filters: Filters }) {
  const { categories } = await getActiveCategoriesAction();
  return (
    <StoriesSearch initialFilters={filters} availableCategories={categories} />
  );
}
