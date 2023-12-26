import React from "react";

export default function UserPage({
  params,
}: {
  params: Record<string, string>;
}) {
  return (
    <main>
      <h1 className="text-2xl mb-2">{params.id}&rsquo;s profile</h1>
    </main>
  );
}
