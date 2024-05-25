"use client";
import { PromptType } from "@/lib/types/blather";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";

export function PromptEditModal({
  initialInput,
  onComplete,
  open,
}: {
  initialInput: PromptType | null;
  onComplete: (result: PromptType) => void;
  open: boolean;
}) {
  const [promptData, setPromptData] = useState<PromptType>(
    initialInput ?? {
      category: "thing",
      subcategory: "",
      difficulty: "easy",
      password: "",
      id: "000",
      us: false,
      alternateSpellings: [],
      forbiddenWords: [],
      tailoredWords: [],
    }
  );
  useEffect(() => {
    if (initialInput) {
      setPromptData(initialInput);
    }
  }, [initialInput]);

  return (
    <Modal open={open} onClose={() => onComplete(promptData)}>
      <div className="h-full pointer-events-none flex items-center">
        <div className="flex flex-col items-center flex-1">
          <div className="bg-slate-300 p-4 rounded-md pointer-events-auto w-full md:w-4/5 min-h-[80vh] max-h-screen md:max-h-[90vh] overflow-y-auto"></div>
        </div>
      </div>
    </Modal>
  );
}
