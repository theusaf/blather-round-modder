import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWordList1692036729350 implements MigrationInterface {
  name = "CreateWordList1692036729350";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "word_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer, "maxChoices" integer, "name" varchar(255) NOT NULL, "optional" boolean NOT NULL, "placeholder" varchar(255))`,
    );
    await queryRunner.query(
      `CREATE TABLE "word_list_word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "alwaysChoose" boolean NOT NULL, "word" varchar(255) NOT NULL, "wordListId" integer NOT NULL)`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "word_list_word"`);
    await queryRunner.query(`DROP TABLE "word_list"`);
  }
}
