"use client";

import { saveProject } from "@/lib/actions/saveProject";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faCheck, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";

export function SaveButton() {
	const [saved, setSaved] = useState(false);
	const [saving, setSaving] = useState(false);
	const [savedTime, setSavedTime] = useState<number | null>(null);

	const save = useCallback(async () => {
		setSaving(true);
		setSaved(false);
		try {
			await saveProject(useProjectStore.getState().getProject());
			useProjectStore
				.getState()
				.setVersion(useProjectStore.getState().version + 1);
			setSavedTime(Date.now());
		} catch (e) {
			console.error(e);
			setSavedTime(-1);
		} finally {
			setSaving(false);
			setSaved(true);
		}
	}, []);

	useEffect(() => {
		const saveHandler = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "s") {
				event.preventDefault();
				save();
			}
		};
		window.addEventListener("keydown", saveHandler);
		return () => {
			window.removeEventListener("keydown", saveHandler);
		};
	}, [save]);

	return (
		<>
			{saved && (
				<div className="hidden md:flex items-center gap-2 text-slate-300">
					<FontAwesomeIcon icon={faCheck} />
					<span>
						Saved
						{savedTime ? (
							<span>
								{savedTime !== -1
									? ` at ${new Date(savedTime).toLocaleTimeString()}`
									: "Failed to save."}
							</span>
						) : (
							""
						)}
					</span>
				</div>
			)}
			<button
				type="button"
				className="p-2 rounded-md bg-slate-200 text-black shadow-xs shadow-slate-700"
				onClick={save}
				disabled={saving}
			>
				{saving ? (
					<div className="flex items-center gap-2 px-2 md:px-0">
						<FontAwesomeIcon icon={faCircleNotch} spin />
						<span className="hidden md:block">Saving...</span>
					</div>
				) : (
					"Save"
				)}
			</button>
		</>
	);
}
