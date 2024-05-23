"use client";
import { ListInputField } from "@/lib/components/ListInputField";
import SectionCard from "@/lib/components/SectionCard";

export default function SentenceStructureSection() {
  return (
    <>
      <h3 className="text-lg font-semibold">Sentence Structures</h3>
      <div className="flex flex-col flex-1 gap-2">
        <SectionCard>
          <h4>Thing</h4>
          <div></div>
          <ListInputField value="hi" onChange={() => {}} />
        </SectionCard>
        <SectionCard>Place</SectionCard>
        <SectionCard>Person</SectionCard>
        <SectionCard>Story</SectionCard>
        <SectionCard>Response</SectionCard>
      </div>
    </>
  );
}
