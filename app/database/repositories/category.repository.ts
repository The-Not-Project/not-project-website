'use server';
import { prisma } from '../prisma';

/**
 * Fetch all categories from the database.
 * 
 * @returns Promise resolving to an array of Category objects.
 * 
 * Note: No filtering or ordering is applied here — this will return all categories in any order.
 */
export async function getCategories() {

  const categories = await prisma.category.findMany();
  return categories;
}

export async function getActiveCategories() {

  const categories = await prisma.category.findMany({
    where: {
      stories: {
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
 * Create a new category in the database.
 * 
 * @param data - FormData object containing:
 *   - name: The category name (required)
 *   - description: A short description of the category (required)
 * 
 * If either field is missing, the function exits without creating anything.
 */
export async function createCategory(data: FormData) {

  const name = data.get('name');
  const description = data.get('description');

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
 * 
 * @param id - The category's unique ID (string).
 * 
 * Warning: This will permanently remove the category.
 * If there are related StoryCategory records, Prisma's referential actions will apply (check schema).
 */
export async function deleteCategory(id: string) {
  
  await prisma.category.delete({
    where: {
      id,
    },
  });
}

/**
 * Update an existing category's name and description.
 * 
 * @param id - The category's unique ID.
 * @param data - FormData object containing:
 *   - name: Updated category name (required)
 *   - description: Updated category description (required)
 * 
 * If either field is missing, the update is skipped.
 */
export async function editCategory(id: string, data: FormData) {
  'use server';

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
