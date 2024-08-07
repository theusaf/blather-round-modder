import "server-only";
import type {
	Category,
	NumberedString,
	SentenceStructureType,
} from "@/lib/types/blather";
import { Model } from "firebase-admin/machine-learning";
import type Project from "./project";
import type { QueryOptions } from "@/lib/types/database";

export default class SentenceStructure
	extends Model
	implements SentenceStructureType
{
	id: NumberedString;
	category: Category | "response";
	structures: string[];
	project: Project;

	constructor(data: Partial<SentenceStructureType>, project: Project) {
		super();
		this.id = data.id ?? "000";
		this.category = data.category ?? "response";
		this.structures = data.structures ?? [];
		this.project = project;
	}

	toJSON(): SentenceStructureType {
		return {
			id: this.id,
			category: this.category,
			structures: this.structures,
		};
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
		queryOptions?: QueryOptions<SentenceStructureType>,
	): Promise<Project[]> {
		throw new Error("Method not implemented.");
	}
}
