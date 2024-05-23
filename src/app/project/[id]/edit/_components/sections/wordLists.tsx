"use client";
import SectionCard from "@/lib/components/SectionCard";
import { useProjectStore } from "@/lib/hooks/projectStore";
import {
  faPenToSquare,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WordListSection() {
  const wordLists = useProjectStore((state) => state.wordLists);
  const setWordLists = useProjectStore((state) => state.setWordLists);

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
            <button className="flex items-center h-full">
              <FontAwesomeIcon className="w-8 h-8" icon={faPlusCircle} />
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <section className="flex flex-wrap">
          {wordLists.map((wordList, index) => (
            <SectionCard key={index} className="w-72">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-md font-semibold">{wordList.name}</h4>
                  <div>Words: {wordList.words.length}</div>
                </div>
                <div className="flex gap-2 items-center text-white">
                  <button className="flex rounded-md p-2 bg-emerald-700">
                    <FontAwesomeIcon className="w-6 h-6" icon={faPenToSquare} />
                  </button>
                  <button className="flex rounded-md p-2 bg-red-600">
                    <FontAwesomeIcon className="w-6 h-6" icon={faTrash} />
                  </button>
                </div>
              </div>
            </SectionCard>
          ))}
        </section>
      </div>
    </>
  );
}
