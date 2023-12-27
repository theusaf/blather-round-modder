import Link from "next/link";
import React from "react";
import { getProject } from "../../../../lib/app/api/projects";
import { notFound } from "next/navigation";
import FontAwesomeIcon from "../../../../components/fontawesome";

export default async function ProjectDownloadPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const project = await getProject(+params.id);
  return (
    <main>
      <h1 className="text-2xl mb-2">
        <Link href={`/projects/${params.id}`} className="underline">
          {project!.name}
        </Link>{" "}
        Download
      </h1>
      <p className="text-lg">
        <strong>Steps for installation:</strong>
      </p>
      <ol className="list-decimal list-inside leading-loose">
        <li>
          Download the archive:{" "}
          <Link href={`/projects/${params.id}/download.zip`} download={true}>
            <button className="bg-blue-700 rounded text-white pr-1">
              <FontAwesomeIcon icon="download"></FontAwesomeIcon>Download
            </button>
          </Link>
        </li>
        <li>Extract the files from the archive.</li>
        <li>
          Navigate to your Blather &rsquo;Round directory.
          <ul className="list-disc list-inside ml-6">
            <li>
              If using Steam, you can access this by going to{" "}
              <span className="bg-neutral-200 rounded p-1">
                <FontAwesomeIcon icon="gear"></FontAwesomeIcon>Jackbox Party
                Pack 7 Settings &gt; Manage &gt; Browse local files
              </span>
              .
            </li>
            <li>
              In the file explorer that shows up, navigate to{" "}
              <span className="bg-neutral-200 rounded p-1">
                <FontAwesomeIcon icon="folder"></FontAwesomeIcon>games /
                BlankyBlank / content
              </span>
              .
            </li>
            <li>
              If you want, make a backup by copying the content in that folder
              somewhere else.
            </li>
          </ul>
        </li>
        <li>
          Move or copy the extracted files into the the content directory.
        </li>
        <li>That&lsquo;s it! Go forth and play!</li>
      </ol>
    </main>
  );
}
