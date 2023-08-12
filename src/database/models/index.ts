import { Model, ModelStatic } from "sequelize-typescript";
import {
  SentenceStructureModel,
  SentenceStructureStringModel,
} from "./blather/structure";
import { WordListModel, WordListWordModel } from "./blather/word_list";
import { PromptAlternateSpellingModel, PromptForbiddenWordModel, PromptModel, PromptTailoredWordModel } from "./blather/password";
import { ProjectModel } from "./system/project";
import { UserModel } from "./system/user";

const models: ModelStatic<Model>[] = [
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
