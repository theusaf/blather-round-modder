import {
  Column,
  Table,
  Model,
  DataType,
  AllowNull,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { ProjectModel } from "../system/project.js";

@Table
export class WordListWordModel extends Model {
  @Column(DataType.STRING)
  word: string;

  @Column(DataType.BOOLEAN)
  alwaysChoose: boolean;

  @BelongsTo(() => WordListModel)
  wordList: ReturnType<() => WordListModel>;
}

@Table
export class WordListModel extends Model {
  @AllowNull
  @Column(DataType.INTEGER)
  amount: number | null;

  @AllowNull
  @Column(DataType.INTEGER)
  maxChoices: number | null;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.BOOLEAN)
  optional: boolean;

  @AllowNull
  @Column(DataType.STRING)
  placeholder: string | null;

  @HasMany(() => WordListWordModel)
  words: WordListWordModel[];

  @BelongsToMany(() => ProjectModel, () => ProjectModel)
  projects: ProjectModel[];
}
