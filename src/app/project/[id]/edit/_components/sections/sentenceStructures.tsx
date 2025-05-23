"use client";
import { ListInputField } from "@/lib/components/ListInputField";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { Category, NumberedString } from "@/lib/types/blather";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import { useState } from "react";

export default function SentenceStructureSection() {
	return (
		<>
			<h3 className="text-lg font-semibold">Sentence Structures</h3>
			<div className="flex flex-col flex-1 gap-2">
				<StructureSection category="thing" />
				<StructureSection category="place" />
				<StructureSection category="person" />
				<StructureSection category="story" />
				<StructureSection category="response" />
			</div>
		</>
	);
}

export function StructureSection({
	category,
}: {
	category: Category | "response";
}) {
	const structures = useProjectStore((state) => state.sentenceStructures);
	const filteredStructures =
		structures.find((structure) => structure.category === category)
			?.structures ?? [];
	const setStructures = useProjectStore((state) => state.setSentenceStructures);
	const [newValue, setNewValue] = useState("");
	const getNextId = useProjectStore((state) => state.getNextId);

	return (
		<SectionCard data-id="sentence-container" data-value={category}>
			<h4 className="capitalize">{category}</h4>
			<div className="flex flex-col gap-2">
				{filteredStructures.length === 0 && (
					<p className="text-gray-500">No structures added yet.</p>
				)}
				{filteredStructures.map((structure, index) => (
					<div key={index} className="flex gap-2">
						<ListInputField
							className="flex-1"
							value={structure}
							onValueChange={(value) => {
								setStructures(
									produce(structures, (draft) => {
										draft.find(
											(structure) => structure.category === category,
										)!.structures[index] = value;
									}),
								);
							}}
							data-id="sentence-input-container"
						/>
						<button
							type="button"
							onClick={() => {
								setStructures(
									produce(structures, (draft) => {
										draft
											.find((structure) => structure.category === category)!
											.structures.splice(index, 1);
									}),
								);
							}}
						>
							<FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
						</button>
					</div>
				))}
			</div>
			<hr className="my-2" />
			<div className="flex gap-2">
				<ListInputField
					className="flex-1"
					value={newValue}
					onValueChange={(value) => {
						setNewValue(value);
					}}
				/>
				<button
					type="button"
					className="flex items-center"
					onClick={() => {
						setStructures(
							produce(structures, (draft) => {
								const structure = draft.find(
									(structure) => structure.category === category,
								);
								if (!newValue) return;
								if (structure) {
									structure.structures.push(newValue);
								} else {
									draft.push({
										category,
										structures: [newValue],
										id: getNextId().toString() as NumberedString,
									});
								}
							}),
						);
						setNewValue("");
					}}
				>
					<FontAwesomeIcon className="w-6 h-6" icon={faPlusCircle} />
				</button>
			</div>
		</SectionCard>
	);
}
