"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PromptListing } from "../PromptListing";

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
        <PromptListing />
      </div>
    </>
  );
}
