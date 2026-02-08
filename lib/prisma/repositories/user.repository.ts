'use server'

import { auth0 } from "@/lib/auth0/auth0";
import { prisma } from "../prisma";

/**
 * Initializes a new user record in the database.
 * This is typically called immediately after a user's first successful login.
 * * It uses the Auth0 'sub' (subject) as the unique primary key for the database record
 * to ensure a 1:1 mapping between Auth0 and the local user profile.
 * * @throws Error 'Unauthorized' if no valid Auth0 session is found.
 */
export async function createUser() {
  const session = await auth0.getSession()

  if (!session || !session.user || !session.user.email) {
    throw new Error('Unauthorized')
  }

  await prisma.user.create({
    data: {
      id: session.user.sub, // Mapping the Auth0 unique ID
      email: session.user.email,
      firstName: "", // Initialized as empty strings to be updated later
      lastName: "",
    },
  });
}

/**
 * Retrieves the local database profile for the currently logged-in user.
 * * @returns The user record from Prisma or null if not found.
 * @throws Error "Unauthorized" if the session is missing.
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
 * Updates the current user's personal information.
 * * This function extracts profile data from a FormData object, usually 
 * originating from a profile settings or onboarding form.
 * * @param data - FormData containing 'firstName' and 'lastName'.
 */
export async function updateUser(data: FormData) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const firstName = data.get("firstName");
  const lastName = data.get("lastName");

  // Server-side guard to ensure both names are provided before updating
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