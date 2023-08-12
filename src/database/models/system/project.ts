import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user";
import { PromptModel } from "../blather/password";
import { SentenceStructureModel } from "../blather/structure";
import { WordListModel } from "../blather/word_list";

@Table
export class ProjectModel extends Model {
  @Column(DataType.STRING)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  description: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => PromptModel)
  prompts: PromptModel[];

  @HasMany(() => SentenceStructureModel)
  sentenceStructures: SentenceStructureModel[];

  @HasMany(() => WordListModel)
  wordLists: WordListModel[];
}
