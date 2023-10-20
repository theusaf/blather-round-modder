import { getCurrentUser } from "@/lib/app/auth";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (user) return redirect(`/user/${user.username}`);
  return redirect("/user/login");
}
