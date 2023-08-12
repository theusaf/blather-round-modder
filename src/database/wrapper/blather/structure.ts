import { NumberedString, SentenceStructureType } from "@/lib/types";
import {
  SentenceStructureModel,
  SentenceStructureStringModel,
} from "../../models/blather/structure";
import { BaseWrapper } from "../base";
import { FindOptions } from "sequelize";

export class SentenceStructure
  extends BaseWrapper<
    SentenceStructureModel,
    NumberedString
  >
  implements SentenceStructureType
{
  get category(): SentenceStructureType["category"] {
    return this.model.category;
  }
  set category(value: SentenceStructureType["category"]) {
    this.model.category = value;
  }

  get structures(): string[] {
    return this.model.structures.map((structure) => structure.string);
  }
  set structures(value: string[]) {
    throw new Error(
      "Cannot set structures directly, use `setStructures()` instead",
    );
  }

  async setStructures(structures: string[]): Promise<void> {
    const newModels = await Promise.all(
      structures.map((structure) =>
        SentenceStructureStringModel.create({ string: structure }),
      ),
    );
    await this.model.$set("structures", newModels);
  }

  static async create({
    category,
    structures,
  }: SentenceStructureType): Promise<SentenceStructure> {
    const model = await SentenceStructureModel.create({
      category,
      structures: structures.map((structure) => ({ string: structure })),
    });
    return new SentenceStructure(model);
  }

  static async findAll(opts: FindOptions = {}): Promise<SentenceStructure[]> {
    const models = await SentenceStructureModel.findAll({
      include: SentenceStructureStringModel,
      ...opts,
    });
    return models.map((model) => new SentenceStructure(model));
  }
}
