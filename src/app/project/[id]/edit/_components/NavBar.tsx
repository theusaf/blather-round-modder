"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import NavIcon from "@/lib/components/NavIcon";
import { useState } from "react";
import { ProjectSettingsModal } from "./ProjectSettingsModal";
import { ExitButton } from "./ExitButton";
import { SaveButton } from "./SaveButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchModal } from "./SearchModal";
import type { PromptType, WordListType } from "@/lib/types/blather";
import type { Modal } from "../_util/modal";

export default function NavBar({
	setModal: setPageModal,
}: {
	setModal: (value: [Modal, PromptType | WordListType | null]) => void;
}) {
	const title = useProjectStore((state) => state.name);
	const [settingsModalOpen, setSettingsModalOpen] = useState(false);
	const [searchModalOpen, setSearchModalOpen] = useState(false);

	return (
		<>
			<SearchModal
				setModal={setPageModal}
				open={searchModalOpen}
				onOpenChange={(open) => setSearchModalOpen(open)}
			/>
			<nav className="p-4 bg-cyan-700 text-white flex justify-between">
				<div className="flex gap-4 items-center w-full">
					<NavIcon />
					<div className="flex items-center justify-between flex-1">
						<div className="flex gap-2">
							<button
								type="button"
								className="p-2 rounded-md bg-slate-200 font-semibold md:w-72"
								onClick={() => {
									setSettingsModalOpen(true);
								}}
							>
								<div className="flex justify-between">
									<span className="hidden md:inline p-2 text-black text-ellipsis truncate mr-2">
										{title ? (
											title
										) : (
											<span
												className={`text-slate-700 ${title ? "" : "text-slate-500"}`}
											>
												{title ? title : "Enter Title..."}
											</span>
										)}
									</span>
									<span className="rounded-md bg-slate-400 p-2">
										<FontAwesomeIcon icon={faCog} className="block md:hidden" />
										<span className="hidden md:inline">Settings</span>
									</span>
								</div>
							</button>
							<button
								type="button"
								className="p-2 rounded-md bg-slate-200 font-semibold md:w-52"
								onClick={() => setSearchModalOpen(true)}
							>
								<div className="flex justify-between p-2 bg-slate-400 rounded-md">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faSearch} />
										<span className="hidden md:inline underline">Search</span>
									</div>
									<div className="p-2 bg-slate-200 rounded-md md:block hidden text-black text-xs">
										CTRL + K
									</div>
								</div>
							</button>
						</div>
						<div className="flex gap-2 font-semibold">
							<SaveButton />
							<ExitButton />
						</div>
					</div>
				</div>
			</nav>
			<ProjectSettingsModal
				open={settingsModalOpen}
				onClose={() => setSettingsModalOpen(false)}
			/>
		</>
	);
}
