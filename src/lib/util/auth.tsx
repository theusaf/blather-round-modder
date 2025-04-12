import "server-only";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { createSession } from "../actions/login";

/**
 * Hashes a password with Argon2.
 *
 * @param plaintext The password to hash.
 * @returns The hashed password.
 */
export function hash(plaintext: string): Promise<string> {
	return argon2.hash(plaintext);
}

/**
 * Verifies a plaintext password against a hash.
 *
 * @param hash The Argon2 hash.
 * @param plaintext The plaintext password to verify.
 * @returns Whether the password is correct.
 */
export function verify(hash: string, plaintext: string): Promise<boolean> {
	return argon2.verify(hash, plaintext);
}

/**
 * Reads the user session from the session cookie.
 *
 * @returns The user session.
 */
export async function getUserSession() {
	const session = (await cookies()).get("session");
	const userDetails = await decrypt(session?.value);
	// recreate the session after a certain amount of time has passed
	if (userDetails) {
		const issuedAt = userDetails.iat ?? 0;
		const expirationTime = userDetails.exp ?? 0;
		const timeLeft = expirationTime - Date.now();
		const refreshThreshold = 3 * 24 * 60 * 60 * 1000; // 3 days
		// issued at comparison to avoid accidentally refreshing token too often
		if (timeLeft < refreshThreshold && Date.now() - issuedAt > 360e4) {
			await createSession({ sub: userDetails.sub });
		}
	}
	return userDetails;
}
