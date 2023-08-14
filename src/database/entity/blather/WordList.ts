import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  type Relation,
} from "typeorm";
import { ProjectEntity } from "../system/Project.js";

@Entity({ name: "word_list" })
export class WordListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  maxChoices: number;

  @Unique(["name", "project"])
  @Column({ length: 255 })
  name: string;

  @Column()
  optional: boolean;

  @Column({ nullable: true, length: 255 })
  placeholder: string;

  @OneToMany(() => WordListWordEntity, (word) => word.wordList, {
    eager: true,
  })
  words: WordListWordEntity[];

  @ManyToOne(() => ProjectEntity, (project) => project.wordLists, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  project: Relation<ProjectEntity>;
}

@Entity({ name: "word_list_word" })
export class WordListWordEntity extends BaseEntity {
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
  wordList: Relation<WordListEntity>;
}
