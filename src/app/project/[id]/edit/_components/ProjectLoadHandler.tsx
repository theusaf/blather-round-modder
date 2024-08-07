"use client";
import { useProjectStore } from "@/lib/hooks/projectStore";
import type { ProjectType } from "@/lib/types/project";
import { type ReactNode, useEffect } from "react";

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
