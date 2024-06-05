"use client";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";

export function LabeledCheckbox(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    inputId: string;
    label: string;
    name?: string;
    tooltip?: string;
  },
) {
  const divProps: Record<string, unknown> = { ...props };
  delete divProps.checked;
  delete divProps.onCheckedChange;
  delete divProps.inputId;
  delete divProps.label;
  delete divProps.name;
  delete divProps.tooltip;
  return (
    <div
      {...(divProps as DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >)}
      className={`flex gap-2 items-center p-2 rounded-md border-slate-400 border-2 bg-slate-200 ${divProps.className ?? ""}`}
    >
      <input
        className="hidden"
        id={props.inputId}
        name={props.name}
        type="checkbox"
        checked={props.checked}
        onChange={() => {
          props.onCheckedChange(!props.checked);
        }}
      />
      <button
        className="flex items-center"
        onClick={() => {
          props.onCheckedChange(!props.checked);
        }}
      >
        <FontAwesomeIcon
          className={`w-6 h-6 ${props.checked ? "text-blue-500" : ""}`}
          icon={props.checked ? faSquareCheck : faSquare}
        />
      </button>
      <div className="flex gap-2 items-center">
        <label htmlFor={props.inputId} className="cursor-pointer">
          {props.label}
        </label>
        {props.tooltip && (
          <Tooltip title={props.tooltip} arrow placement="top">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </Tooltip>
        )}
      </div>
    </div>
  );
}
