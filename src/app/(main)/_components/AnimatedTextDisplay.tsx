import { stripIndent } from "common-tags";
import type { Step } from "./AnimatedHomeSection";
import { GuessesList } from "./GuessesList";

const colors = ["white", "green", "blue", "orange", "red"];

export function AnimatedTextDisplay({
	step,
	width,
	height,
}: {
	step: Step;
	width: number;
	height: number;
}) {
	const guesses = [...step.guesses];
	const clues = [...step.clues];
	guesses.reverse();
	clues.reverse();
	return (
		<div className="w-full h-full relative overflow-hidden">
			<svg
				role="img"
				aria-label="sun"
				className="w-full h-full absolute top-0 left-0"
				viewBox="0 0 750 500"
			>
				<ellipse
					cx="620"
					cy="560"
					rx="400"
					ry="300"
					className="fill-emerald-800"
				/>
				<circle cx="80" cy="375" r="50" className="fill-yellow-500" />
				<text
					x="40"
					y="450"
					textAnchor="middle"
					className="fill-blue-500 text-lg font-semibold -rotate-6"
				>
					THING
				</text>
			</svg>
			<GuessesList guesses={guesses} width={width} height={height} />
			<div className="absolute top-0 left-0">
				{clues.map((clue, i) => (
					<div
						key={i}
						style={{
							transformOrigin: "center",
							transform: stripIndent`translate(
                ${width * 0.1 - width * 0.025 * Math.log(i + 1)}px,
                ${height / 2 - height * 0.4 * Math.log(Math.max(1, 0.75 * (i + 1))) - height * 0.2}px
              ) rotate(${-Math.round(5 + 0.5 * (i + 1) ** 2)}deg)`,
							zIndex: 100 - i,
						}}
						className="relative"
					>
						<div
							className="p-2 font-bold capitalize inline-block"
							style={{
								backgroundColor: colors[i % colors.length],
								fontSize: `${Math.max(1, 2 - 0.75 * Math.log(i + 1))}rem`,
							}}
						>
							{clue}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
