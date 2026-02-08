import { prisma } from "../prisma";

/**
 * Creates a new subscriber in the database.
 * * @param email - The primary identifier for the subscriber (must be unique).
 * @param phone - Optional phone number for SMS notifications.
 * @returns A string message indicating the result of the operation (success or duplicate).
 */
export async function createSubscriber(
  email: string,
  phone?: string
): Promise<string> {
  "use server";

  // Check if a subscriber with this email already exists to prevent duplicates
  const existingSubscriber = await prisma.subscriber.findUnique({
    where: { email },
  });

  if (existingSubscriber) return "Email already subscribed";

  // Create the new subscriber record
  await prisma.subscriber.create({
    data: {
      email,
      phone: phone || null, // Ensure phone is stored as null if undefined
    },
  });

  return "Thanks for subscribing!";
}