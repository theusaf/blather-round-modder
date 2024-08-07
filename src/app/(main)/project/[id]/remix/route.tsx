import "server-only";
import { type NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/util/auth";
import { redirect } from "next/navigation";
import Project from "@/lib/database/models/project";
import revalidateProjectPaths from "@/lib/util/revalidateProjectPaths";

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
) {
	const id = params.id;
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
