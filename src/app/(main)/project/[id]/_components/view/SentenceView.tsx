"use client";
import { useContext } from "react";
import { ProjectContext } from "./ProjectContext";

export function SentenceView() {
	const project = useContext(ProjectContext);
	if (!project) return;
	const { sentenceStructures } = project;
	return (
		<div className="h-full overflow-auto">
			<h4 className="text-lg font-bold">Sentence Structures</h4>
			<div className="flex flex-col gap-2">
				{sentenceStructures.map((structure) => (
					<div key={structure.id}>
						<h5 className="text-md font-semibold capitalize">
							{structure.category}
						</h5>
						<ol className="list-decimal list-inside">
							{structure.structures.map((sentence, i) => (
								<li key={i}>{sentence}</li>
							))}
						</ol>
					</div>
				))}
			</div>
		</div>
	);
}
