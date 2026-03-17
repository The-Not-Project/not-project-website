import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_API_URL,
  
  plugins: [
    inferAdditionalFields({
      user: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          role: { type: "string" },
      },
    }),
  ],
});
