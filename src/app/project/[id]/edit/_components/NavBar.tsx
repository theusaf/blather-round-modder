"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import NavIcon from "@/lib/components/NavIcon";
import { useState } from "react";
import { ProjectSettingsModal } from "./ProjectSettingsModal";
import Link from "next/link";

export default function NavBar() {
  const title = useProjectStore((state) => state.name);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="p-4 bg-cyan-700 text-white flex justify-between">
        <div className="flex gap-4 items-center w-full">
          <NavIcon />
          <div className="flex items-center justify-between flex-1">
            <button
              className="p-2 rounded-md bg-slate-200 font-semibold w-48 md:w-72"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <div className="flex justify-between">
                <span className="p-2 text-black text-ellipsis truncate mr-2">
                  {title ? (
                    title
                  ) : (
                    <span
                      className={`text-slate-700 ${title ? "" : "text-slate-500"}`}
                    >
                      {title ? title : "Enter Title..."}
                    </span>
                  )}
                </span>
                <span className="rounded-md bg-slate-400 p-2">Settings</span>
              </div>
            </button>
            <div className="flex gap-2 font-semibold">
              <button className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700">
                Save
              </button>
              <ExitButton />
            </div>
          </div>
        </div>
      </nav>
      <ProjectSettingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function ExitButton() {
  const id = useProjectStore((state) => state.id);

  return (
    <Link
      href={`/project/${id}`}
      onClick={(event) => {
        if (!confirm("Are you sure you want to exit?")) {
          event.preventDefault();
        }
      }}
    >
      <button className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700">
        Exit
      </button>
    </Link>
  );
}
