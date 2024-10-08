"use server";

import { API_BASE_URL } from "@/lib/constants";
import { UserInput } from "@/types/types";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
  const user: UserInput = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    profilePhoto: formData.get("profilePhoto") as File,
  };
    console.log(user);
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        body: formData,
    });
    console.log(await response.json());
    if(!response.ok) {
        throw new Error("Failed to sign up");
    }
    redirect("/signin");
    
}
