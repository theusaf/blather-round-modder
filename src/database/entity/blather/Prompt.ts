import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ProjectEntity } from "../system/Project.js";

@Entity({ name: "prompt" })
export class PromptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  category: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  subcategory: string;

  @Column()
  us: boolean;

  @ManyToOne(() => ProjectEntity, (project) => project.prompts, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  project: Relation<ProjectEntity>;
}
