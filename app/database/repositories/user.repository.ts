import { User } from "../../types/types";
import { prisma } from "../prisma";

/**
 * Create a new user record.
 *
 * @param id - The user's unique ID (Auth0 `sub` value).
 * @param email - The user's email address.
 *
 * Behavior:
 * - Does nothing if either `id` or `email` is missing.
 * - Creates a new row in the `user` table with empty `firstName` and `lastName`.
 *
 * Notes:
 * - Intended to be called when a new Auth0 user logs in for the first time.
 * - The `id` and `email` fields must be unique (enforced by schema).
 */
export async function createUser({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  "use server";

  if (!id || !email) {
    return;
  }

  await prisma.user.create({
    data: {
      id,
      email,
      firstName: "",
      lastName: "",
    },
  });
}

/**
 * Get a user by ID.
 *
 * @param id - The user's unique ID.
 * @returns The user object or `null` if not found.
 */
export async function getUser(id: string) {
  "use server";

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

/**
 * Update a user's first and last name.
 *
 * @param data - FormData containing:
 *   - `firstName` (required)
 *   - `lastName` (required)
 * @param user - The user object to update.
 *
 * Behavior:
 * - Does nothing if `firstName` or `lastName` is missing from the form data.
 * - Updates only the name fields for the given user.
 */
export async function UpdateUser(data: FormData, user: User) {
  "use server";

  const firstName = data.get("firstName");
  const lastName = data.get("lastName");

  if (!firstName || !lastName) {
    return;
  }

  await prisma.user.update({
    where: { id: user?.id },
    data: {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
    },
  });
}
