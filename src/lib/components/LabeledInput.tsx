"use client";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function LabeledInput<T extends string | number | string[]>(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    label: string;
    name?: string;
    inputId: string;
    value: T;
    onValueChange: (value: T) => void;
    type?: string;
    placeholder?: string;
  }
) {
  const divProps: Record<string, unknown> = { ...props };
  delete divProps.label;
  delete divProps.name;
  delete divProps.inputId;
  delete divProps.value;
  delete divProps.onValueChange;
  delete divProps.type;
  delete divProps.placeholder;

  return (
    <div
      {...(divProps as DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >)}
      className={`flex-1 flex flex-col ${props.className ?? ""}`}
    >
      <label htmlFor={props.inputId}>{props.label}</label>
      <input
        id={props.inputId}
        name={props.name}
        type={props.type ?? "text"}
        placeholder={props.placeholder}
        className="rounded-md text-lg p-2 border-2 border-slate-400"
        value={props.value}
        onChange={(event) => {
          props.onValueChange(event.currentTarget.value as T);
        }}
      />
    </div>
  );
}
