import { Model, ModelStatic } from "sequelize-typescript";
import { SentenceStructureModel, SentenceStructureStringModel } from "./structure";
import { WordListModel, WordListWordModel } from "./word_list";

const models: ModelStatic<Model>[] = [WordListModel, WordListWordModel, SentenceStructureModel, SentenceStructureStringModel];
export default models;
