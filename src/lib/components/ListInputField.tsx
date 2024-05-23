"use client";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from "react";

export function ListInputField(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value: string;
    onValueChange: (value: string) => void;
  }
) {
  const { value, onValueChange } = props;
  const displayItems: ReactNode[] = [];
  let isInList = false;
  let listContent = "";
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "<") {
      isInList = true;
      listContent = "";
    } else if (value[i] === ">" && isInList) {
      isInList = false;
      displayItems.push(
        <span className="text-white bg-blue-500 rounded-md p-1">
          {listContent}
        </span>
      );
    } else {
      if (isInList) {
        listContent += value[i];
      } else {
        if (value[i] === " ") {
          displayItems.push(<span>&nbsp;</span>);
        } else {
          displayItems.push(value[i]);
        }
      }
    }
  }
  if (isInList) {
    displayItems.push("<");
    for (let i = 0; i < listContent.length; i++) {
      displayItems.push(listContent[i]);
    }
  }

  return (
    <div
      {...props}
      className={`border-2 border-slate-400 rounded-md h-8 cursor-text flex items-center gap-2 ${props.className ?? ""}`}
    >
      <div className="flex-1 items-center h-full flex border-slate-400 border-r-2 rounded-md pr-2">
        <input
          className="w-full"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Type here..."
        />
      </div>
      <div className="h-full flex-1 overflow-x-auto whitespace-nowrap rounded-md items-center flex pl-2 border-l-2 border-slate-400">
        {displayItems}
      </div>
    </div>
  );
}
