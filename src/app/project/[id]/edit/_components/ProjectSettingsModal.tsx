"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { LabeledCheckbox } from "@/lib/components/LabeledCheckbox";
import CenteredModal from "@/lib/components/CenteredModal";

export function ProjectSettingsModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const title = useProjectStore((state) => state.name);
	const setTitle = useProjectStore((state) => state.setName);
	const description = useProjectStore((state) => state.description);
	const setDescription = useProjectStore((state) => state.setDescription);
	const isPublic = useProjectStore((state) => state.public);
	const setIsPublic = useProjectStore((state) => state.setPublic);

	return (
		<CenteredModal open={open} onClose={onClose} className=" min-h-0">
			<div className="flex gap-2">
				<LabeledInput
					label="Title"
					name="modal-title"
					inputId="modal-title"
					placeholder="Enter title"
					className="w-0"
					value={title}
					onValueChange={(value) => setTitle(value)}
				/>
				<div className="flex items-end">
					<LabeledCheckbox
						checked={isPublic}
						onCheckedChange={(checked) => {
							setIsPublic(checked);
						}}
						label="Public"
						inputId="modal-project-public"
					/>
				</div>
				<div className="flex items-start">
					<button
						type="button"
						className="bg-emerald-700 rounded-md text-white p-2"
						onClick={() => onClose()}
					>
						Done
					</button>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-2 mt-2">
				<div className="flex-1">
					<div>
						<label htmlFor="modal-project-description">Description</label>
						<textarea
							id="modal-project-description resize-y"
							className="w-full p-2 rounded-md bg-white border-2 border-slate-400"
							value={description ?? ""}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</CenteredModal>
	);
}
