import "server-only";
import type {
	PromptType,
	SentenceStructureType,
	WordListType,
} from "@/lib/types/blather";
import type { QueryOptions } from "@/lib/types/database";
import type { ProjectType } from "@/lib/types/project";
import { getRandomId } from "@/lib/util/getRandomId";
import { Model, executeQuery } from ".";
import { firestore } from "../firebase";

export default class Project extends Model implements ProjectType {
	id: string | null;
	likes: number;
	name: string;
	version: number;
	description: string | null;
	public: boolean;
	ownerId: string | null;
	prompts: PromptType[];
	sentenceStructures: SentenceStructureType[];
	wordLists: WordListType[];

	constructor(data: Partial<ProjectType>) {
		super();
		this.id = data.id ?? null;
		this.likes = data.likes ?? 0;
		this.name = data.name ?? "";
		this.version = data.version ?? 1;
		this.description = data.description ?? null;
		this.public = data.public ?? false;
		this.ownerId = data.ownerId ?? null;
		this.prompts = data.prompts ?? [];
		this.sentenceStructures = data.sentenceStructures ?? [];
		this.wordLists = data.wordLists ?? [];
	}

	toJSON(): ProjectType {
		return {
			id: this.id,
			likes: this.likes,
			name: this.name,
			version: this.version,
			description: this.description,
			public: this.public,
			ownerId: this.ownerId,
			prompts: this.prompts,
			sentenceStructures: this.sentenceStructures,
			wordLists: this.wordLists,
		};
	}

	async save(): Promise<this> {
		if (!this.id) this.id = getRandomId();
		await firestore.collection("projects").doc(this.id).set({
			id: this.id,
			likes: this.likes,
			name: this.name,
			version: this.version,
			description: this.description,
			public: this.public,
			ownerId: this.ownerId,
			prompts: this.prompts,
			sentenceStructures: this.sentenceStructures,
			wordLists: this.wordLists,
		});
		return this;
	}

	async delete(): Promise<void> {
		if (!this.id) return;
		await firestore.collection("projects").doc(this.id).delete();
	}

	static async findById(id: string): Promise<Project> {
		return (await Project.findAll({ where: { id }, limit: 1 }))[0];
	}

	static async findAll(
		options?: QueryOptions<ProjectType>,
	): Promise<Project[]> {
		const query = firestore.collection("projects");
		return (await executeQuery<ProjectType>(query, options)).map((data) => {
			return new Project(data);
		});
	}
}
