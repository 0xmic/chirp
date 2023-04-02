import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

// Cast globalThis to include PrismaClient for global caching
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Create a new PrismaClient instance if it doesn't exist in the global scope
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Cache the PrismaClient instance in the global scope when not in production
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
