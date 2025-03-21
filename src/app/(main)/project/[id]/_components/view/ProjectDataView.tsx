"use client";
import type { ProjectType } from "@/lib/types/project";
import { ProjectContext } from "./ProjectContext";
import { PromptView } from "./PromptView";
import { SentenceView } from "./SentenceView";
import { TryItView } from "./TryItView";
import { WordListView } from "./WordListView";

export function ProjectDataView({ project }: { project: ProjectType }) {
	return (
		<ProjectContext value={project}>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-3">
				<TryItView />
				<div className="h-[40rem] flex flex-col">
					<div className="grid gap-2 flex-1 min-h-0">
						<PromptView />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 p-2">
				<div className="h-[40rem] flex flex-col">
					<div className="grid gap-2 flex-1 min-h-0">
						<SentenceView />
					</div>
				</div>
				<div className="h-[40rem] flex flex-col">
					<div className="grid gap-2 flex-1 min-h-0">
						<WordListView />
					</div>
				</div>
			</div>
		</ProjectContext>
	);
}
