import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { WordListTile } from "./WordListTile";

/**
 * A styled input field that allows for the input of lists.
 *
 * @param value The current value of the list input.
 * @param onValueChange The function to call when the value changes.
 */
export function ListInputField(
	props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
		value: string;
		onValueChange: (value: string) => void;
	},
) {
	const { value, onValueChange } = props;
	const displayItems: ReactNode[] = [];
	let isInList = false;
	let listContent = "";
	for (let i = 0; i < value.length; i++) {
		if (value[i] === "<") {
			isInList = true;
			listContent = "";
		} else if (value[i] === ">" && isInList) {
			isInList = false;

			const currentStartPosition = i - listContent.length - 1;
			displayItems.push(
				<WordListTile
					key={i}
					list={listContent}
					onClose={(item) => {
						if (!item) return;
						onValueChange(
							value.slice(0, currentStartPosition + 1) + item + value.slice(i),
						);
					}}
				/>,
			);
		} else {
			if (isInList) {
				listContent += value[i];
			} else {
				if (value[i] === " ") {
					displayItems.push(<span key={i}>&nbsp;</span>);
				} else {
					displayItems.push(value[i]);
				}
			}
		}
	}
	if (isInList) {
		displayItems.push("<");
		for (let i = 0; i < listContent.length; i++) {
			displayItems.push(listContent[i]);
		}
	}

	const divProps: Record<string, unknown> = { ...props };
	delete divProps.value;
	delete divProps.onValueChange;

	return (
		<div
			{...divProps}
			className={`border-2 border-slate-400 rounded-md h-14 cursor-text grid overflow-x-auto grid-cols-2 items-center gap-2 ${props.className ?? ""}`}
		>
			<div className="items-center h-full flex border-slate-400 border-r-2 rounded-md p-2">
				<input
					className="w-full"
					value={value}
					onChange={(event) => onValueChange(event.target.value)}
					placeholder="Type here..."
				/>
			</div>
			<div className="h-full whitespace-nowrap rounded-md items-center flex border-l-2 border-slate-400 p-2">
				{displayItems}
			</div>
		</div>
	);
}
