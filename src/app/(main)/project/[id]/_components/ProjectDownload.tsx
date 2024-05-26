"use client";
import { ProjectType } from "@/lib/types/project";
import { useState } from "react";

export function ProjectDownload({ project }: { project: ProjectType }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button className="p-2 rounded-md bg-emerald-700 text-white">
        Download
      </button>
    </>
  );
}
