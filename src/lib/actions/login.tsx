"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { JWTUserLogin } from "@/lib/types/session";
import { encrypt } from "@/lib/util/session";
import User from "../database/models/user";
import { verify } from "../util/auth";

export async function loginWithPasswordAction(
	_: unknown,
	formData: FormData,
	redirectPath?: string,
) {
	const error = await loginWithPassword(formData, redirectPath);
	if (error) {
		return { error: "Invalid username or password" };
	}
}

export async function loginWithPassword(
	formData: FormData,
	redirectPath?: string,
) {
	const username = formData.get("username");
	const plaintextPassword = formData.get("password");
	if (typeof username !== "string" || !username) return true;
	if (typeof plaintextPassword !== "string" || !plaintextPassword) return true;
	const dbUser = await User.findById(username);
	if (!dbUser) return true;
	const hashedPassword = dbUser.password;
	if (!(await verify(hashedPassword, plaintextPassword))) return true;
	const user: JWTUserLogin = { sub: username };
	await createSession(user);
	if (redirectPath?.startsWith("/")) {
		return redirect(redirectPath);
	}
	return redirect("/");
}

export async function createSession(user: JWTUserLogin) {
	const session = await encrypt(user);
	cookies().set("session", session, {
		maxAge: 60 * 60 * 24 * 7,
		httpOnly: true,
		sameSite: "lax",
	});
}
