import { getProject } from "@/lib/app/api/projects";
import { getCurrentUser } from "@/lib/app/auth";
import { exportProject } from "@/lib/export";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const project = await getProject(+context.params.id);
  const user = await getCurrentUser();
  if (!project) return notFound();
  if (!project.public && user?.username !== project.ownerUsername)
    return notFound();
  const zip = await exportProject(project);
  return new Response(zip, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${project.name}.zip"`,
    },
  });
}
