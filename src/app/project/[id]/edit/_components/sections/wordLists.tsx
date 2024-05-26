"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { NumberedString, WordListType } from "@/lib/types/blather";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { ListEditModal } from "../ListEditModal";
import { produce } from "immer";
import { WordListing } from "../WordListing";
import { filterWordList } from "../../_util/filterWordList";

export default function WordListSection() {
  const wordLists = useProjectStore((state) => state.wordLists);
  const setWordLists = useProjectStore((state) => state.setWordLists);
  const getNextId = useProjectStore((state) => state.getNextId);
  const [listModal, setListModal] = useState<WordListType | null>(null);
  const [search, setSearch] = useState("");
  const filteredWordLists = useMemo(
    () => wordLists.filter((list) => filterWordList(list, search)),
    [wordLists, search],
  );

  return (
    <>
      <h3 className="text-lg font-semibold">Word Lists</h3>
      <div className="flex-1">
        <div className="flex gap-2 justify-between">
          <div className="flex-1">
            <input
              className="w-full p-2 rounded-md border-slate-400 border-2"
              type="text"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        <WordListing setModal={setListModal} wordLists={filteredWordLists} />
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
              }),
            );
          } else {
            // update list item
            setWordLists(
              produce(wordLists, (draft) => {
                const index = draft.findIndex((item) => item.id === result.id);
                draft[index] = result;
              }),
            );
          }
          setListModal(null);
        }}
        open={listModal !== null}
      />
    </>
  );
}
