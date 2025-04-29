import "server-only";
import Project from "@/lib/database/models/project";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "./_components/DeleteButton";
import { ProjectDownload } from "./_components/ProjectDownload";
import { ProjectDataView } from "./_components/view/ProjectDataView";

export async function generateMetadata(
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
	parent: ResolvingMetadata,
) {
	const { id } = await params;
	const project = await Project.findById(id);
	if (!project) return;
	const userDetails = await getUserSession();
	const title =
		!project.public && project.ownerId !== userDetails?.sub
			? "No Permission"
			: project.name;
	return {
		title: `${(await parent).title?.absolute} - ${title}`,
		description: project.description,
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const project = await Project.findById(id);
	if (!project) return notFound();
	const userDetails = await getUserSession();
	if (!project.public && project.ownerId !== userDetails?.sub) {
		return (
			<div className="p-2">
				<p className="font-extrabold">
					You do not have permission to view this project.
				</p>
				<Link href="/">
					<button
						type="button"
						className="p-2 rounded-md bg-emerald-700 text-white"
					>
						Go Home
					</button>
				</Link>
			</div>
		);
	}

	return (
		<main className="p-2">
			<div className="flex justify-between" data-project-id={project.id}>
				<div className="flex-1">
					<h1
						className="text-2xl font-bold flex gap-2"
						data-id="project-header"
					>
						<span data-id="project-name">
							{project.name || "Untitled Project"}
						</span>
						<span
							className="text-slate-500 break-keep"
							data-id="project-version"
						>
							v{project.version}
						</span>
					</h1>
					<p
						className="whitespace-pre-wrap max-h-40 overflow-auto"
						data-id="project-description"
					>
						{project.description}
					</p>
				</div>
				<div
					className="grid grid-cols-1 md:flex gap-2 h-min"
					data-id="project-actions"
				>
					<ProjectDownload
						project={{
							id: project.id,
							name: project.name,
							version: project.version,
							description: project.description,
							likes: project.likes,
							ownerId: project.ownerId,
							public: project.public,
							sentenceStructures: project.sentenceStructures,
							wordLists: project.wordLists,
							prompts: project.prompts,
						}}
					/>
					{userDetails?.sub === project.ownerId && (
						<Link href={`/project/${id}/edit`} className="w-full">
							<button
								type="button"
								className="p-2 rounded-md bg-emerald-700 text-white w-full"
							>
								Edit
							</button>
						</Link>
					)}
					<Link
						href={`/project/${id}/remix`}
						prefetch={false}
						className="w-full"
					>
						<button
							type="button"
							className="p-2 rounded-md bg-emerald-700 text-white w-full"
						>
							Remix
						</button>
					</Link>
					{userDetails?.sub === project.ownerId && (
						<DeleteButton project={project.toJSON()} />
					)}
				</div>
			</div>
			<hr className="my-2" />
			<ProjectDataView project={project.toJSON()} />
		</main>
	);
}
