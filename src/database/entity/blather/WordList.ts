import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  type Relation,
} from "typeorm";
import { ProjectEntity } from "../system/Project.js";
import { BaseEntityWrapper } from "../base_wrapper.js";

@Entity({ name: "word_list" })
export class WordListEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  amount: number | null;

  @Column({ nullable: true })
  maxChoices: number | null;

  @Unique(["name", "project"])
  @Column({ length: 255 })
  name: string;

  @Column()
  optional: boolean;

  @Column({ nullable: true, length: 255 })
  placeholder: string | null;

  @OneToMany(() => WordListWordEntity, (word) => word.wordList, {
    eager: true,
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
export class WordListWordEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  alwaysChoose: boolean;

  @Unique(["word", "wordList"])
  @Column({ length: 255 })
  word: string;

  @ManyToOne(() => WordListEntity, (wordList) => wordList.words, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  wordList: Promise<Relation<WordListEntity>>;
}
