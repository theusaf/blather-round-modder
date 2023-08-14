import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  Unique,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./User.js";
import { PromptEntity } from "../blather/Prompt.js";
import { SentenceStructureEntity } from "../blather/SentenceStructure.js";
import { WordListEntity } from "../blather/WordList.js";

@Entity({ name: "project" })
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  lastUpdated: Date;

  @Unique(["name", "owner"])
  @Column({ length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  public: boolean;

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

  @OneToMany(() => WordListEntity, (wordList) => wordList.project)
  wordLists: WordListEntity[];
}
