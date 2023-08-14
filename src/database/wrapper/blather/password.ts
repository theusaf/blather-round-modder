import { PromptType } from "@/lib/blather_types.js";
import { BaseWrapper } from "../base.js";
import { Project } from "../system/project.js";

class PromptAlternateSpelling extends BaseWrapper {}

class PromptForbiddenWord extends BaseWrapper {}

class PromptTailoredWord extends BaseWrapper {}

export class Prompt extends BaseWrapper<PromptType> {}

// Prompt
Prompt.tableName = "password";
Prompt.attributeNames = [
  "category",
  "difficulty",
  "password",
  "subcategory",
  "us",
  "alternateSpellings",
  "forbiddenWords",
  "tailoredWords",
  "project",
];

Prompt.belongsTo({
  attribute: "project",
  foreignKey: "project_id",
  cls: Project,
  mapper(model: Project) {
    return model.toJSON();
  }
});

Prompt.hasMany({
  attribute: "alternateSpellings",
  foreignKey: "password_id",
  cls: PromptAlternateSpelling,
  mapper(model: PromptAlternateSpelling) {
    return model.get("spelling");
  }
});

Prompt.hasMany({
  attribute: "forbiddenWords",
  foreignKey: "password_id",
  cls: PromptForbiddenWord,
  mapper(model: PromptForbiddenWord) {
    return model.get("word");
  }
});

Prompt.hasMany({
  attribute: "tailoredWords",
  foreignKey: "password_id",
  cls: PromptTailoredWord,
  mapper(model: PromptTailoredWord) {
    return model.toJSON();
  }
});

// PromptAlternateSpelling
PromptAlternateSpelling.tableName = "password_spellings";
PromptAlternateSpelling.attributeNames = ["prompt", "spelling"];

PromptAlternateSpelling.belongsTo({
  attribute: "prompt",
  foreignKey: "password_id",
  cls: Prompt,
  mapper(model: Prompt) {
    return model.toJSON();
  }
});

// PromptForbiddenWord
PromptForbiddenWord.tableName = "password_forbidden_word";
PromptForbiddenWord.attributeNames = ["prompt", "word"];

PromptForbiddenWord.belongsTo({
  attribute: "prompt",
  foreignKey: "password_id",
  cls: Prompt,
  mapper(model: Prompt) {
    return model.toJSON();
  }
});

// PromptTailoredWord
PromptTailoredWord.tableName = "password_tailored_word";
PromptTailoredWord.attributeNames = ["list", "word", "prompt"];

PromptTailoredWord.belongsTo({
  attribute: "prompt",
  foreignKey: "password_id",
  cls: Prompt,
  mapper(model: Prompt) {
    return model.toJSON();
  }
});
