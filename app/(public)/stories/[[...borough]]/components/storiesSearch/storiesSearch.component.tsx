"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Category, Filters } from "@/app/types/types";
import {
  ApplyFiltersButton,
  FilterCheckbox,
  FilterLabel,
  FilterOptionsContainer,
  SearchContainer,
  SearchInput,
  SearchTitle,
  SecondaryTitle,
  StoriesSearchContainer,
} from "./storiesSearch.styles";
import { FaMagnifyingGlass as SearchIcon } from "react-icons/fa6";
import { FaArrowDownWideShort as FilterIcon } from "react-icons/fa6";

interface StoriesSearchProps {
  initialFilters: Filters;
  availableCategories: Category[];
}

export default function StoriesSearch({
  initialFilters,
  availableCategories,
}: StoriesSearchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [tempSearch, setTempSearch] = useState<string>(initialFilters.search);
  const [tempCats, setTempCats] = useState<string[]>(initialFilters.categories);

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (tempSearch) params.set("q", tempSearch);

    tempCats.forEach((id) => params.append("cat", id));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={applyFilters}>
      <SearchTitle>
        <FilterIcon />
        Filter Stories
      </SearchTitle>
      <StoriesSearchContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            id="search"
            placeholder="Search..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </SearchContainer>
        <hr />
        <div>
          <SecondaryTitle>Categories</SecondaryTitle>
          <FilterOptionsContainer className="visible">
            {availableCategories.map((category) => (
              <div key={category.id} className="checkbox-wrapper-47">
                <FilterCheckbox
                  type="checkbox"
                  name="cb"
                  id={`category-${category.id}`}
                  checked={tempCats.includes(category.id)}
                  onChange={() => {
                    const next = tempCats.includes(category.id)
                      ? tempCats.filter((id) => id !== category.id)
                      : [...tempCats, category.id];
                    setTempCats(next);
                  }}
                />
                <FilterLabel htmlFor={`category-${category.id}`}>
                  {category.name}
                </FilterLabel>
              </div>
            ))}
          </FilterOptionsContainer>
        </div>
        <ApplyFiltersButton>
          <span>Look Up</span> <SearchIcon />
        </ApplyFiltersButton>
      </StoriesSearchContainer>
    </form>
  );
}
