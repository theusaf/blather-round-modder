import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePromptObjectAttributes1692034318889
  implements MigrationInterface
{
  name = "CreatePromptObjectAttributes1692034318889";

  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "prompt_tailored_word"`);
    await queryRunner.query(`DROP TABLE "prompt_forbidden_word"`);
    await queryRunner.query(`DROP TABLE "prompt_alternate_spelling"`);
  }
}
