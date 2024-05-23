"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import NavIcon from "@/lib/components/NavIcon";

export default function NavBar() {
  const title = useProjectStore((state) => state.name);
  return (
    <nav className="p-4 bg-cyan-700 text-white flex justify-between">
      <div className="flex gap-4 items-center w-full">
        <NavIcon />
        <div className="flex items-center justify-between flex-1">
          <button className="p-2 rounded-md bg-slate-200 font-semibold w-64 md:w-72">
            <div className="flex justify-between">
              <span className="p-2 text-black text-ellipsis truncate mr-2">
                {title ? (
                  title
                ) : (
                  <span className="text-slate-700">Enter Title...</span>
                )}
              </span>
              <span className="rounded-md bg-slate-400 p-2">Settings</span>
            </div>
          </button>
          <div className="flex gap-2 font-semibold">
            <button className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700">
              Save
            </button>
            <button className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700">
              Exit
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
