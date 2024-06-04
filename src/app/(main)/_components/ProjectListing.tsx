"use client";
import { ProjectListingAPIOptions } from "@/lib/types/api";
import { ProjectType, ShallowProjectType } from "@/lib/types/project";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { produce } from "immer";
import Link from "next/link";
import { useState, useRef } from "react";

export default function ProjectListing({
  projects: initialProjects,
  options: initialOptions,
}: {
  projects: ShallowProjectType[];
  options?: ProjectListingAPIOptions;
}) {
  const [projects, setProjects] = useState(initialProjects);
  const options = useRef<ProjectListingAPIOptions>(initialOptions ?? {});
  const [cursor, setCursor] = useState(options.current.cursor ?? 0);
  const [loading, setLoading] = useState(false);
  const limit = options.current.limit ?? 10;
  const buttonVisible = projects.length >= cursor;

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[18rem] h-[16rem] rounded-xl p-4 border-2 border-slate-400 flex flex-col"
          >
            <div>
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>{project.ownerId}</p>
            </div>
            <hr />
            <p className="flex-1">{project.description}</p>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Link href={`/project/${project.id}`}>
                  <button className="bg-emerald-700 text-white rounded-md p-2">
                    View
                  </button>
                </Link>
                <Link href={`/project/${project.id}/remix`}>
                  <button className="bg-emerald-700 text-white rounded-md p-2">
                    Remix
                  </button>
                </Link>
              </div>
              <div className="flex items-center">
                <span>Prompts: {project.promptCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {buttonVisible ? (
        <div className="mt-2 flex justify-center">
          <button
            className={`rounded-md bg-emerald-700 text-white p-2 min-w-20 ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const params = new URLSearchParams({
                limit: limit.toString(),
                cursor: cursor.toString(),
                userId: options.current.userId ?? "",
              });
              try {
                const data = await fetch(`/api/projects?${params}`).then(
                  (res) => res.json(),
                );
                setProjects(
                  produce((draft) => {
                    draft.push(...data);
                  }, projects),
                );
                setCursor(data[data.length - 1].id);
              } catch (e) {
                console.error(e);
              } finally {
                setCursor(cursor + limit);
                setLoading(false);
              }
            }}
          >
            {loading ? (
              <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      ) : (
        <div className="p-2 text-center">End of results</div>
      )}
    </>
  );
}
