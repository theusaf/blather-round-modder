import { Model, ModelCtor } from "sequelize-typescript";
import {
  SentenceStructureModel,
  SentenceStructureStringModel,
} from "./blather/structure.js";
import { WordListModel, WordListWordModel } from "./blather/word_list.js";
import { PromptAlternateSpellingModel, PromptForbiddenWordModel, PromptModel, PromptTailoredWordModel } from "./blather/password.js";
import { ProjectModel } from "./system/project.js";
import { UserModel } from "./system/user.js";

const models: ModelCtor<Model>[] = [
  WordListModel,
  WordListWordModel,
  SentenceStructureModel,
  SentenceStructureStringModel,
  PromptAlternateSpellingModel,
  PromptForbiddenWordModel,
  PromptTailoredWordModel,
  PromptModel,

  ProjectModel,
  UserModel,
];
export default models;
