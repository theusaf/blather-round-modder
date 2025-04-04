import "server-only";
import Project from "@/lib/database/models/project";
import { getUserSession } from "@/lib/util/auth";
import revalidateProjectPaths from "@/lib/util/revalidateProjectPaths";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const user = await getUserSession();
	if (!user) return redirect("/login");
	const baseProject = await Project.findById(id);
	if (!baseProject) {
		return NextResponse.json(
			{
				error: "Project not found",
			},
			{ status: 404 },
		);
	}
	if (baseProject.ownerId !== user.sub && !baseProject.public) {
		return NextResponse.json(
			{
				error: "You do not have permission to remix this project",
			},
			{ status: 403 },
		);
	}
	const project = new Project({
		name: `Copy of ${baseProject.name}`,
		description: baseProject.description,
		ownerId: user.sub,
		public: false,
		prompts: baseProject.prompts,
		sentenceStructures: baseProject.sentenceStructures,
		wordLists: baseProject.wordLists,
	});
	await project.save();
	revalidateProjectPaths(user.sub);
	return redirect(`/project/${project.id}/edit`);
}
