import { verifyPassword } from "@/lib/app/hash_password";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/app/prisma_connection";
import { redirect } from "@/lib/app/navigation";
import { createUserSession } from "@/lib/app/auth";

export async function POST(req: Request) {
  const prisma = getPrismaClient(),
    url = new URL(req.url),
    backLink = new URL(
      req.headers.get("Referer") ?? `${url.protocol}//${url.host}`,
    ),
    body = await req.formData(),
    username = ((body.get("username") as string) ?? "").trim(),
    password = body.get("password") as string,
    user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    backLink.searchParams.set("error", "1");
    return Response.redirect(backLink, 303);
  }
  const verified = await verifyPassword(user, password);
  if (!verified) {
    backLink.searchParams.set("error", "1");
    return Response.redirect(backLink, 303);
  }
  await createUserSession(user);
  return redirect(req, "/user", 302);
}
