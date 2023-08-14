import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraints1692037149148 implements MigrationInterface {
  name = "AddUniqueConstraints1692037149148";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "prompt"`,
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
      `CREATE TABLE "temporary_word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder" FROM "word_list"`,
    );
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list" RENAME TO "word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "UQ_57a163bf22e615c9dd6e6cae4c4" UNIQUE ("password"), CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "prompt"`,
    );
    await queryRunner.query(`DROP TABLE "prompt"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt" RENAME TO "prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_alternate_spelling" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "UQ_d06424e00e4b726a2725f2734fc" UNIQUE ("value"), CONSTRAINT "FK_71136536e715a32504d3b272aa8" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_alternate_spelling"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_alternate_spelling"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_alternate_spelling"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_alternate_spelling" RENAME TO "prompt_alternate_spelling"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt_forbidden_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar(255) NOT NULL, "promptId" integer NOT NULL, CONSTRAINT "UQ_130a5bcbb43e862e719d38033e8" UNIQUE ("value"), CONSTRAINT "FK_869c1a631803ad784349b6ce458" FOREIGN KEY ("promptId") REFERENCES "prompt" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt_forbidden_word"("id", "value", "promptId") SELECT "id", "value", "promptId" FROM "prompt_forbidden_word"`,
    );
    await queryRunner.query(`DROP TABLE "prompt_forbidden_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt_forbidden_word" RENAME TO "prompt_forbidden_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "UQ_3bbc05209d904af950293a06359" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "word_list"`,
    );
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list" RENAME TO "word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL, CONSTRAINT "UQ_4822ad7a284147bac409a44b5bd" UNIQUE ("word"), CONSTRAINT "FK_c4cdf9f5f320836faa971d92bba" FOREIGN KEY ("wordListId") REFERENCES "word_list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list_word"("id", "alwaysChoose", "word", "wordListId") SELECT "id", "alwaysChoose", "word", "wordListId" FROM "word_list_word"`,
    );
    await queryRunner.query(`DROP TABLE "word_list_word"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list_word" RENAME TO "word_list_word"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "UQ_3bbc05209d904af950293a06359" UNIQUE ("name"), CONSTRAINT "FK_e9de89fa383f2d8830a50a1dbd0" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "word_list"`,
    );
    await queryRunner.query(`DROP TABLE "word_list"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_word_list" RENAME TO "word_list"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word_list" RENAME TO "temporary_word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL, CONSTRAINT "UQ_3bbc05209d904af950293a06359" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder", "projectId" FROM "temporary_word_list"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list"`);
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
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255), "projectId" integer NOT NULL)`,
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
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "temporary_prompt"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt"`);
    await queryRunner.query(
      `ALTER TABLE "word_list" RENAME TO "temporary_word_list"`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255))`,
    );
    await queryRunner.query(
      `INSERT INTO "word_list"("id", "amount", "maxChoices", "name", "optional", "placeholder") SELECT "id", "amount", "maxChoices", "name", "optional", "placeholder" FROM "temporary_word_list"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_word_list"`);
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
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "temporary_prompt"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt"`);
  }
}
