import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "@/lib/types";

@Table
export class SentenceStructureStringModel extends Model {
  @Column(DataType.TEXT)
  string: string;

  @BelongsTo(() => SentenceStructureModel)
  structure: SentenceStructureModel;
}

@Table
export class SentenceStructureModel extends Model {
  @Column(
    DataType.ENUM<Category | "response">(
      "person",
      "place",
      "thing",
      "story",
      "response",
    ),
  )
  category: Category | "response";

  @HasMany(() => SentenceStructureStringModel)
  structures: SentenceStructureStringModel[];
}
