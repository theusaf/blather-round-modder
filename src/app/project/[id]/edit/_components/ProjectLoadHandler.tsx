"use client";
import { type ReactNode, useEffect } from "react";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { ProjectType } from "@/lib/types/project";

export default function ProjectLoadHandler({
	project,
	children,
}: {
	project: ProjectType;
	children: ReactNode;
}) {
	useEffect(() => {
		useProjectStore.getState().setProject(project);
	}, [project]);
	return children;
}
