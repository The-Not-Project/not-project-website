"use server";

import { cookies } from "next/headers";
import { internalApiFetch } from "..";
import { User } from "@/app/types/types";

export async function getUsersAction() {
  const { data, error } = await internalApiFetch<User[]>("/user", {
    method: "GET",
  });

  if (error) {
    return {
      success: false,
      message: error,
      users: [],
    };
  }

  return {
    success: true,
    users: data || [],
  };
}

export async function createSubscriberAction(
  email: string,
  phone?: string,
): Promise<string> {
  try {
    const { data, error } = await internalApiFetch<{ message: string }>(
      "/user/subscribe",
      {
        method: "POST",
        body: { email, phone },
      },
    );

    if (error) throw new Error(error);

    return data?.message || "";
  } catch (err) {
    console.error("SUBSCRIBE_ACTION_ERROR:", err);
    throw new Error("Failed to subscribe");
  }
}

export async function deleteSubscriberAction(email: string): Promise<string> {
  try {
    const { data, error } = await internalApiFetch<{ message: string }>(
      "/user/unsubscribe",
      { method: "DELETE", body: { email } },
    );

    if (error) throw new Error(error);

    const cookieStore = await cookies();
    cookieStore.set("unsub_success", "true", {
      maxAge: 30,
      httpOnly: true,
      path: "/unsubscribe/success",
    });

    return data?.message || "Unsubscribed";
  } catch (err: any) {
    throw new Error(err.message || "Failed to unsubscribe");
  }
}
