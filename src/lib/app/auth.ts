import "server-only";
import { cookies } from "next/headers";
import "@/database/config/config";
import "@/database/config/sessionConfig.js";
import { UserSessionEntity } from "@/database/session/entity/userSession.js";
import { UserEntity } from "@/database/entity/system/User.js";

const SESSION_COOKIE_NAME = "session_id";

export async function getCurrentUser() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;
  const sessionUser = await UserSessionEntity.findOneBy({ session_id: sessionCookie });
  if (!sessionUser) return null;
  const user = UserEntity.findOneBy({ username: sessionUser.user_id });
  if (!user) return null;
  return user;
}
