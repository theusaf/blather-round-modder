import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function SectionCard(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={`border-slate-300 border-2 rounded-md shadow-sm shadow-black p-2 ${props.className ?? ""}`}
    />
  );
}
