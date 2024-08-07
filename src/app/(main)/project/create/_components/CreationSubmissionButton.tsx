"use client";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

export function CreationSubmissionButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="p-2 rounded-md bg-emerald-700 text-white shadow-sm shadow-black"
			disabled={pending}
		>
			{pending && (
				<span className="inline-flex items-center p-2">
					<FontAwesomeIcon className="w-4 h-4" icon={faCircleNotch} spin />
				</span>
			)}
			{pending ? "Creating..." : "Create!"}
		</button>
	);
}
