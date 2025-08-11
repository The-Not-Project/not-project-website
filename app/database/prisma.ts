import { PrismaClient } from '@prisma/client';

// Extend the Node global object to hold a Prisma instance in dev mode.
// This prevents creating a new PrismaClient instance on every hot reload in Next.js.
const globalPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client instance for database access.
 *
 * Behavior:
 * - In production: Always creates a new PrismaClient instance.
 * - In development: Reuses a single PrismaClient instance across hot reloads
 *   to avoid exhausting the database connection pool.
 *
 * Notes:
 * - To debug queries, uncomment the `log: ['query']` option in PrismaClient config.
 */
export const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    // log: ['query'], // Enable for query debugging
  });

// Store the Prisma instance in the global object only in development mode.
if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;
