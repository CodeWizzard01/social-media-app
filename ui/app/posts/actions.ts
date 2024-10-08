"use server";

import { API_BASE_URL } from "@/lib/constants";
import { ApiResponse } from "@/types/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getPosts(page: number): Promise<ApiResponse> {
  const PAGE_SIZE = 2;
  const accessToken = cookies().get("token")?.value;
  const response = await fetch(
    `${API_BASE_URL}/posts?page=${page}&size=${PAGE_SIZE}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const postResponse: ApiResponse = await response.json();
  return postResponse;
}


export async function createPost(
  prevState: {message: string | null; postCreationSuccess: boolean; resetKey: string | null},
  formData: FormData
): Promise<{
  message: string | null;
  postCreationSuccess: boolean;
  resetKey: string | null;
}> {
  const accessToken = cookies().get("token")?.value;
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    revalidatePath("/posts");
    revalidatePath("/");
    return {
      message: null,
      postCreationSuccess: true,
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message: "An error occurred";
      return {
        message,
        postCreationSuccess: false,
        resetKey: null,
      };
  }
}

export async function likePost(postId: string): Promise<void> {
  const accessToken = cookies().get("token")?.value;
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if(!response.ok) {
    throw new Error("Failed to like post");
  }
}