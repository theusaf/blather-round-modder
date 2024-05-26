"use client";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useProjectStore } from "../hooks/projectStore";
import { Tooltip } from "@mui/material";
import { filterWordList } from "@/app/project/[id]/edit/_util/filterWordList";
import OutsideClickDetector from "./OutsideClickDetector";
import { WordListType } from "../types/blather";

export function WordListTile({
  list,
  open,
  onClose,
  onOpen,
}: {
  list: string;
  open?: boolean;
  onClose?: (selection: string | null) => void;
  onOpen?: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenuOpen(!!open);
  }, [open]);

  function handleClose(selection: string | null) {
    setMenuOpen(false);
    onClose?.(selection);
  }

  return (
    <>
      <Tooltip
        title={<WordListMenu onClose={handleClose} initialValue={list} />}
        open={menuOpen}
        disableFocusListener
        disableHoverListener
      >
        <button
          className="text-white bg-blue-500 rounded-md p-1 cursor-pointer"
          onClick={(event) => {
            onOpen?.(event);
            if (event.defaultPrevented) return;
            setMenuOpen(true);
          }}
          ref={ref}
        >
          {list}
        </button>
      </Tooltip>
    </>
  );
}

function WordListMenu({
  onClose,
  initialValue,
}: {
  onClose: (selection: string | null) => void;
  initialValue: string;
}) {
  const [search, setSearch] = useState(initialValue);
  const wordLists = useProjectStore((state) => state.wordLists);
  const filteredLists = useMemo(() => {
    return wordLists.filter((list) => filterWordList(list, search));
  }, [search]);

  return (
    <OutsideClickDetector
      onClickOutside={() => {
        onClose(null);
      }}
    >
      <div>
        <input
          type="text"
          className="rounded-md p-1 border-2 border-slate-400 w-full mb-2 text-md text-black"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          autoFocus
        />
        <div className="max-h-64 overflow-y-auto">
          <div className="grid grid-flow-row text-md">
            {filteredLists.length === 0 && (
              <p className="text-gray-300">No lists found.</p>
            )}
            {"PLAYERGUESS".includes(search.toUpperCase()) && (
              <WordListMenuItem
                list={
                  {
                    name: "PLAYERGUESS",
                  } as WordListType
                }
                onClose={() => {
                  onClose("PLAYERGUESS");
                }}
              />
            )}
            {filteredLists.map((list) => (
              <WordListMenuItem
                key={list.id}
                list={list}
                onClose={() => {
                  onClose(list.name);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </OutsideClickDetector>
  );
}

function WordListMenuItem({
  list,
  onClose,
}: {
  list: WordListType;
  onClose: () => void;
}) {
  const words = list.words ?? [];

  return (
    <Tooltip
      title={
        <div className="max-h-64 overflow-y-auto">
          {words.length === 0 ? (
            <span>Built-in constant for player responses.</span>
          ) : (
            <div className="text-left">
              <ul>
                {words.map((word, index) => (
                  <li key={index}>{word.word}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
      placement="left"
      arrow
    >
      <div className="flex gap-2 py-1">
        <button
          className="w-full text-left"
          onClick={() => {
            onClose();
          }}
        >
          {list.name}
        </button>
      </div>
    </Tooltip>
  );
}
