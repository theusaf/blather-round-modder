"use client";
import SectionCard from "@/lib/components/SectionCard";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";

export default function SentenceStructureSection() {
  return (
    <>
      <h3 className="text-lg font-semibold">Sentence Structures</h3>
      <div className="flex flex-col flex-1 gap-2">
        <SectionCard>
          <h4>Thing</h4>
          <div></div>
          <ListInputField />
        </SectionCard>
        <SectionCard>Place</SectionCard>
        <SectionCard>Person</SectionCard>
        <SectionCard>Story</SectionCard>
        <SectionCard>Response</SectionCard>
      </div>
    </>
  );
}

export function ListInputField(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value?: string;
    onChange?: (value: string) => void;
  }
) {
  const [value, setValue] = useState(props.value ?? "");
  const [active, setActive] = useState(false);
  // Based on `displayItems`
  const [cursorPosition, setCursorPosition] = useState(0);

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

  if (active) displayItems.splice(cursorPosition, 0, <CursorBar />);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    try {
      props.onKeyDown?.(event);
    } catch (error) {
      console.error(error);
    }
    if (event.isDefaultPrevented()) return;
    console.log(event.code);
    event.preventDefault();
    switch (event.code) {
      case "ArrowLeft": {
        setCursorPosition(Math.max(cursorPosition - 1, 0));
        break;
      }
      case "ArrowRight": {
        setCursorPosition(
          Math.min(cursorPosition + 1, displayItems.length - 1)
        );
        break;
      }
      case "ArrowUp": {
        setCursorPosition(0);
        break;
      }
      case "ArrowDown": {
        setCursorPosition(displayItems.length - 1);
        break;
      }
      case "Backspace": {
        if (cursorPosition === 0) return;
        setValue(
          value.slice(0, cursorPosition - 1) + value.slice(cursorPosition)
        );
        setCursorPosition(Math.max(cursorPosition - 1, 0));
        break;
      }
      default: {
        if (event.key.length === 1) {
          setValue(
            value.slice(0, cursorPosition) +
              event.key +
              value.slice(cursorPosition)
          );
          setCursorPosition(cursorPosition + 1);
        }
      }
    }
  }

  return (
    <div
      {...props}
      className={`border-2 border-slate-400 rounded-md h-8 cursor-text ${props.className ?? ""}`}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        try {
          props.onFocus?.(e);
        } catch (error) {
          console.error(error);
        }
        if (e.isDefaultPrevented()) return;
        setActive(true);
      }}
      onBlur={(e) => {
        try {
          props.onBlur?.(e);
        } catch (error) {
          console.error(error);
        }
        if (e.isDefaultPrevented()) return;
        setActive(false);
      }}
      tabIndex={0}
    >
      {displayItems}
    </div>
  );
}

export function CursorBar({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setTimeout(() => {
      setVisible((visible) => !visible);
    }, 500);
    return () => clearTimeout(interval);
  });

  return visible ? (
    <span
      className={`bg-black text-white relative align-middle border-black border-l-2 z-20 ${className ?? ""}`}
    />
  ) : (
    <span className="border-transparent border-l-2"></span>
  );
}
