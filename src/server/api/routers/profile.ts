import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

// Define the profileRouter for handling profile-related API calls
export const profileRouter = createTRPCRouter({
  // Route for getting a user by username
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      // Retrive the user with the specified username
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      // If the user is not found, throw a TRPCError with the "NOT_FOUND" code
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Return the user data after filtering sensitive information
      return filterUserForClient(user);
    }),
});
