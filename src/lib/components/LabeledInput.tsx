"use client";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * A styled input with a label and optional tooltip.
 *
 * @param label The label for the input.
 * @param name The name of the input.
 * @param inputId The ID of the input.
 * @param value The current value of the input.
 * @param onValueChange The function to call when the value changes.
 * @param type The type of the input.
 * @param placeholder The placeholder text for the input.
 * @param tooltip The tooltip/help text for the input.
 */
export function LabeledInput<T extends string | number | string[]>(
	props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
		label: string;
		name?: string;
		inputId: string;
		value: T;
		onValueChange: (value: T) => void;
		type?: string;
		placeholder?: string;
		tooltip?: string;
	},
) {
	const divProps: Record<string, unknown> = { ...props };
	delete divProps.label;
	delete divProps.name;
	delete divProps.inputId;
	delete divProps.value;
	delete divProps.onValueChange;
	delete divProps.type;
	delete divProps.placeholder;
	delete divProps.tooltip;

	return (
		<div
			{...(divProps as DetailedHTMLProps<
				HTMLAttributes<HTMLDivElement>,
				HTMLDivElement
			>)}
			className={`flex-1 flex flex-col ${props.className ?? ""}`}
		>
			<div className="flex gap-2 items-center">
				<label htmlFor={props.inputId}>{props.label}</label>
				{props.tooltip && (
					<Tooltip title={props.tooltip} arrow placement="top">
						<FontAwesomeIcon icon={faQuestionCircle} />
					</Tooltip>
				)}
			</div>
			<input
				id={props.inputId}
				name={props.name}
				type={props.type ?? "text"}
				placeholder={props.placeholder}
				className="rounded-md text-lg p-2 border-2 border-slate-400"
				value={props.value}
				onChange={(event) => {
					props.onValueChange(event.currentTarget.value as T);
				}}
			/>
		</div>
	);
}
