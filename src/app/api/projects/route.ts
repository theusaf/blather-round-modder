import { getProjects } from "@/lib/app/api/projects";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  return Response.json(
    await getProjects(
      Object.fromEntries(
        params.entries()
      )
    )
  );
}
