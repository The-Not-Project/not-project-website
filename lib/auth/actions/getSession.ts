import { headers } from "next/headers";

export async function getSession() {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.AUTH_API_URL}/get-session`, {
      headers: {
        cookie: cookie,
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Auth API unreachable:", error);
    return null;
  }
}