import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraints1692148508500 implements MigrationInterface {
  name = "AddUniqueConstraints1692148508500";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "difficulty" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "UQ_fa179d5e480349b94e8883ff360" UNIQUE ("projectId", "password"), CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt"("id", "category", "difficulty", "password", "subcategory", "us", "projectId") SELECT "id", "category", "difficulty", "password", "subcategory", "us", "projectId" FROM "prompt"`,
    );
    await queryRunner.query(`DROP TABLE "prompt"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt" RENAME TO "prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "UQ_1503e00f0f7e7c898bdc08fbefa" UNIQUE ("promptId", "value"), CONSTRAINT "FK_71136536e715a32504d3b272aa8" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_alternate_spelling"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_alternate_spelling"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_alternate_spelling"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_alternate_spelling" RENAME TO "prompt_alternate_spelling"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "UQ_5fd732df82d3698536ee665bdc1" UNIQUE ("promptId", "value"), CONSTRAINT "FK_869c1a631803ad784349b6ce458" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_forbidden_word"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_forbidden_word"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_forbidden_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_forbidden_word" RENAME TO "prompt_forbidden_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "UQ_6974a862301dea755ae09799034" UNIQUE ("projectId", "name"), CONSTRAINT "FK_e9de89fa383f2d8830a50a1dbd0" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "word_list"`,
    );
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list" RENAME TO "word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL, CONSTRAINT "UQ_cc5f9fddd33589546c87efa3ab8" UNIQUE ("wordListId", "word"), CONSTRAINT "FK_c4cdf9f5f320836faa971d92bba" FOREIGN KEY ("wordListId") REFERENCES "word_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list_word"("id", "alwaysChoose", "word", "wordListId") SELECT "id", "alwaysChoose", "word", "wordListId" FROM "word_list_word"`,
    );
    await queryRunner.query(`DROP TABLE "word_list_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list_word" RENAME TO "word_list_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "description" text, "public" boolean NOT NULL DEFAULT (0), "ownerUsername" varchar NOT NULL, CONSTRAINT "UQ_414d64f8ac88cd9ec1ccde0017d" UNIQUE ("ownerUsername", "name"), CONSTRAINT "FK_93499dba47b930b3c31e91d04eb" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_project"("id", "lastUpdated", "name", "description", "public", "ownerUsername") SELECT "id", "lastUpdated", "name", "description", "public", "ownerUsername" FROM "project"`,
    );
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_project" RENAME TO "project"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" RENAME TO "temporary_project"`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "description" text, "public" boolean NOT NULL DEFAULT (0), "ownerUsername" varchar NOT NULL, CONSTRAINT "FK_93499dba47b930b3c31e91d04eb" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "project"("id", "lastUpdated", "name", "description", "public", "ownerUsername") SELECT "id", "lastUpdated", "name", "description", "public", "ownerUsername" FROM "temporary_project"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_project"`);
    await queryRunner.query(
      `ALTER TABLE "word_list_word" RENAME TO "temporary_word_list_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL, CONSTRAINT "FK_c4cdf9f5f320836faa971d92bba" FOREIGN KEY ("wordListId") REFERENCES "word_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list_word"("id", "alwaysChoose", "word", "wordListId") SELECT "id", "alwaysChoose", "word", "wordListId" FROM "temporary_word_list_word"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list_word"`);
    await queryRunner.query(
      `ALTER TABLE "word_list" RENAME TO "temporary_word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "FK_e9de89fa383f2d8830a50a1dbd0" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "temporary_word_list"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list"`);
    await queryRunner.query(
      `ALTER TABLE "prompt_forbidden_word" RENAME TO "temporary_prompt_forbidden_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "FK_869c1a631803ad784349b6ce458" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt_forbidden_word"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "temporary_prompt_forbidden_word"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt_forbidden_word"`);
    await queryRunner.query(
      `ALTER TABLE "prompt_alternate_spelling" RENAME TO "temporary_prompt_alternate_spelling"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "FK_71136536e715a32504d3b272aa8" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt_alternate_spelling"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "temporary_prompt_alternate_spelling"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt_alternate_spelling"`);
    await queryRunner.query(
      `ALTER TABLE "prompt" RENAME TO "temporary_prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "difficulty" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt"("id", "category", "difficulty", "password", "subcategory", "us", "projectId") SELECT "id", "category", "difficulty", "password", "subcategory", "us", "projectId" FROM "temporary_prompt"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt"`);
  }
}
