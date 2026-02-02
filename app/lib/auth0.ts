import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  beforeSessionSaved: async (session, idToken) => {
    const claims = idToken
      ? JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString())
      : {};

    return {
      ...session,
      user: {
        ...session.user,
        roles: claims["https://thenotproject.com/roles"] || [],
      },
    };
  },
});
