"use client";
import { contrastColor } from "contrast-color";

const difficultyColors: Record<string, string> = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};

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
