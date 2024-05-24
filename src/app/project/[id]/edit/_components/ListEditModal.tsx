"use client";
import { WordListType } from "@/lib/types/blather";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { LabeledInput } from "@/lib/components/LabeledInput";
import { LabeledCheckbox } from "@/lib/components/LabeledCheckbox";

export function ListEditModal({
  listModal,
  onComplete,
  open,
}: {
  listModal: WordListType | null;
  onComplete: (listResult: WordListType) => void;
  open: boolean;
}) {
  const [listData, setListData] = useState<WordListType>(
    listModal ?? {
      amount: "",
      id: "000",
      maxChoices: "",
      name: "",
      optional: false,
      placeholder: "",
      words: [],
    }
  );
  useEffect(() => {
    if (listModal) {
      setListData(listModal);
    }
  }, [listModal]);

  function handleComplete() {
    onComplete(listData);
  }

  return (
    <Modal open={open} onClose={handleComplete}>
      <div className="h-full pointer-events-none flex items-center">
        <div className="flex flex-col items-center flex-1">
          <div className="bg-slate-300 p-4 rounded-md pointer-events-auto w-full md:w-4/5 min-h-[80vh] max-h-screen md:max-h-[90vh] overflow-y-auto">
            <div className="flex gap-2">
              <LabeledInput
                label="Name"
                name="modal-list-name"
                inputId="modal-list-name"
                placeholder="Enter name"
                value={listData.name}
                onValueChange={(value) => {
                  setListData(
                    produce(listData, (draft) => {
                      draft.name = value;
                    })
                  );
                }}
              />
              <div className="flex items-start">
                <button
                  className="bg-emerald-700 rounded-md text-white p-2"
                  onClick={handleComplete}
                >
                  Done
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <LabeledInput
                label="Max Choices"
                name="modal-list-max-choices"
                inputId="modal-list-max-choices"
                placeholder="Enter max choices"
                value={listData.maxChoices}
                type="number"
                onValueChange={(value) => {
                  setListData(
                    produce(listData, (draft) => {
                      draft.maxChoices = value;
                    })
                  );
                }}
              />
              <LabeledInput
                label="Amount"
                name="modal-list-amount"
                inputId="modal-list-amount"
                placeholder="Enter amount"
                value={listData.amount}
                type="number"
                onValueChange={(value) => {
                  setListData(
                    produce(listData, (draft) => {
                      draft.amount = value;
                    })
                  );
                }}
              />
              <LabeledInput
                label="Placeholder"
                name="modal-list-placeholder"
                inputId="modal-list-placeholder"
                placeholder="Enter placeholder"
                value={listData.placeholder}
                onValueChange={(value) => {
                  setListData(
                    produce(listData, (draft) => {
                      draft.placeholder = value;
                    })
                  );
                }}
              />
              <LabeledCheckbox
                checked={listData.optional}
                onCheckedChange={(value) => {
                  setListData(
                    produce(listData, (draft) => {
                      draft.optional = value;
                    })
                  );
                }}
                inputId="modal-list-optional"
                label="Optional"
              />
            </div>
            <hr className="border-black my-2" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
