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

export default function StoriesSearchSkeleton() {



  return (
    <div>
      <SearchTitle>
        <FilterIcon />
        Filter Stories
      </SearchTitle>
      <StoriesSearchContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput id="search" placeholder="Search..." />
        </SearchContainer>
        <hr />
        <div>
          <SecondaryTitle>Categories</SecondaryTitle>
          <FilterOptionsContainer className="visible">
            <p>Loading...</p>
            <p>Loading...</p>
            <p>Loading...</p>
            <p>Loading...</p>
          </FilterOptionsContainer>
        </div>
        <ApplyFiltersButton>
          <span>Look Up</span> <SearchIcon />
        </ApplyFiltersButton>
      </StoriesSearchContainer>
    </div>
  );
}
