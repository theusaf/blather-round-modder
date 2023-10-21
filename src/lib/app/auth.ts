import "server-only";
import { cookies } from "next/headers";
import { UserSessionEntity } from "@/database/session/entity/userSession";
import { UserEntity } from "@/database/entity/system/User";

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
