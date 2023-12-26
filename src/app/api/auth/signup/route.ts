import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/app/prisma_connection";
import { redirect } from "@/lib/app/navigation";

export async function POST(req: Request) {
  const prisma = getPrismaClient(),
    backLink = new URL(
      req.headers.get("Referer") ?? `http://${req.headers.get("Host")}`,
    ),
    body = await req.formData(),
    username = body.get("username") as string,
    email = body.get("email") as string,
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
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  const session = await prisma.user_sesion.create({
    data: {
      user_username: newUser.username,
      session_id: uuid(),
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days. TODO: Make this value configurable.
    },
  });
  cookies().set("session_id", session.session_id);
  return redirect(req, "/user", 302);
}
