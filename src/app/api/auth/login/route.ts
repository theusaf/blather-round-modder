import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/lib/app/hash_password";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const backLink = req.headers.get("Referer") ?? "/";
  const body = await req.formData();
  const username = body.get("username") as string;
  const password = body.get("password") as string;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return Response.redirect(backLink, 303);
  const verified = await verifyPassword(user, password);
  if (!verified) return Response.redirect(backLink, 303);
  const session = await prisma.user_sesion.create({
    data: {
      user_username: user.username,
      session_id: uuid(),
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days. TODO: Make this value configurable.
    },
  });
  cookies().set("session_id", session.session_id);
  return Response.redirect("/user");
}
