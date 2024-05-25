"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PromptListing } from "../PromptListing";
import { NumberedString, PromptType } from "@/lib/types/blather";
import { useState } from "react";
import { produce } from "immer";
import { PromptEditModal } from "../PromptEditModal";

export default function PromptSection() {
  const prompts = useProjectStore((state) => state.prompts);
  const setPrompts = useProjectStore((state) => state.setPrompts);
  const getNextId = useProjectStore((state) => state.getNextId);
  const [modal, setModal] = useState<PromptType | null>(null);

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
            <button
              className="flex items-center h-full"
              onClick={() => {
                setModal({
                  category: "thing",
                  subcategory: "",
                  difficulty: "easy",
                  password: "",
                  id: "000",
                  us: false,
                  alternateSpellings: [],
                  forbiddenWords: [],
                  tailoredWords: [],
                });
              }}
            >
              <FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <PromptListing setModal={setModal} />
      </div>
      <PromptEditModal
        initialInput={modal}
        onComplete={(result) => {
          if (result.id === "000") {
            setPrompts(
              produce(prompts, (draft) => {
                draft.push(
                  produce(result, (draft) => {
                    draft.id = getNextId().toString() as NumberedString;
                  }),
                );
              }),
            );
          } else {
            setPrompts(
              produce(prompts, (draft) => {
                const index = draft.findIndex(
                  (prompt) => prompt.id === result.id,
                );
                draft[index] = result;
              }),
            );
          }
          setModal(null);
        }}
        open={modal !== null}
      />
    </>
  );
}
