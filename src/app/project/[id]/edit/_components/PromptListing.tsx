"use client";
import { CategoryLabel } from "@/lib/components/CategoryLabel";
import { DifficultyLabel } from "@/lib/components/DifficultyLabel";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PromptListing() {
  const prompts = useProjectStore((state) => state.prompts);
  const setPrompts = useProjectStore((state) => state.setPrompts);
  return (
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
  );
}
