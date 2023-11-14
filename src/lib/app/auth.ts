import "server-only";
import { cookies } from "next/headers";
import { getPrismaClient } from "./prisma_connection";

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
