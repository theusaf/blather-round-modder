import "server-only";
import argon2 from "argon2";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export function hash(plaintext: string): Promise<string> {
  return argon2.hash(plaintext);
}

export function verify(hash: string, plaintext: string): Promise<boolean> {
  return argon2.verify(hash, plaintext);
}

export async function getUserSession() {
  const session = cookies().get("session");
  const userDetails = await decrypt(session?.value);
  return userDetails;
}
