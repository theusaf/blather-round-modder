"use client";

import { saveProject } from "@/lib/actions/saveProject";
import { useProjectStore } from "@/lib/hooks/projectStore";
import { faCheck, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function SaveButton() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <>
      {saved && (
        <div className="hidden md:flex items-center gap-2 text-slate-300">
          <FontAwesomeIcon icon={faCheck} />
          <span>Saved</span>
        </div>
      )}
      <button
        className="p-2 rounded-md bg-slate-200 text-black shadow-sm shadow-slate-700"
        onClick={async () => {
          setSaving(true);
          setSaved(false);
          await saveProject(useProjectStore.getState().getProject());
          setSaving(false);
          setSaved(true);
        }}
        disabled={saving}
      >
        {saving ? (
          <div className="flex items-center gap-2 px-2 md:px-0">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span className="hidden md:block">Saving...</span>
          </div>
        ) : (
          "Save"
        )}
      </button>
    </>
  );
}
