import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  Unique,
  OneToMany,
} from "typeorm";
import { UserEntity } from "./User.js";
import { PromptEntity } from "../blather/Prompt.js";
import { SentenceStructureEntity } from "../blather/SentenceStructure.js";

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

  @OneToMany(() => PromptEntity, (prompt) => prompt.project)
  prompts: PromptEntity[];

  @OneToMany(() => SentenceStructureEntity, (structure) => structure.project)
  sentenceStructures: SentenceStructureEntity[];
}
