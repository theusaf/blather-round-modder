import { UserEntity } from "@/database/entity/system/User";
import { UserSessionEntity } from "@/database/session/entity/userSession";
import { verifyPassword } from "@/lib/app/hash_password";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const backLink = req.headers.get("Referer") ?? "/";
  const body = await req.formData();
  const username = body.get("username") as string;
  const password = body.get("password") as string;
  const user = await UserEntity.findOneBy({ username });
  if (!user) return Response.redirect(backLink, 303);
  const verified = await verifyPassword(user, password);
  if (!verified) return Response.redirect(backLink, 303);
  const session = new UserSessionEntity();
  session.user_id = user.username;
  session.session_id = uuid();
  await session.save();
  cookies().set("session_id", session.session_id);
  return Response.redirect("/user");
}
