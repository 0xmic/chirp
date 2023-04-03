import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

// Define the generateSSGHelper function that returns the SSG helper
export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter, // The main router for the app
    ctx: { prisma, userId: null }, // The context object, containing the prisma client and a null userId
    transformer: superjson, // optional - adds superjson serialization
  });
