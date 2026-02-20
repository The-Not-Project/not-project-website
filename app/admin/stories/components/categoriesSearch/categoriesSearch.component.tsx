import { useEffect, useState } from "react";
import {
  CategoriesInput,
  CategoriesList,
  CategoriesSearchContainer,
  SelectedCategory,
} from "./categoriesSearch.styles";
import { FaXmark as IconClose } from "react-icons/fa6";
import { Category } from "@/app/types/types";

type CategoriesSearchProps = {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  getCategories: () => Promise<{ categories: Category[] }>;
};

export default function CategoriesSearch({
  selectedCategories,
  setSelectedCategories,
  getCategories,
}: CategoriesSearchProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories } = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
      !selectedCategories.some((selected) => selected.id === category.id),
  );

  const addCategory = (category: Category) => {
    setSelectedCategories([...selectedCategories, category]);
    setSearchTerm("");
  };

  const removeCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat.id !== categoryId),
    );
  };
  return (
    <CategoriesSearchContainer>
      {selectedCategories.map((category) => (
        <SelectedCategory key={category.id}>
          {category.name}

          <IconClose onClick={() => removeCategory(category.id)} />
        </SelectedCategory>
      ))}
      <CategoriesInput
        type="text"
        id="categories"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={
          searchTerm && filteredCategories.length > 0 ? "expanded" : ""
        }
      />
      {searchTerm && filteredCategories.length > 0 && (
        <CategoriesList>
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              onClick={() => addCategory(category)}
              style={{ padding: "0.25rem 0", cursor: "pointer" }}
            >
              {category.name}
            </li>
          ))}
        </CategoriesList>
      )}
    </CategoriesSearchContainer>
  );
}
