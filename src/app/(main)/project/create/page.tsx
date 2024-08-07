import SectionCard from "@/lib/components/SectionCard";
import { CreationForm } from "./_components/CreationForm";
import Link from "next/link";
import { getUserSession } from "@/lib/util/auth";
import type { ResolvingMetadata } from "next";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata) {
	return {
		title: `${(await parent).title?.absolute} - Create Project`,
	};
}

export default async function CreateProjectPage() {
	const userDetails = await getUserSession();

	return (
		<main className="p-2">
			<h1 className="text-2xl font-bold">Create New Project</h1>
			{userDetails ? (
				<div>
					<SectionCard className="md:w-4/5 m-auto mt-6 p-4">
						<CreationForm />
					</SectionCard>
				</div>
			) : (
				<p>
					You must be{" "}
					<Link href="/login" className="underline">
						logged in
					</Link>{" "}
					to create a project.
				</p>
			)}
		</main>
	);
}
