import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 Server-side Client Configuration
 * * This instance handles authentication logic for the Next.js application.
 * It includes a custom session hook to augment the user object with 
 * Role-Based Access Control (RBAC) claims.
 */
export const auth0 = new Auth0Client({
  /**
   * Hook: beforeSessionSaved
   * * This function runs before the user session is persisted to the session cookie.
   * It decodes the ID Token to extract custom roles and attaches them to the 
   * session user object for easy server-side access.
   * * @param session - The current session object containing user profile data.
   * @param idToken - The raw JWT ID Token provided by Auth0.
   * @returns The augmented session object with roles included.
   */
  beforeSessionSaved: async (session, idToken) => {
    // Manually decode the JWT payload (the second segment of the token)
    const claims = idToken
      ? JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString())
      : {};

    return {
      ...session,
      user: {
        ...session.user,
        // Map custom namespace roles from Auth0 to the user object.
        // Falls back to an empty array if the claim is missing.
        roles: claims["https://thenotproject.com/roles"] || [],
      },
    };
  },
});