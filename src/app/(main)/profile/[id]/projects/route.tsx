import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import "server-only";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	// Currently, the profile page functions as the project listing for a specific user
	return redirect(`/profile/${(await params).id}`);
}
