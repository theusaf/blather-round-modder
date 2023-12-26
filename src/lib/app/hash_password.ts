import { type user as UserEntity } from "@prisma/client";
import argon2 from "argon2";

export function hashPassword(user: UserEntity, password: string) {
  const salt = user.salt ?? "";
  return hashPasswordWithSalt(password, salt);
}

export async function hashPasswordWithSalt(password: string, salt: string) {
  return await argon2.hash(password, { salt: Buffer.from(salt, "base64") });
}

export function generateSalt() {
  let salt = "";
  for (let i = 0; i < 32; i++) {
    salt += String.fromCharCode(Math.floor(Math.random() * 256));
  }
  return Buffer.from(salt).toString("base64");
}

export async function verifyPassword(user: UserEntity, password: string) {
  const hashedPassword = await hashPassword(user, password);
  return hashedPassword === user.password;
}
