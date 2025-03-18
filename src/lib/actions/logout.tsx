"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(redirectPath?: string) {
	(await cookies()).delete("session");
	if (redirectPath?.startsWith("/")) {
		return redirect(redirectPath);
	}
	return redirect("/");
}
