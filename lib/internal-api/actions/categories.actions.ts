"use server";

import { internalApiFetch } from "@/lib/internal-api";
import { updateTag } from "next/cache";

export async function getCategoriesAction() {
  const { data, error, status } = await internalApiFetch<any[]>("/categories", {
    method: "GET",
    next: { 
      revalidate: 300,
      tags: ["categories"] 
    },
  });

  if (error) {
    return {
      success: false,
      message: error,
      status,
      categories: [],
    };
  }

  return {
    success: true,
    categories: data || [],
  };
}

export async function getActiveCategoriesAction() {
  const { data, error, status } = await internalApiFetch<any[]>(
    "/categories/active",
    {
      method: "GET",
      next: {
        revalidate: 300,
        tags: ["categories"],
      },
    },
  );

  if (error) {
    return {
      success: false,
      message: error,
      status,
      categories: [],
    };
  }

  return {
    success: true,
    categories: data || [],
  };
}

export async function createCategoryAction(formData: FormData) {
  updateTag("categories");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    return {
      success: false,
      message: "Name and description are required.",
    };
  }

  try {
    const { error, status } = await internalApiFetch("/categories", {
      method: "POST",
      body: {
        name: name.toString(),
        description: description.toString(),
      },
    });

    if (error) {
      return { success: false, message: error, status };
    }

    return { success: true, message: "Category created successfully!" };
  } catch (err) {
    console.error("CREATE_CATEGORY_ERROR:", err);
    return {
      success: false,
      message: "Failed to create category",
      status: 500,
    };
  }
}

export async function editCategoryAction(id: string, formData: FormData) {
  updateTag("categories");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || !description) {
    return {
      success: false,
      message: "Name and description are required.",
    };
  }

  try {
    const { error, status } = await internalApiFetch(`/categories/${id}`, {
      method: "PATCH",
      body: {
        name: name.toString(),
        description: description.toString(),
      },
    });

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Category updated successfully!",
    };
  } catch (err) {
    console.error("EDIT_CATEGORY_ERROR:", err);
    return {
      success: false,
      message: "Failed to update category",
      status: 500,
    };
  }
}

export async function deleteCategoryAction(id: string) {
  updateTag("categories");
  try {
    const { error, status } = await internalApiFetch(`/categories/${id}`, {
      method: "DELETE",
    });

    if (error) {
      return {
        success: false,
        message: error,
        status,
      };
    }

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (err) {
    console.error("DELETE_CATEGORY_ERROR:", err);
    return {
      success: false,
      message: "An unexpected error occurred while deleting the category.",
      status: 500,
    };
  }
}
