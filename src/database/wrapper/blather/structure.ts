import { SentenceStructureType } from "@/lib/blather_types";
import { BaseWrapper } from "../base";
import { Project } from "../system/project";

class SentenceStructureString extends BaseWrapper {}

export class SentenceStructure extends BaseWrapper<SentenceStructureType> {}

// SentenceStructure
SentenceStructure.tableName = "sentence_structure";
SentenceStructure.attributeNames = ["category", "project", "structures"];

SentenceStructure.belongsTo({
  attribute: "project",
  foreignKey: "project_id",
  cls: Project,
  mapper(model: Project) {
    return model.toJSON();
  }
});

SentenceStructure.hasMany({
  attribute: "structures",
  foreignKey: "sentence_structure_id",
  cls: SentenceStructureString,
  mapper(model: SentenceStructureString) {
    return model.get("string");
  }
});

// SentenceStructureString
SentenceStructureString.tableName = "sentence_structure_string";
SentenceStructureString.attributeNames = ["string", "sentenceStructure"];

SentenceStructureString.belongsTo({
  attribute: "sentenceStructure",
  foreignKey: "sentence_structure_id",
  cls: SentenceStructure,
  mapper(model: SentenceStructure) {
    return model.toJSON();
  }
});

