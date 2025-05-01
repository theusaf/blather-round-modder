import "server-only";
import Project from "@/lib/database/models/project";
import type { QueryOptions } from "@/lib/types/database";
import type { ProjectType, ShallowProjectType } from "@/lib/types/project";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";
import ProjectListing from "../../_components/ProjectListing";

export async function generateMetadata(
	{ params }: { params: Promise<{ id: string }> },
	parent: ResolvingMetadata,
) {
	const { id } = await params;
	return {
		title: `${(await parent).title?.absolute} - ${id}'s Profile`,
	};
}

export default async function ProfilePage({
	params: paramsWait,
}: {
	params: Promise<{ id: string }>;
}) {
	const params = await paramsWait;
	const limit = 10;
	const userDetails = await getUserSession();
	const options: QueryOptions<ProjectType> = {
		limit,
		where: {
			ownerId: params.id,
		},
	};
	if (userDetails?.sub !== params.id) {
		options.where!.public = true;
	}

	const projects = await Project.findAll(options);

	return (
		<main className="p-2">
			<h1 className="text-2xl font-bold">
				<span>{params.id}</span>&apos;s Projects
			</h1>
			<ProjectListing
				options={{
					limit,
					cursor: Math.max(projects.length, limit),
					userId: params.id,
				}}
				projects={projects.map((p) => {
					const project: ShallowProjectType = {
						id: p.id,
						likes: p.likes,
						public: p.public,
						name: p.name,
						version: p.version,
						ownerId: p.ownerId,
						description: p.description,
						promptCount: p.prompts.length,
					};
					return project;
				})}
			/>
		</main>
	);
}
