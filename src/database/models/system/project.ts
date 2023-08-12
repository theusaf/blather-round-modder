import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.js";
import { PromptModel } from "../blather/password.js";
import { SentenceStructureModel } from "../blather/structure.js";
import { WordListModel } from "../blather/word_list.js";

@Table
export class ProjectModel extends Model {
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description: string;

  @BelongsTo(() => UserModel)
  user: ReturnType<() => UserModel>;

  @HasMany(() => PromptModel)
  prompts: PromptModel[];

  @HasMany(() => SentenceStructureModel)
  sentenceStructures: SentenceStructureModel[];

  @HasMany(() => WordListModel)
  wordLists: WordListModel[];
}
