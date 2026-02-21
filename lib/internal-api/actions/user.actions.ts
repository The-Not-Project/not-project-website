"use server";

import { auth0 } from "@/lib/auth0/auth0";
import { internalApiFetch } from "@/lib/internal-api";
import { updateTag } from "next/cache";

export async function getUserAction() {

  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return {
        success: false,
        message: "Unauthorized",
        status: 401,
        user: null,
      };
    }

    const userId = session.user.sub;

    const { data, error, status } = await internalApiFetch<any>(
      `/user/${userId}`,
      {
        method: "GET",
        next: {
          revalidate: 3600,
          tags: ["user"]
        }
      },
    );

    if (error) {
      return {
        success: false,
        message: error,
        status,
        user: null,
      };
    }

    return {
      success: true,
      user: data,
    };
  } catch (err) {
    console.error("USER_ACTION_ERROR:", err);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
      user: null,
    };
  }
}

export async function createUserAction() {
  updateTag("user")
  try {
    const session = await auth0.getSession();

    if (!session || !session.user || !session.user.email) {
      return { success: false, message: "Unauthorized", status: 401 };
    }

    const { error, status } = await internalApiFetch("/user", {
      method: "POST",
      body: {
        id: session.user.sub,
        email: session.user.email,
        firstName: "",
        lastName: "",
      },
      next: {
        tags: ["user-profile"],
      },
    });

    if (error) {
      return { success: false, message: error, status };
    }

    return { success: true, message: "User created successfully" };
  } catch (err) {
    console.error("CREATE_USER_ACTION_ERROR:", err);
    return { success: false, message: "Failed to create user", status: 500 };
  }
}

export async function updateUserAction(formData: FormData) {
  updateTag("user");
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized", status: 401 };
    }

    const userId = session.user.sub;

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const { error, status } = await internalApiFetch(`/user/${userId}`, {
      method: "PATCH",
      body: {
        firstName,
        lastName,
      },
    });

    
    if (error) {
      return { success: false, message: error, status };
    }
    

    return { success: true, message: "Profile updated!" };
  } catch (err) {
    console.error("UPDATE_USER_ERROR:", err);
    return { success: false, message: "Failed to update profile", status: 500 };
  }
}

export async function createSubscriberAction(email: string, phone?: string): Promise<string> {
  try {
    const { data, error } = await internalApiFetch<{ message: string }>("/user/subscribe", {
      method: "POST",
      body: { email, phone },
    });

    if (error) {
      throw new Error(error);
    }

    return data?.message || "";
    
  } catch (err) {
    console.error("SUBSCRIBE_ACTION_ERROR:", err);
    throw new Error("Failed to subscribe");
  }
}