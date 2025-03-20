"use client";
import type { ProjectType } from "@/lib/types/project";
import { ProjectContext } from "./ProjectContext";
import { PromptView } from "./PromptView";
import { TryItView } from "./TryItView";

export function ProjectDataView({ project }: { project: ProjectType }) {
	return (
		<ProjectContext value={project}>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-3">
				<TryItView />
				<div>
					<h4 className="font-bold text-lg">Content</h4>
					<div className="grid gap-2">
						<PromptView />
					</div>
				</div>
			</div>
		</ProjectContext>
	);
}
