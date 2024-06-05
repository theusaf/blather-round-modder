"use client";
import { contrastColor } from "contrast-color";

const difficultyColors: Record<string, string> = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};

/**
 * A label for the difficulty of a prompt.
 *
 * @param difficulty The difficulty of the prompt.
 */
export function DifficultyLabel({ difficulty }: { difficulty: string }) {
  const color = difficultyColors[difficulty.toLowerCase()];

  return (
    <div
      style={{
        backgroundColor: color,
        color: contrastColor({ bgColor: color }),
      }}
      className="p-1 rounded-md text-xs"
    >
      {difficulty}
    </div>
  );
}
