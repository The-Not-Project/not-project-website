'use server';
import { prisma } from '../prisma';

/**
 * Retrieves all categories from the database.
 * Used primarily for management lists or admin selection menus.
 */
export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

/**
 * Retrieves only "Active" categories.
 * A category is considered active if it is associated with at least one story.
 * Results are ordered alphabetically by name.
 */
export async function getActiveCategories() {
  const categories = await prisma.category.findMany({
    where: {
      stories: {
        // Filter for categories that have a non-empty relation to stories
        some: {}
      }
    },
    orderBy: {
      name: 'asc'
    }
  });

  return categories;
}

/**
 * Creates a new category.
 * Extracts 'name' and 'description' from FormData.
 * @param data - The FormData object from a form submission.
 */
export async function createCategory(data: FormData) {
  const name = data.get('name');
  const description = data.get('description');

  // Basic validation to ensure required fields are present
  if (!name || !description) {
    return;
  }

  await prisma.category.create({
    data: {
      name: name.toString(),
      description: description.toString(),
    },
  });
}

/**
 * Delete a category from the database by ID.
 * * @param id - The category's unique ID (string).
 * * Warning: This will permanently remove the category.
 * If there are related StoryCategory records, Prisma's referential actions 
 * (like CASCADE or RESTRICT) will apply based on your schema.prisma definition.
 */
export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: {
      id,
    },
  });
}

/**
 * Updates an existing category's details.
 * @param id - The unique ID of the category to update.
 * @param data - FormData containing the updated 'name' and 'description'.
 */
export async function editCategory(id: string, data: FormData) {
  const name = data.get('name');
  const description = data.get('description');

  if (!name || !description) {
    return;
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name: name.toString(),
      description: description.toString(),
    },
  });
}