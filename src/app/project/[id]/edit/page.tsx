"use client";
import { useState } from "react";
import { ProjectTabMenu } from "./_components/ProjectTabMenu";

export default function ProjectEditPage() {
  const [activeTab, setActiveTab] = useState("prompts");

  return (
    <div className="flex flex-col md:flex-row h-full">
      <ProjectTabMenu
        activeTab={activeTab}
        onTabSelect={(tab) => setActiveTab(tab)}
      />
      <section></section>
    </div>
  );
}
