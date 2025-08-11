import { prisma } from "../prisma";

/**
 * Create a new newsletter/notification subscriber.
 *
 * @param email - Subscriber's email address (must be unique).
 * @param phone - Optional phone number for SMS notifications.
 * @returns A status message indicating the result:
 *   - `"Email already subscribed"` if the email exists.
 *   - `"Thanks for subscribing!"` if the subscriber is successfully added.
 *
 * Behavior:
 * - Checks if the provided email already exists in the `subscribers` table.
 * - If unique, creates a new subscriber row with the provided email and optional phone.
 *
 * Notes:
 * - The `email` column has a unique constraint (enforced in the Prisma schema).
 * - `phone` is stored as `null` when not provided.
 */
export async function createSubscriber(
  email: string,
  phone?: string
): Promise<string> {
  "use server";

  // Check if email is already in the subscribers list
  const existingSubscriber = await prisma.subscriber.findUnique({
    where: { email },
  });

  if (existingSubscriber) return "Email already subscribed";

  // Create a new subscriber
  await prisma.subscriber.create({
    data: {
      email,
      phone: phone || null,
    },
  });

  return "Thanks for subscribing!";
}
