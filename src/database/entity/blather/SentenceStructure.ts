import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ProjectEntity } from "../system/Project.js";

@Entity({ name: "sentence_structure" })
export class SentenceStructureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  category: string;

  @OneToMany(
    () => SentenceStructureStructureEntity,
    (structure) => structure.sentenceStructure,
    { eager: true },
  )
  structures: SentenceStructureStructureEntity[];

  @ManyToOne(() => ProjectEntity, (project) => project.sentenceStructures, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  project: Relation<ProjectEntity>;
}

@Entity({ name: "sentence_structure_structure" })
export class SentenceStructureStructureEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  value: string;

  @ManyToOne(
    () => SentenceStructureEntity,
    (sentenceStructure) => sentenceStructure.structures,
    {
      onDelete: "CASCADE",
      nullable: false,
      orphanedRowAction: "delete",
    },
  )
  sentenceStructure: Relation<SentenceStructureEntity>;
}
