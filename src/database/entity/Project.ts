import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  Unique,
} from "typeorm";
import { UserEntity } from "./User.js";

@Entity({ name: "project" })
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["name", "owner"])
  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.projects, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  owner: Relation<UserEntity>;
}
