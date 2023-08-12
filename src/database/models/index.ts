import { Model, ModelStatic } from "sequelize-typescript";
import {
  SentenceStructureModel,
  SentenceStructureStringModel,
} from "./structure";
import { WordListModel, WordListWordModel } from "./word_list";
import { PromptAlternateSpellingModel, PromptForbiddenWordModel, PromptModel, PromptTailoredWordModel } from "./password";

const models: ModelStatic<Model>[] = [
  WordListModel,
  WordListWordModel,
  SentenceStructureModel,
  SentenceStructureStringModel,
  PromptAlternateSpellingModel,
  PromptForbiddenWordModel,
  PromptTailoredWordModel,
  PromptModel,
];
export default models;
