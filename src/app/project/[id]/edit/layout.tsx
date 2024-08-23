import Project from "@/lib/database/models/project";
import type { ProjectType } from "@/lib/types/project";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import NavBar from "./_components/NavBar";
import ProjectLoadHandler from "./_components/ProjectLoadHandler";

export async function generateMetadata(
	{
		params: { id },
	}: {
		params: { id: string };
	},
	parent: ResolvingMetadata,
) {
	const project = await Project.findById(id);
	if (!project) return;
	const userDetails = await getUserSession();
	const title =
		!project.public && project.ownerId !== userDetails?.sub
			? "No Permission"
			: project.name;
	return {
		title: `${(await parent).title?.absolute} - Editing ${title}`,
	};
}

export default async function EditProjectPage({
	params,
	children,
}: {
	params: { id: string };
	children: ReactNode;
}) {
	const userDetails = await getUserSession();
	if (!userDetails) {
		return (
			<p>
				You must be{" "}
				<Link href="/login" className="underline">
					logged in
				</Link>{" "}
				to edit a project.
			</p>
		);
	}
	const { id } = params;
	const project = await Project.findById(id);
	if (!project) return notFound();
	if (project.ownerId !== userDetails.sub) {
		return (
			<div className="p-2">
				<p className="font-extrabold">
					You do not have permission to edit this project.
				</p>
				<Link href={`/project/${id}`}>
					<button
						type="button"
						className="p-2 rounded-md bg-emerald-700 text-white"
					>
						Go to Project
					</button>
				</Link>
			</div>
		);
	}
	const initialProject: ProjectType = {
		id: id,
		likes: project.likes,
		name: project.name,
		version: project.version,
		description: project.description,
		public: project.public,
		ownerId: project.ownerId,
		prompts: project.prompts,
		sentenceStructures: project.sentenceStructures,
		wordLists: project.wordLists,
	};
	return (
		<ProjectLoadHandler project={initialProject}>
			<div className="flex flex-col h-full">{children}</div>
		</ProjectLoadHandler>
	);
}
