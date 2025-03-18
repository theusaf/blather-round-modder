import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { JWTUserLogin } from "../types/session";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Encrypts user login information into a JWT token.
 *
 * @param payload
 * @returns A JWT token which expires in 7 days.
 */
export function encrypt(payload: JWTUserLogin): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

/**
 * Verifies and decrypts a JWT token into user login information.
 *
 * @param session The JWT token to decrypt.
 * @returns The user login information if the token is valid, otherwise `null`.
 */
export async function decrypt(session = ""): Promise<JWTUserLogin | null> {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload as JWTUserLogin;
	} catch {
		return null;
	}
}

/**
 * Removes the user's session cookie.
 */
export async function deleteSession(): Promise<void> {
	(await cookies()).delete("session");
}
