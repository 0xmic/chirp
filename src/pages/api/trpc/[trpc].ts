import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env.mjs";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";

// export API handler using tRPC's createNextApiHandler
export default createNextApiHandler({
  router: appRouter, // Use the appRouter for routing requests
  createContext: createTRPCContext, // Use the createTRPCContext function for creating the tRPC context
  onError:
    env.NODE_ENV === "development"
      ? // Log errors to the consol in development environment
        ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : // Don't log errors in production environment
        undefined,
});
