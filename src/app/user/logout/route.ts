import { cookies } from "next/headers";
import { getPrismaClient } from "@/lib/app/prisma_connection";
import { redirect } from "@/lib/app/navigation";

export async function GET(req: Request) {
  const prisma = getPrismaClient(),
    sessionId = cookies().get("session_id")?.value;
  if (!sessionId) {
    return redirect(req, "/user");
  }
  await prisma.user_sesion
    .delete({ where: { session_id: sessionId } })
    .catch(() => {});
  cookies().delete("session_id");
  return redirect(req, "/user");
}
