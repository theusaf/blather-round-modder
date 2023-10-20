import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  OneToMany,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { UserEntity } from "./User";
import { PromptEntity } from "../blather/Prompt";
import { SentenceStructureEntity } from "../blather/SentenceStructure";
import { WordListEntity } from "../blather/WordList";
import { BaseEntityWrapper } from "../base_wrapper";

@Entity({ name: "project" })
@Unique(["owner", "name"])
export class ProjectEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  lastUpdated: Date;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: false })
  public: boolean;

  @ManyToOne(() => UserEntity, (user) => user.projects, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  owner: Relation<UserEntity>;

  @OneToMany(() => PromptEntity, (prompt) => prompt.project, {
    cascade: true,
  })
  prompts: PromptEntity[];

  @OneToMany(() => SentenceStructureEntity, (structure) => structure.project, {
    cascade: true,
  })
  sentenceStructures: SentenceStructureEntity[];

  @OneToMany(() => WordListEntity, (wordList) => wordList.project, {
    cascade: true,
  })
  wordLists: WordListEntity[];
}
