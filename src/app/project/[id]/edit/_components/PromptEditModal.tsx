"use client";
import { PromptType } from "@/lib/types/blather";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { produce } from "immer";

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

  const onClose = () => {
    onComplete(promptData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="h-full pointer-events-none flex items-center">
        <div className="flex flex-col items-center flex-1">
          <div className="bg-slate-300 p-4 rounded-md pointer-events-auto w-full md:w-4/5 min-h-[80vh] max-h-screen md:max-h-[90vh] overflow-y-auto">
            <div className="flex gap-2 justify-between">
              <LabeledInput
                label="Password"
                name="modal-list-password"
                inputId="modal-list-password"
                placeholder="Enter password"
                value={promptData.password}
                onValueChange={(value) => {
                  setPromptData(
                    produce(promptData, (draft) => {
                      draft.password = value;
                    })
                  );
                }}
              />
              <div className="flex items-start">
                <button
                  className="bg-emerald-700 rounded-md text-white p-2"
                  onClick={onClose}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
