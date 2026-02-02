'use server'

import { auth0 } from "@/app/lib/auth0";
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
export async function createUser() {
  const session = await auth0.getSession()

  if (!session || !session.user || !session.user.email) {
    throw new Error('Unauthorized')
  }

  await prisma.user.create({
    data: {
      id: session.user.sub,
      email: session.user.email,
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
export async function getUser() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.sub },
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
export async function updateUser(data: FormData) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const firstName = data.get("firstName");
  const lastName = data.get("lastName");

  if (!firstName || !lastName) {
    return;
  }

  await prisma.user.update({
    where: { id: session.user.sub },
    data: {
      firstName: firstName.toString(),
      lastName: lastName.toString(),
    },
  });
}
