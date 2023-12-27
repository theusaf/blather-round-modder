import "server-only";
import { cookies } from "next/headers";
import { getPrismaClient } from "./prisma_connection";
import { user } from "@prisma/client";
import { v4 as uuid } from "uuid";

const SESSION_COOKIE_NAME = "session_id";

export async function getCurrentUser() {
  const prisma = getPrismaClient(),
    sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;
  const sessionUser = await prisma.user_sesion.findUnique({
    where: { session_id: sessionCookie },
  });
  if (!sessionUser) return null;
  const user = await prisma.user.findUnique({
    where: { username: sessionUser.user_username },
  });
  if (!user) return null;
  return user;
}

export async function createUserSession(user: user) {
  const prisma = getPrismaClient(),
    session = await prisma.user_sesion.create({
      data: {
        user_username: user.username,
        session_id: uuid(),
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days. TODO: Make this value configurable.
      },
    });
  cookies().set("session_id", session.session_id, {
    path: "/",
    expires: new Date(Number(session.expires)),
  });
}
