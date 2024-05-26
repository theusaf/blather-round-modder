"use client";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import { WordListMenu } from "./WordListMenu";

export function WordListTile({
  list,
  open,
  onClose,
  onOpen,
  useValue = true,
}: {
  list: string;
  open?: boolean;
  onClose?: (selection: string | null) => void;
  onOpen?: (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void;
  useValue?: boolean;
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
        title={
          <WordListMenu
            onClose={handleClose}
            initialValue={useValue ? list : ""}
          />
        }
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
