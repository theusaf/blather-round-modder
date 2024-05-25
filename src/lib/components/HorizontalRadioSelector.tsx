"use client";
import { Tab, TabList, Tabs } from "@mui/joy";

export function HorizontalRadioSelector({
  values,
  value,
  onChange,
  label,
}: {
  values: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div>
      <p>{label}</p>
      <Tabs
        className="w-min rounded-md p-1 border-slate-400 border-2"
        onChange={(_, value) => {
          if (!value) return;
          onChange(value as string);
        }}
        value={value}
      >
        <TabList disableUnderline>
          {values.map((value, index) => (
            <Tab key={index} disableIndicator value={value}>
              {value}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </div>
  );
}
