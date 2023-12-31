import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/app/prisma_connection";
import { redirect } from "@/lib/app/navigation";
import { generateSalt, hashPasswordWithSalt } from "@/lib/app/hash_password";
import { createUserSession } from "@/lib/app/auth";

export async function POST(req: Request) {
  const prisma = getPrismaClient(),
    url = new URL(req.url),
    backLink = new URL(
      req.headers.get("Referer") ?? `${url.protocol}//${url.host}`,
    ),
    body = await req.formData(),
    username = ((body.get("username") as string) ?? "").trim(),
    email = ((body.get("email") as string) ?? "").trim(),
    password = body.get("password") as string;

  if (!username || !email || !password) {
    backLink.searchParams.set("error", "1");
    backLink.searchParams.set("message", encodeURIComponent("Missing fields."));
    return Response.redirect(backLink, 303);
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    backLink.searchParams.set("error", "1");
    backLink.searchParams.set(
      "message",
      encodeURIComponent("Username already exists."),
    );
    return Response.redirect(backLink, 303);
  }
  const salt = generateSalt(),
    newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: await hashPasswordWithSalt(password, salt),
        salt: salt,
      },
    });
  await createUserSession(newUser);
  return redirect(req, "/user", 302);
}
