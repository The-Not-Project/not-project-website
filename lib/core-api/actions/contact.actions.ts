"use server";

import { internalApiFetch } from "..";


export async function sendContactEmailAction(formData: FormData) {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const type = formData.get("type") as string;
  const token = formData.get("token") as string;

  if (!message || !type) {
    return { success: false, message: "Missing required fields" };
  }

  const { error } = await internalApiFetch<{ success: boolean }>(
    "/contact",
    {
      method: "POST",
      body: {
        email,
        message,
        type,
        token,
      },
    }
  );

  if (error) {
    return { success: false, message: error };
  }

  return { success: true, message: "Message sent successfully!" };
}