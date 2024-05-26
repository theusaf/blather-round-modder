"use client";
import { Tooltip } from "@mui/material";
import { WordListType } from "../types/blather";


export function WordListMenuItem({
  list, onClose,
}: {
  list: WordListType;
  onClose: () => void;
}) {
  const words = list.words ?? [];

  return (
    <Tooltip
      title={<div className="max-h-64 overflow-y-auto">
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
      </div>}
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
