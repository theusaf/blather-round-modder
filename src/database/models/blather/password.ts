import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category, Difficulty } from "@/lib/types";
import { ProjectModel } from "../system/project";

@Table
export class PromptTailoredWordModel extends Model {
  @Column(DataType.STRING)
  list: string;

  @Column(DataType.STRING)
  word: string;

  @BelongsTo(() => PromptModel)
  prompt: PromptModel;
}

@Table
export class PromptAlternateSpellingModel extends Model {
  @Column(DataType.STRING)
  spelling: string;

  @BelongsTo(() => PromptModel)
  prompt: PromptModel;
}

@Table
export class PromptForbiddenWordModel extends Model {
  @Column(DataType.STRING)
  word: string;

  @BelongsTo(() => PromptModel)
  prompt: PromptModel;
}

@Table
export class PromptModel extends Model {
  @Column(DataType.ENUM<Category>("person", "place", "thing", "story"))
  category: string;

  @Column(DataType.ENUM<Difficulty>("easy", "medium", "hard"))
  difficulty: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  subcategory: string;

  @Column(DataType.BOOLEAN)
  us: boolean;

  @HasMany(() => PromptTailoredWordModel)
  tailoredWords: PromptTailoredWordModel[];

  @HasMany(() => PromptAlternateSpellingModel)
  alternateSpellings: PromptAlternateSpellingModel[];

  @HasMany(() => PromptForbiddenWordModel)
  forbiddenWords: PromptForbiddenWordModel[];

  @BelongsToMany(() => ProjectModel, () => ProjectModel)
  projects: ProjectModel[];
}
