"use server";

import { API_BASE_URL } from "@/lib/constants";
import { UserDetails } from "@/types/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";


export async function signinAction(
  prevState: { userDetails: null | UserDetails; message: string },
  formData: FormData
): Promise<{ userDetails: null | UserDetails; message: string }> {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const requestBody = JSON.stringify({ email, password });
  const response = await fetch(`${API_BASE_URL}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
    if (!response.ok) {
        return { userDetails :null,message:"Invalid Credentials"};
    }
  const data = await response.json();
  const { token, name, profilePhoto } = data;
  const userDetails: UserDetails = { email, name, profilePhoto };
  const { exp } = jwtDecode(token) as { exp: number };
  cookies().set("token", token, { expires: new Date(exp * 1000) });
  cookies().set("userDetails", JSON.stringify(userDetails), {
    httpOnly: true,
    expires: new Date(exp * 1000),
  });
  return { userDetails, message: "" };
}

export async function signoutAction(): Promise<void> {
  cookies().delete("token");
    cookies().delete("userDetails");
    redirect("/");
}

export async function getUserDetails(): Promise<UserDetails | null> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return null;
  }
  const { exp } = jwtDecode(token) as { exp: number };
  if (!exp || exp * 1000 < Date.now()) {
    return null;
  }
  const userDetails: UserDetails | null = JSON.parse(
    cookies().get("userDetails")?.value || ""
  );
  return userDetails;
}