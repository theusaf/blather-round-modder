import React from "react";
import { getProject } from "../../../lib/app/api/projects";
import { getCurrentUser } from "../../../lib/app/auth";
import { notFound } from "next/navigation";

export default async function ProjectLayout({ children, params }) {
  const project = await getProject(+params.id),
    user = await getCurrentUser();
  if (!project) return notFound();
  if (!project.public && project.ownerUsername !== user?.username) {
    return notFound();
  }
  return <>{children}</>;
}
