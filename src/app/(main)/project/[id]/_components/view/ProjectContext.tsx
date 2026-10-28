import { createContext } from "react";
import type { ProjectType } from "@/lib/types/project";

export const ProjectContext = createContext<ProjectType | null>(null);
