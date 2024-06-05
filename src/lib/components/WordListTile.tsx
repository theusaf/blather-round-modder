"use client";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/material";
import { WordListMenu } from "./WordListMenu";

/**
 * A button that displays a word list and opens a list menu when clicked.
 *
 * @param list The current list value.
 * @param open Whether the menu is open.
 * @param onClose The function to call when the menu is closed.
 * @param onOpen The function to call when the menu is opened.
 * @param useValue Whether to use the value of the list. If set, this is a controlled component.
 */
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
