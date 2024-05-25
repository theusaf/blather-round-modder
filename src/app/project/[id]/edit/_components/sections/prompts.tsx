"use client";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import {
  faPlusCircle,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contrastColor } from "contrast-color";

export default function PromptSection() {
  const prompts = useProjectStore((state) => state.prompts);
  const setPrompts = useProjectStore((state) => state.setPrompts);

  return (
    <>
      <h3 className="text-lg font-semibold">Prompts</h3>
      <div className="flex-1">
        <div className="flex gap-2 justify-between">
          <input
            className="w-full p-2 rounded-md border-slate-400 border-2"
            type="text"
            name="search"
            placeholder="Search..."
          />
          <div>
            <button className="flex items-center h-full">
              <FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex gap-2 flex-wrap">
          {prompts.map((prompt, index) => (
            <SectionCard key={index} className="flex gap-2 w-min">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <CategoryLabel category={prompt.category} />
                  <DifficultyLabel difficulty={prompt.difficulty} />
                </div>
                <div className="font-semibold">{prompt.password}</div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center">
                  <FontAwesomeIcon
                    className="w-6 h-6 rounded-md text-white bg-emerald-700 p-2"
                    icon={faPenToSquare}
                  />
                </button>
                <button className="flex items-center">
                  <FontAwesomeIcon
                    className="w-6 h-6  rounded-md text-white bg-red-600 p-2"
                    icon={faTrash}
                  />
                </button>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </>
  );
}

const categoryColors: Record<string, string> = {
  thing: "blue",
  place: "green",
  person: "yellow",
  story: "red",
  response: "purple",
};
function CategoryLabel({ category }: { category: string }) {
  const color = categoryColors[category.toLowerCase()];

  return (
    <div
      style={{
        backgroundColor: color,
        color: contrastColor({
          bgColor: color,
        }),
      }}
      className="p-1 rounded-md text-xs"
    >
      {category}
    </div>
  );
}

const difficultyColors: Record<string, string> = {
  easy: "green",
  medium: "yellow",
  hard: "red",
};
function DifficultyLabel({ difficulty }: { difficulty: string }) {
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
