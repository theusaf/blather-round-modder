"use server";

import { redirect } from "next/navigation";
import User from "../database/models/user";
import { hash } from "../util/auth";
import { createSession } from "./login";

export async function registerWithPasswordAction(
	_: unknown,
	formData: FormData,
) {
	const error = await registerWithPassword(formData);
	if (error) return { error };
}

export async function registerWithPassword(
	formData: FormData,
	redirectPath?: string,
) {
	const username = formData.get("username");
	const plaintextPassword = formData.get("password");
	if (typeof username !== "string" || !username) return "Username is required";
	if (typeof plaintextPassword !== "string" || !plaintextPassword)
		return "Password is required";
	if (plaintextPassword.length < 8)
		return "Password must be at least 8 characters long";
	if (username.length > 32) return "Username is too long";

	const dbUser = await User.findById(username);
	if (dbUser) return "Username is already taken";

	const hashedPassword = await hash(plaintextPassword);
	const user = new User({ username, password: hashedPassword });
	await user.save();
	await createSession({ sub: username });
	if (redirectPath?.startsWith("/")) {
		return redirect(redirectPath);
	}
	return redirect("/");
}
