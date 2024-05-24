"use client";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { NumberedString, WordListType } from "@/lib/types/blather";
import {
  faPenToSquare,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ListEditModal } from "../ListEditModal";
import { produce } from "immer";

export default function WordListSection() {
  const wordLists = useProjectStore((state) => state.wordLists);
  const setWordLists = useProjectStore((state) => state.setWordLists);
  const getNextId = useProjectStore((state) => state.getNextId);
  const [listModal, setListModal] = useState<WordListType | null>(null);

  return (
    <>
      <h3 className="text-lg font-semibold">Word Lists</h3>
      <div className="flex-1">
        <div className="flex gap-2 justify-between">
          <div className="flex-1 p-2 rounded-md border-slate-400 border-2">
            <input
              className="w-full"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div>
            <button
              className="flex items-center h-full"
              onClick={() => {
                setListModal({
                  amount: "",
                  id: "000",
                  maxChoices: "",
                  name: "",
                  optional: false,
                  placeholder: "",
                  words: [],
                });
              }}
            >
              <FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <section className="flex flex-wrap gap-2">
          {wordLists.map((wordList, index) => (
            <SectionCard key={index} className="w-72">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-md font-semibold">{wordList.name}</h4>
                  <div>Words: {wordList.words.length}</div>
                </div>
                <div className="flex gap-2 items-center text-white">
                  <button
                    className="flex rounded-md p-2 bg-emerald-700"
                    onClick={() => {
                      setListModal(wordList);
                    }}
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faPenToSquare} />
                  </button>
                  <button
                    className="flex rounded-md p-2 bg-red-600"
                    onClick={() => {
                      setWordLists(
                        produce(wordLists, (draft) => {
                          const index = draft.findIndex(
                            (item) => item.id === wordList.id
                          );
                          draft.splice(index, 1);
                        })
                      );
                    }}
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
                  </button>
                </div>
              </div>
            </SectionCard>
          ))}
        </section>
      </div>
      <ListEditModal
        listModal={listModal}
        onComplete={(result) => {
          if (result.id === "000") {
            // new list item
            setWordLists(
              produce(wordLists, (draft) => {
                const finalResult = produce(result, (draft) => {
                  draft.id = getNextId().toString() as NumberedString;
                });
                draft.push(finalResult);
              })
            );
          } else {
            // update list item
            setWordLists(
              produce(wordLists, (draft) => {
                const index = draft.findIndex((item) => item.id === result.id);
                draft[index] = result;
              })
            );
          }
          setListModal(null);
        }}
        open={listModal !== null}
      />
    </>
  );
}
