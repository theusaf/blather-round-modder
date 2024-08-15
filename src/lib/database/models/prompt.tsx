import "server-only";
import type {
	Category,
	Difficulty,
	NumberedString,
	PromptType,
} from "@/lib/types/blather";
import type { QueryOptions } from "@/lib/types/database";
import { Model } from ".";
import type Project from "./project";

export default class Prompt extends Model implements PromptType {
	alternateSpellings: string[];
	category: Category;
	difficulty: Difficulty;
	forbiddenWords: string[];
	id: NumberedString;
	password: string;
	subcategory: string;
	tailoredWords: { list: `<${string}>`; word: string }[];
	us: boolean;
	project: Project;

	constructor(data: Partial<PromptType>, project: Project) {
		super();
		this.alternateSpellings = data.alternateSpellings ?? [];
		this.category = data.category ?? "thing";
		this.difficulty = data.difficulty ?? "easy";
		this.forbiddenWords = data.forbiddenWords ?? [];
		this.id = data.id ?? "000";
		this.password = data.password ?? "";
		this.subcategory = data.subcategory ?? "";
		this.tailoredWords = data.tailoredWords ?? [];
		this.us = data.us ?? false;
		this.project = project;
	}

	toJSON(): PromptType {
		return {
			alternateSpellings: this.alternateSpellings,
			category: this.category,
			difficulty: this.difficulty,
			forbiddenWords: this.forbiddenWords,
			id: this.id,
			password: this.password,
			subcategory: this.subcategory,
			tailoredWords: this.tailoredWords,
			us: this.us,
		};
	}

	save(): Promise<this> {
		throw new Error("Method not implemented.");
	}

	delete(): Promise<void> {
		throw new Error("Method not implemented.");
	}

	static async findById(id: string): Promise<Project> {
		throw new Error("Method not implemented.");
	}

	static async findAll(
		queryOptions?: QueryOptions<PromptType>,
	): Promise<Project[]> {
		throw new Error("Method not implemented.");
	}
}
