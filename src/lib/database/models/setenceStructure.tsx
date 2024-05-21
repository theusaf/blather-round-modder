import {
  Category,
  NumberedString,
  SentenceStructureType,
} from "@/lib/types/blather";
import { Model } from "firebase-admin/machine-learning";
import Project from "./project";

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

  async save(): Promise<this> {
    throw new Error("Method not implemented.");
  }

  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
