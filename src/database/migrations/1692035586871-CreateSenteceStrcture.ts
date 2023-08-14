import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSenteceStrcture1692035586871 implements MigrationInterface {
  name = "CreateSenteceStrcture1692035586871";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" text NOT NULL, "sentenceStructureId" integer NOT NULL)`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "sentence_structure_structure"`);
    await queryRunner.query(`DROP TABLE "sentence_structure"`);
  }
}
