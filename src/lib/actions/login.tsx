"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JWTUserLogin } from "@/lib/types/session";
import { encrypt } from "@/lib/util/session";

export async function loginWithPassword(
  formData: FormData,
  redirectPath?: string,
) {
  const user: JWTUserLogin = {
    sub: formData.get("username") as string,
  };
  const session = await encrypt(user);
  cookies().set("session", session, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  });
  if (redirectPath?.startsWith("/")) {
    return redirect(redirectPath);
  } else {
    return redirect("/");
  }
}
