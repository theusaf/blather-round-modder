import { BaseWrapper } from "../base.js";
import { Prompt } from "../blather/password.js";
import { SentenceStructure } from "../blather/structure.js";
import { WordList } from "../blather/word_list.js";
import { User } from "./user.js";

export class Project extends BaseWrapper {}

Project.tableName = "project";
Project.attributeNames = ["name", "description", "user", "prompts"];
Project.belongsTo({
  attribute: "user",
  foreignKey: "user_id",
  cls: User,
  mapper(model: User) {
    return model.get("username")
  },
});

Project.hasMany({
  attribute: "prompts",
  foreignKey: "project_id",
  cls: Prompt,
  mapper(model: Prompt) {
    return model.toJSON();
  },
});

Project.hasMany({
  attribute: "sentences",
  foreignKey: "project_id",
  cls: SentenceStructure,
  mapper(model: SentenceStructure) {
    return model.toJSON();
  }
});

Project.hasMany({
  attribute: "word_lists",
  foreignKey: "project_id",
  cls: WordList,
  mapper(model: WordList) {
    return model.toJSON();
  }
});
