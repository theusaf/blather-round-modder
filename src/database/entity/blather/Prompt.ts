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

@Entity({ name: "prompt" })
@Unique(["project", "password"])
export class PromptEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  category: string;

  @Column({ length: 16 })
  difficulty: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    length: 255,
    nullable: true,
    type: "varchar",
  })
  subcategory: string | null;

  @Column()
  us: boolean;

  @ManyToOne(() => ProjectEntity, (project) => project.prompts, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  project: Promise<Relation<ProjectEntity>>;

  @OneToMany(() => PromptSpellingEntity, (spelling) => spelling.prompt, {
    eager: true,
    cascade: true,
  })
  alternateSpellings: PromptSpellingEntity[];

  @OneToMany(() => PromptForbiddenWordEntity, (word) => word.prompt, {
    eager: true,
    cascade: true,
  })
  forbiddenWords: PromptForbiddenWordEntity[];

  @OneToMany(
    () => PromptTailoredWordEntity,
    (tailoredWord) => tailoredWord.prompt,
    { eager: true, cascade: true },
  )
  tailoredWords: PromptTailoredWordEntity[];
}

@Entity({ name: "prompt_alternate_spelling" })
@Unique(["prompt", "value"])
export class PromptSpellingEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  value: string;

  @ManyToOne(() => PromptEntity, (prompt) => prompt.alternateSpellings, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  prompt: Promise<Relation<PromptEntity>>;
}

@Entity({ name: "prompt_forbidden_word" })
@Unique(["prompt", "value"])
export class PromptForbiddenWordEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  value: string;

  @ManyToOne(() => PromptEntity, (prompt) => prompt.forbiddenWords, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  prompt: Promise<Relation<PromptEntity>>;
}

@Entity({ name: "prompt_tailored_word" })
export class PromptTailoredWordEntity extends BaseEntityWrapper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  list: string;

  @Column({ length: 255 })
  word: string;

  @ManyToOne(() => PromptEntity, (prompt) => prompt.tailoredWords, {
    onDelete: "CASCADE",
    nullable: false,
    orphanedRowAction: "delete",
  })
  prompt: Promise<Relation<PromptEntity>>;
}
