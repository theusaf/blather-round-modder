import { Step } from "./AnimatedHomeSection";
import { GuessesList } from "./GuessesList";

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
        className="w-full h-full absolute top-0 left-0"
        viewBox={`0 0 750 500`}
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
          <div key={i}>
            <div>{clue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
