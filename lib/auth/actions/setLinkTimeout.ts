"use server";

import { cookies } from "next/headers";

export async function validateCooldownAction() {
  const cookieStore = await cookies();
  if (cookieStore.get("reset_cooldown")) {
    return { error: "Please wait before requesting another link." };
  }
  return { success: true };
}

export async function setCooldownAction() {
  const cookieStore = await cookies();
  const maxAge = 120;
  const expiryTime = Date.now() + maxAge * 1000;

  cookieStore.set("reset_cooldown", "true", {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  cookieStore.set("reset_cooldown_expiry", expiryTime.toString(), {
    maxAge,
    httpOnly: false,
    path: "/",
  });

  return { expiryTime };
}