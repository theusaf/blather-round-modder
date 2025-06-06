"use client";
import type { ProjectListingAPIOptions } from "@/lib/types/api";
import type { ShallowProjectType } from "@/lib/types/project";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import Link from "next/link";
import { useRef, useState } from "react";

export default function ProjectListing({
	projects: initialProjects,
	options: initialOptions,
}: {
	projects: ShallowProjectType[];
	options?: ProjectListingAPIOptions;
}) {
	const [projects, setProjects] = useState(initialProjects);
	const options = useRef<ProjectListingAPIOptions>(initialOptions ?? {});
	const [cursor, setCursor] = useState(options.current.cursor ?? 0);
	const [loading, setLoading] = useState(false);
	const limit = options.current.limit ?? 10;
	const buttonVisible = projects.length >= cursor;

	return (
		<>
			<div className="flex flex-wrap gap-4" data-id="project-listing">
				{projects.length === 0 && (
					<div className="p-2 text-center">No projects found</div>
				)}
				{projects.map((project) => (
					<div
						key={project.id}
						className="w-[18rem] h-[16rem] rounded-xl p-4 border-2 border-slate-400 flex flex-col"
						data-id="project-container"
						data-project-id={project.id}
						data-public={project.public}
					>
						<div>
							<h3
								className="text-xl font-semibold flex gap-2"
								data-id="project-header"
							>
								<span
									title={project.name}
									className="truncate"
									data-id="project-name"
								>
									{project.name}
								</span>
								<span
									className="whitespace-nowrap break-keep text-slate-500"
									data-id="project-version"
								>
									v{project.version}
								</span>
							</h3>
							<Link
								href={`/profile/${encodeURIComponent(project.ownerId!)}`}
								data-id="project-owner"
							>
								<p>{project.ownerId}</p>
							</Link>
						</div>
						<hr />
						<p
							className="flex-1 overflow-auto whitespace-pre-wrap"
							data-id="project-description"
						>
							{project.description}
						</p>
						<div className="flex justify-between">
							<div className="flex gap-2">
								<Link href={`/project/${project.id}`}>
									<button
										type="button"
										className="bg-emerald-700 text-white rounded-md p-2"
									>
										View
									</button>
								</Link>
								<Link href={`/project/${project.id}/remix`} prefetch={false}>
									<button
										type="button"
										className="bg-emerald-700 text-white rounded-md p-2"
									>
										Remix
									</button>
								</Link>
							</div>
							<div className="flex items-center" data-id="project-prompt-count">
								<span>Prompts: {project.promptCount}</span>
							</div>
						</div>
					</div>
				))}
			</div>
			{buttonVisible ? (
				<div className="mt-2 flex justify-center">
					<button
						type="button"
						className={`rounded-md bg-emerald-700 text-white p-2 min-w-20 ${loading ? "cursor-not-allowed" : ""}`}
						disabled={loading}
						onClick={async () => {
							setLoading(true);
							const params = new URLSearchParams({
								limit: limit.toString(),
								cursor: cursor.toString(),
								userId: options.current.userId ?? "",
							});
							try {
								const data = await fetch(`/api/projects?${params}`).then(
									(res) => res.json(),
								);
								setProjects(
									produce((draft) => {
										draft.push(...data);
									}, projects),
								);
								setCursor(data[data.length - 1].id);
							} catch (e) {
								console.error(e);
							} finally {
								setCursor(cursor + limit);
								setLoading(false);
							}
						}}
					>
						{loading ? (
							<FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
						) : (
							"Load More"
						)}
					</button>
				</div>
			) : (
				<div className="p-2 text-center">End of results</div>
			)}
		</>
	);
}
