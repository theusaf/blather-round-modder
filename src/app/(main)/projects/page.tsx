import "server-only";
import Project from "@/lib/database/models/project";
import type { QueryOptions } from "@/lib/types/database";
import type { ProjectType, ShallowProjectType } from "@/lib/types/project";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";
import ProjectListing from "../_components/ProjectListing";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
	return {
		title: `${(await parent).title?.absolute} - Projects`,
	};
}

export default async function ProjectsPage() {
	const limit = 10;
	const publicProjects = await Project.findAll({
		limit,
		where: {
			public: true,
		},
	});

	const userDetails = await getUserSession();
	const userOptions: QueryOptions<ProjectType> = {
		limit,
		where: {
			ownerId: userDetails?.sub,
		},
	};
	const userProjects = userDetails?.sub
		? await Project.findAll(userOptions)
		: [];

	return (
		<main className="p-4">
			{userProjects.length > 0 && (
				<>
					<h1
						className="text-2xl font-bold mb-2"
						data-id="project-header-personal"
					>
						My Projects
					</h1>
					<ProjectListing
						options={{
							limit,
							cursor: Math.max(userProjects.length, limit),
						}}
						projects={userProjects.map((p) => {
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
				</>
			)}
			<h1 className="text-2xl font-bold mb-2" data-id="project-header-public">
				Projects
			</h1>
			<ProjectListing
				options={{
					limit,
					cursor: Math.max(publicProjects.length, limit),
				}}
				projects={publicProjects.map((p) => {
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
