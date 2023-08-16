import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateProject1692144964462 implements MigrationInterface {
  name = "RecreateProject1692144964462";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "emailVerified" boolean NOT NULL DEFAULT (0))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" text NOT NULL, "sentenceStructureId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "description" text, "public" boolean NOT NULL DEFAULT (0), "ownerUsername" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "difficulty" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_tailored_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "list" varchar(255) NOT NULL, "word" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_d97e781ab4ccb8bcacb950b2c7f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sentence_structure"("id", "category", "projectId") SELECT "id", "category", "projectId" FROM "sentence_structure"`,
    );
    await queryRunner.query(`DROP TABLE "sentence_structure"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sentence_structure" RENAME TO "sentence_structure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_sentence_structure_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" text NOT NULL, "sentenceStructureId" integer NOT NULL, CONSTRAINT "FK_943430e9779e01d7f9f2dd903ce" FOREIGN KEY ("sentenceStructureId") REFERENCES "sentence_structure" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sentence_structure_structure"("id", "value", "sentenceStructureId") SELECT "id", "value", "sentenceStructureId" FROM "sentence_structure_structure"`,
    );
    await queryRunner.query(`DROP TABLE "sentence_structure_structure"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sentence_structure_structure" RENAME TO "sentence_structure_structure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "FK_e9de89fa383f2d8830a50a1dbd0" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "word_list"`,
    );
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list" RENAME TO "word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL, CONSTRAINT "FK_c4cdf9f5f320836faa971d92bba" FOREIGN KEY ("wordListId") REFERENCES "word_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list_word"("id", "alwaysChoose", "word", "wordListId") SELECT "id", "alwaysChoose", "word", "wordListId" FROM "word_list_word"`,
    );
    await queryRunner.query(`DROP TABLE "word_list_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list_word" RENAME TO "word_list_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "description" text, "public" boolean NOT NULL DEFAULT (0), "ownerUsername" varchar NOT NULL, CONSTRAINT "FK_93499dba47b930b3c31e91d04eb" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_project"("id", "lastUpdated", "name", "description", "public", "ownerUsername") SELECT "id", "lastUpdated", "name", "description", "public", "ownerUsername" FROM "project"`,
    );
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_project" RENAME TO "project"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "difficulty" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt"("id", "category", "difficulty", "password", "subcategory", "us", "projectId") SELECT "id", "category", "difficulty", "password", "subcategory", "us", "projectId" FROM "prompt"`,
    );
    await queryRunner.query(`DROP TABLE "prompt"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt" RENAME TO "prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "FK_71136536e715a32504d3b272aa8" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_alternate_spelling"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_alternate_spelling"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_alternate_spelling"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_alternate_spelling" RENAME TO "prompt_alternate_spelling"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "FK_869c1a631803ad784349b6ce458" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_forbidden_word"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_forbidden_word"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_forbidden_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_forbidden_word" RENAME TO "prompt_forbidden_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_tailored_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "list" varchar(255) NOT NULL, "word" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "FK_954a46f5bd4b39c43786391b5b9" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_tailored_word"("id", "list", "word", "promptId") SELECT "id", "list", "word", "promptId" FROM "prompt_tailored_word"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_tailored_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_tailored_word" RENAME TO "prompt_tailored_word"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prompt_tailored_word" RENAME TO "temporary_prompt_tailored_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_tailored_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "list" varchar(255) NOT NULL, "word" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt_tailored_word"("id", "list", "word", "promptId") SELECT "id", "list", "word", "promptId" FROM "temporary_prompt_tailored_word"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt_tailored_word"`);
    await queryRunner.query(
      `ALTER TABLE "prompt_forbidden_word" RENAME TO "temporary_prompt_forbidden_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt_forbidden_word"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "temporary_prompt_forbidden_word"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt_forbidden_word"`);
    await queryRunner.query(
      `ALTER TABLE "prompt_alternate_spelling" RENAME TO "temporary_prompt_alternate_spelling"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt_alternate_spelling"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "temporary_prompt_alternate_spelling"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt_alternate_spelling"`);
    await queryRunner.query(
      `ALTER TABLE "prompt" RENAME TO "temporary_prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "difficulty" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt"("id", "category", "difficulty", "password", "subcategory", "us", "projectId") SELECT "id", "category", "difficulty", "password", "subcategory", "us", "projectId" FROM "temporary_prompt"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt"`);
    await queryRunner.query(
      `ALTER TABLE "project" RENAME TO "temporary_project"`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "description" text, "public" boolean NOT NULL DEFAULT (0), "ownerUsername" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "project"("id", "lastUpdated", "name", "description", "public", "ownerUsername") SELECT "id", "lastUpdated", "name", "description", "public", "ownerUsername" FROM "temporary_project"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_project"`);
    await queryRunner.query(
      `ALTER TABLE "word_list_word" RENAME TO "temporary_word_list_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list_word"("id", "alwaysChoose", "word", "wordListId") SELECT "id", "alwaysChoose", "word", "wordListId" FROM "temporary_word_list_word"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list_word"`);
    await queryRunner.query(
      `ALTER TABLE "word_list" RENAME TO "temporary_word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "temporary_word_list"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list"`);
    await queryRunner.query(
      `ALTER TABLE "sentence_structure_structure" RENAME TO "temporary_sentence_structure_structure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" text NOT NULL, "sentenceStructureId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "sentence_structure_structure"("id", "value", "sentenceStructureId") SELECT "id", "value", "sentenceStructureId" FROM "temporary_sentence_structure_structure"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_sentence_structure_structure"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sentence_structure" RENAME TO "temporary_sentence_structure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "sentence_structure"("id", "category", "projectId") SELECT "id", "category", "projectId" FROM "temporary_sentence_structure"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sentence_structure"`);
    await queryRunner.query(`DROP TABLE "prompt_tailored_word"`);
    await queryRunner.query(`DROP TABLE "prompt_forbidden_word"`);
    await queryRunner.query(`DROP TABLE "prompt_alternate_spelling"`);
    await queryRunner.query(`DROP TABLE "prompt"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "word_list_word"`);
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(`DROP TABLE "sentence_structure_structure"`);
    await queryRunner.query(`DROP TABLE "sentence_structure"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
