import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProjectModel } from "./project.js";

@Table
export class UserModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING(64))
  username: string;

  @Column(DataType.STRING(64))
  password: string;

  @HasMany(() => ProjectModel)
  projects: ProjectModel[];
}
