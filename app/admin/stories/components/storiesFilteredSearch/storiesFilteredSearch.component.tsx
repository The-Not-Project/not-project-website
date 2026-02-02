"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Category, Filters } from "@/app/types/types";
import {
  StoriesSearchContainer,
  SearchInput,
  SearchTitle,
  SecondaryTitle,
  FilterOptionsContainer,
  FilterOption,
  ApplyFiltersButton,
} from "./storiesFilteredSearch.styles";

const boroughs = ["brooklyn", "manhattan", "queens", "staten island", "bronx"];

export default function StoriesSearch({
  categories,
  initialFilters,
}: {
  categories: Category[];
  initialFilters: Filters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localFilters, setLocalFilters] = useState<Filters>(initialFilters);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (localFilters.search) params.set("search", localFilters.search);
    else params.delete("search");

    params.delete("boroughs");
    localFilters.boroughs.forEach((b) => params.append("boroughs", b));

    params.delete("categories");
    localFilters.categories.forEach((c) => params.append("categories", c));

    router.push(`${pathname}?${params.toString()}`);
  };

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalFilters({ ...localFilters, search: e.target.value });
  }

  function handleBoroughClick(borough: string) {
    const newBoroughs = localFilters.boroughs.includes(borough)
      ? localFilters.boroughs.filter((b) => b !== borough)
      : [...localFilters.boroughs, borough];
    setLocalFilters({ ...localFilters, boroughs: newBoroughs });
  }

  function handleCategoryClick(category: Category) {
    const newCategories = localFilters.categories.includes(category.id)
      ? localFilters.categories.filter((c) => c !== category.id)
      : [...localFilters.categories, category.id];
    setLocalFilters({ ...localFilters, categories: newCategories });
  }

  function capitalizeWords(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <StoriesSearchContainer>
      <SearchTitle>Title</SearchTitle>
      <SearchInput
        id="search"
        placeholder="e.g. My First Story"
        value={localFilters.search}
        onChange={handleSearchChange}
      />
      <SearchTitle>Filters</SearchTitle>
      <SecondaryTitle>Categories</SecondaryTitle>
      <FilterOptionsContainer>
        {categories.map((category) => (
          <FilterOption
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={
              localFilters.categories.includes(category.id) ? "selected" : ""
            }
          >
            {category.name}
          </FilterOption>
        ))}
      </FilterOptionsContainer>
      <SecondaryTitle>Boroughs</SecondaryTitle>
      <FilterOptionsContainer>
        {boroughs.map((borough) => (
          <FilterOption
            key={borough}
            onClick={() => handleBoroughClick(borough)}
            className={
              localFilters.boroughs.includes(borough) ? "selected" : ""
            }
          >
            {capitalizeWords(borough)}
          </FilterOption>
        ))}
      </FilterOptionsContainer>
      <ApplyFiltersButton onClick={applyFilters}>
        Apply Filters
      </ApplyFiltersButton>
    </StoriesSearchContainer>
  );
}
