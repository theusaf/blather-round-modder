"use client";
import { useState } from "react";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export function TailoredWordEditSection({
  onSubmit,
}: {
  onSubmit: (word: string, list: string) => void;
}) {
  const [word, setWord] = useState("");
  const [list, setList] = useState("");

  return (
    <div>
      <h4 className="text-lg font-semibold">Tailored Word</h4>
      <div className="flex gap-2">
        <LabeledInput
          label="Add Tailored Word"
          name="modal-list-tailored-word"
          inputId="modal-list-tailored-word"
          placeholder="Enter tailored word"
          value={word}
          className="w-0"
          onValueChange={(value) => {
            setWord(value);
          }}
        />
        <LabeledInput
          label="List to Add to"
          name="modal-list-tailored-list"
          inputId="modal-list-tailored-list"
          placeholder="Enter list"
          value={list}
          className="w-0"
          onValueChange={(value) => {
            setList(value);
          }}
        />
        <button
          className="flex items-end mb-2"
          onClick={() => {
            if (word.trim() === "" || list.trim() === "") return;
            onSubmit(word, list);
            setWord("");
            setList("");
          }}
        >
          <FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
        </button>
      </div>
    </div>
  );
}
