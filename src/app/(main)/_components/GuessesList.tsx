import { stripIndent } from "common-tags";

export function GuessesList({
	guesses,
	width,
	height,
}: {
	guesses: string[];
	width: number;
	height: number;
}) {
	return (
		<div className="absolute top-0 left-0">
			{guesses.map((guess, i) => (
				<div
					key={i}
					style={{
						transformOrigin: "center",
						transform: stripIndent`translate(
                ${width - i * (width * 0.08) - width * 0.025 * Math.log(i + 1) - width * 0.05}px,
                ${height / 2 + height * 0.007 * (i + 1) ** 2 + height * 0.2}px
              ) rotate(${Math.round(40 / Math.max(2 * Math.log(i + 1), 1))}deg)`,
					}}
					className="text-right inline-block relative"
				>
					<div
						style={{
							opacity: 0.5 + 0.5 * 0.9 ** i,
						}}
						className="absolute right-0 bottom-0 whitespace-nowrap min-w-48 p-2 bg-orange-300 font-semibold text-lg uppercase text-center"
					>
						{guess}
					</div>
				</div>
			))}
		</div>
	);
}
