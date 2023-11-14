import { getProject } from "@/lib/app/api/projects";
import { exportProject } from "@/lib/export";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const project = await getProject(+context.params.id);
  if (!project) return notFound();
  const zip = await exportProject(project);
  return new Response(zip, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${project.name}.zip"`,
    },
  });
}
