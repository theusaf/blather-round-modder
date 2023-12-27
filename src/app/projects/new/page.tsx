import React from "react";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <main>
      <h1 className="text-2xl mb-2">New Project</h1>
    </main>
  );
}
