"use client";

import { deleteProject } from "@/lib/actions/deleteProject";
import CenteredModal from "@/lib/components/CenteredModal";
import { LabeledInput } from "@/lib/components/LabeledInput";
import type { ProjectType } from "@/lib/types/project";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startProgress } from "next-nprogress-bar";
import { useState } from "react";

export function DeleteButton({ project }: { project: ProjectType }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);

	const doesMatch = value === project.name;

	return (
		<>
			<button
				type="button"
				className="p-2 rounded-md bg-red-500 text-white w-full"
				onClick={() => setModalOpen(true)}
			>
				Delete
			</button>
			<CenteredModal
				className="!min-h-0"
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			>
				<h4 className="text-lg font-semibold">
					Are you sure you want to delete this project?
				</h4>
				<p>
					To do so, enter &quot;
					<span className="font-bold">{project.name}</span>&quot; below.
				</p>
				<LabeledInput
					className={!doesMatch ? "*:border-red-500" : ""}
					label="Project Name"
					placeholder="Project Name"
					inputId="modal-delete-project-name"
					value={value}
					onValueChange={(data) => setValue(data)}
				/>
				<button
					type="button"
					className="p-2 rounded-md bg-red-500 disabled:cursor-not-allowed disabled:text-black disabled:bg-gray-300 text-white shadow-md shadow-black mt-2 min-w-20"
					disabled={!doesMatch}
					onClick={() => {
						if (loading) return;
						startProgress();
						setLoading(true);
						deleteProject(project.id!)
							.then(() => {
								setLoading(false);
								setModalOpen(false);
							})
							.catch((e) => {
								console.error(e);
							})
							.finally(() => {
								setLoading(false);
								setModalOpen(false);
							});
					}}
				>
					{loading ? (
						<FontAwesomeIcon className="animate-spin" icon={faCircleNotch} />
					) : (
						"Delete"
					)}
				</button>
			</CenteredModal>
		</>
	);
}
