import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "./generated/client";

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
  });
  return new PrismaClient({ adapter });
};

declare global {
  var prismaInstance: undefined | ReturnType<typeof createPrismaClient>;
}

const prisma = globalThis.prismaInstance ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaInstance = prisma;
}

export { prisma };