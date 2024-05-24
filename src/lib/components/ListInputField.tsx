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
        <span key={i} className="text-white bg-blue-500 rounded-md p-1">
          {listContent}
        </span>
      );
    } else {
      if (isInList) {
        listContent += value[i];
      } else {
        if (value[i] === " ") {
          displayItems.push(<span key={i}>&nbsp;</span>);
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

  const divProps: Record<string, unknown> = { ...props };
  delete divProps.value;
  delete divProps.onValueChange;

  return (
    <div
      {...divProps}
      className={`border-2 border-slate-400 rounded-md h-10 cursor-text flex items-center gap-2 ${props.className ?? ""}`}
    >
      <div className="flex-1 items-center h-full flex border-slate-400 border-r-2 rounded-md p-2">
        <input
          className="w-full"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Type here..."
        />
      </div>
      <div className="h-full flex-1 overflow-x-auto whitespace-nowrap rounded-md items-center flex border-l-2 border-slate-400 p-2">
        {displayItems}
      </div>
    </div>
  );
}
