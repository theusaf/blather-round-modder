import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import "server-only";

export function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // Currently, the profile page functions as the project listing for a specific user
  return redirect(`/profile/${params.id}`);
}
