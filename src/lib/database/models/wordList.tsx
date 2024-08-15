import "server-only";
import type {
	NumberedString,
	OptionalNumberedString,
	WordListType,
} from "@/lib/types/blather";
import type { QueryOptions } from "@/lib/types/database";
import type { ProjectType } from "@/lib/types/project";
import { Model } from "firebase-admin/machine-learning";
import type Project from "./project";

export default class WordList extends Model implements WordListType {
	amount: OptionalNumberedString;
	id: NumberedString;
	maxChoices: OptionalNumberedString;
	name: string;
	optional: boolean;
	placeholder: string;
	words: { alwaysChoose: boolean; word: string }[];
	project: Project;

	constructor(data: Partial<WordListType>, project: Project) {
		super();
		this.amount = data.amount ?? "";
		this.id = data.id ?? "000";
		this.maxChoices = data.maxChoices ?? "";
		this.name = data.name ?? "";
		this.optional = data.optional ?? false;
		this.placeholder = data.placeholder ?? "";
		this.words = data.words ?? [];
		this.project = project;
	}

	async save(): Promise<this> {
		throw new Error("Method not implemented.");
	}

	async delete(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	static async findById(id: string): Promise<Project> {
		throw new Error("Method not implemented.");
	}

	static async findAll(
		options?: QueryOptions<ProjectType>,
	): Promise<Project[]> {
		throw new Error("Method not implemented.");
	}
}
