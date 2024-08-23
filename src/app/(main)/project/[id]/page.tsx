import "server-only";
import SectionCard from "@/lib/components/SectionCard";
import Project from "@/lib/database/models/project";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "./_components/DeleteButton";
import { ProjectDownload } from "./_components/ProjectDownload";

export async function generateMetadata(
	{
		params: { id },
	}: {
		params: { id: string };
	},
	parent: ResolvingMetadata,
) {
	const project = await Project.findById(id);
	if (!project) return;
	const userDetails = await getUserSession();
	const title =
		!project.public && project.ownerId !== userDetails?.sub
			? "No Permission"
			: project.name;
	return {
		title: `${(await parent).title?.absolute} - ${title}`,
		description: project.description,
	};
}

export default async function ProjectPage({
	params,
}: {
	params: { id: string };
}) {
	const project = await Project.findById(params.id);
	if (!project) return notFound();
	const userDetails = await getUserSession();
	if (!project.public && project.ownerId !== userDetails?.sub) {
		return (
			<div className="p-2">
				<p className="font-extrabold">
					You do not have permission to view this project.
				</p>
				<Link href="/">
					<button
						type="button"
						className="p-2 rounded-md bg-emerald-700 text-white"
					>
						Go Home
					</button>
				</Link>
			</div>
		);
	}

	return (
		<main className="p-2">
			<div className="flex justify-between">
				<div className="flex-1">
					<h1 className="text-2xl font-bold flex gap-2">
						<span>{project.name || "Untitled Project"}</span>
						<span className="text-slate-500 break-keep">
							v{project.version}
						</span>
					</h1>
					<p>{project.description}</p>
				</div>
				<div className="grid grid-cols-1 md:flex gap-2 h-min">
					<ProjectDownload
						project={{
							id: project.id,
							name: project.name,
							version: project.version,
							description: project.description,
							likes: project.likes,
							ownerId: project.ownerId,
							public: project.public,
							sentenceStructures: project.sentenceStructures,
							wordLists: project.wordLists,
							prompts: project.prompts,
						}}
					/>
					{userDetails?.sub === project.ownerId && (
						<Link href={`/project/${params.id}/edit`} className="w-full">
							<button
								type="button"
								className="p-2 rounded-md bg-emerald-700 text-white w-full"
							>
								Edit
							</button>
						</Link>
					)}
					<Link
						href={`/project/${params.id}/remix`}
						prefetch={false}
						className="w-full"
					>
						<button
							type="button"
							className="p-2 rounded-md bg-emerald-700 text-white w-full"
						>
							Remix
						</button>
					</Link>
					{userDetails?.sub === project.ownerId && (
						<DeleteButton project={project.toJSON()} />
					)}
				</div>
			</div>
			<hr className="my-2" />
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex flex-col gap-2 flex-1">
					<SectionCard>
						<h2 className="text-xl font-bold">Sentence Structures</h2>
						<div className="flex flex-col gap-2">
							{project.sentenceStructures.map((sentenceStructure) => (
								<div
									key={sentenceStructure.id}
									className="border-slate-300 border-2 rounded-md p-2"
								>
									<h3 className="text-lg font-semibold">
										Category: {sentenceStructure.category}
									</h3>
									<ul className="list-inside list-disc">
										{sentenceStructure.structures.map((structure, i) => (
											<li key={`${project.id}-${i}`}>{structure}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</SectionCard>
					<SectionCard>
						<h2 className="text-xl font-bold">Word Lists</h2>
						<div className="flex flex-col gap-2">
							{project.wordLists.map((wordList) => (
								<div
									key={wordList.id}
									className="border-slate-300 border-2 rounded-md p-2"
								>
									<h3 className="text-lg font-semibold">{wordList.name}</h3>
									<details>
										<summary>View Words</summary>
										<ul className="list-inside list-disc">
											{wordList.words.map((word, i) => (
												<li key={`${wordList.id}-${i}`}>{word.word}</li>
											))}
										</ul>
									</details>
								</div>
							))}
						</div>
					</SectionCard>
				</div>
				<SectionCard className="flex-1">
					<h2 className="text-xl font-bold">Prompts</h2>
					<div className="flex flex-col gap-2">
						{project.prompts.map((prompt) => (
							<div
								key={prompt.id}
								className="border-slate-300 border-2 rounded-md p-2"
							>
								<h3 className="text-lg font-semibold">{prompt.password}</h3>
								<p>Difficulty: {prompt.difficulty}</p>
								<p>Forbidden Words: {prompt.forbiddenWords.join(", ")}</p>
								<p>Category: {prompt.category}</p>
								<p>US-Centric: {prompt.us ? "Yes" : "No"}</p>
								<details>
									<summary>View Tailored Words</summary>
									<ul className="list-inside list-disc">
										{prompt.tailoredWords.map((tailoredWord, i) => (
											<li key={`${prompt.id}-${i}`}>
												{tailoredWord.list} - {tailoredWord.word}
											</li>
										))}
									</ul>
								</details>
							</div>
						))}
					</div>
				</SectionCard>
			</div>
		</main>
	);
}
