import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  type Relation,
} from "typeorm";
import { ProjectEntity } from "../system/Project";
import { BaseEntityWrapper } from "../base_wrapper";

@Entity({ name: "word_list" })
@Unique(["project", "name"])
export class WordListEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: "integer",
  })
  amount: number | null;

  @Column({
    nullable: true,
    type: "integer",
  })
  maxChoices: number | null;

  @Column({ length: 255 })
  name: string;

  @Column()
  optional: boolean;

  @Column({
    nullable: true,
    length: 255,
    type: "varchar",
  })
  placeholder: string | null;

  @OneToMany(() => WordListWordEntity, (word) => word.wordList, {
    eager: true,
    cascade: true,
  })
  words: WordListWordEntity[];

  @ManyToOne(() => ProjectEntity, (project) => project.wordLists, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  project: Promise<Relation<ProjectEntity>>;
}

@Entity({ name: "word_list_word" })
@Unique(["wordList", "word"])
export class WordListWordEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alwaysChoose: boolean;

  @Column({ length: 255 })
  word: string;

  @ManyToOne(() => WordListEntity, (wordList) => wordList.words, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  wordList: Promise<Relation<WordListEntity>>;
}
