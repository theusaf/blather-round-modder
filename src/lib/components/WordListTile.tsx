"use client";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useProjectStore } from "../hooks/projectStore";
import { Tooltip } from "@mui/material";
import { filterWordList } from "@/app/project/[id]/edit/_util/filterWordList";
import OutsideClickDetector from "./OutsideClickDetector";

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
  const ref = useRef<HTMLSpanElement>(null);
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
        title={<WordListMenu onClose={handleClose} />}
        open={menuOpen}
        disableFocusListener
        disableHoverListener
      >
        <span
          className="text-white bg-blue-500 rounded-md p-1 cursor-pointer"
          onClick={(event) => {
            onOpen?.(event);
            if (event.defaultPrevented) return;
            setMenuOpen(true);
          }}
          ref={ref}
        >
          {list}
        </span>
      </Tooltip>
    </>
  );
}

function WordListMenu({
  onClose,
}: {
  onClose: (selection: string | null) => void;
}) {
  const [search, setSearch] = useState("");
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
        />
        <div className="max-h-64 overflow-y-auto">
          <div className="grid grid-flow-row gap-2 text-md">
            {filteredLists.length === 0 && (
              <p className="text-gray-300">No lists found.</p>
            )}
            {filteredLists.map((list) => (
              <div key={list.id} className="flex gap-2">
                <span
                  className="w-full cursor-pointer"
                  onClick={() => {
                    onClose(list.name);
                  }}
                >
                  {list.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickDetector>
  );
}
