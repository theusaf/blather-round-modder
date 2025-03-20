import type { ProjectType } from "@/lib/types/project";
import { createContext } from "react";

export const ProjectContext = createContext<ProjectType | null>(null);
