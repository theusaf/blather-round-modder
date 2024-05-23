"use client";
import { ListInputField } from "@/lib/components/ListInputField";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { Category, NumberedString } from "@/lib/types/blather";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import { useState } from "react";

export default function SentenceStructureSection() {
  return (
    <>
      <h3 className="text-lg font-semibold">Sentence Structures</h3>
      <div className="flex flex-col flex-1 gap-2">
        <StructureSection category="thing" />
        <StructureSection category="place" />
        <StructureSection category="person" />
        <StructureSection category="story" />
        <StructureSection category="response" />
      </div>
    </>
  );
}

function StructureSection({ category }: { category: Category | "response" }) {
  const structures = useProjectStore((state) => state.sentenceStructures);
  const filteredStructures =
    structures.find((structure) => structure.category === category)
      ?.structures ?? [];
  const setStructures = useProjectStore((state) => state.setSentenceStructures);
  const [newValue, setNewValue] = useState("");

  return (
    <SectionCard>
      <h4 className="capitalize">{category}</h4>
      <div className="flex flex-col gap-2">
        {filteredStructures.map((structure, index) => (
          <ListInputField
            key={index}
            value={structure}
            onValueChange={(value) => {
              setStructures(
                produce(structures, (draft) => {
                  draft.find(
                    (structure) => structure.category === category
                  )!.structures[index] = value;
                })
              );
            }}
          />
        ))}
      </div>
      <hr className="my-2" />
      <div className="flex gap-2">
        <ListInputField
          className="flex-1"
          value={newValue}
          onValueChange={(value) => {
            setNewValue(value);
          }}
        />
        <button
          className="flex items-center"
          onClick={() => {
            setStructures(
              produce(structures, (draft) => {
                const structure = draft.find(
                  (structure) => structure.category === category
                );
                if (!newValue) return;
                if (structure) {
                  structure.structures.push(newValue);
                } else {
                  draft.push({
                    category,
                    structures: [newValue],
                    id: structures.length.toString() as NumberedString,
                  });
                }
              })
            );
            setNewValue("");
          }}
        >
          <FontAwesomeIcon className="w-6 h-6" icon={faPlusCircle} />
        </button>
      </div>
    </SectionCard>
  );
}
