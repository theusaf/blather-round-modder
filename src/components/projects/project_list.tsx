"use client";
import React, { useEffect, useState } from "react";
import { AppEvents } from "../../lib/app/constants";
import { project } from "@prisma/client";
import ProjectCard from "./card";

export default function ProjectList({
  cursor: cursorProp,
}: {
  cursor: number;
}) {
  const [projects, setProjects] = useState<project[]>([]),
    [cursor, setCursor] = useState(cursorProp);

  useEffect(() => {
    async function loadMore() {
      const response = await fetch(`/api/projects?cursor=${cursor}`)
        .then((r) => r.json())
        .catch((e) => {
          console.error(e);
          window.dispatchEvent(
            new CustomEvent(AppEvents.LOAD_MORE_PROJECTS_FAILED),
          );
          return [];
        });

      if (response.length === 0) {
        window.dispatchEvent(
          new CustomEvent(AppEvents.LOAD_MORE_PROJECTS_EMPTY),
        );
        return;
      }
      setProjects(projects.concat(response));
      setCursor(projects[projects.length - 1].id);
      window.dispatchEvent(
        new CustomEvent(AppEvents.LOAD_MORE_PROJECTS_SUCCESS),
      );
    }
    window.addEventListener(AppEvents.LOAD_MORE_PROJECTS, loadMore);
    return () => {
      window.removeEventListener(AppEvents.LOAD_MORE_PROJECTS, loadMore);
    };
  }, [projects, cursor]);

  return <>{projects.map((project) => ProjectCard(project))}</>;
}
