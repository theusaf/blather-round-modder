import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSentenceStructuresToProject1692036092455
  implements MigrationInterface
{
  name = "AddSentenceStructuresToProject1692036092455";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "projectId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_sentence_structure"("id", "category") SELECT "id", "category" FROM "sentence_structure"`,
    );
    await queryRunner.query(`DROP TABLE "sentence_structure"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_sentence_structure" RENAME TO "sentence_structure"`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(
      `ALTER TABLE "sentence_structure" RENAME TO "temporary_sentence_structure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sentence_structure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "sentence_structure"("id", "category") SELECT "id", "category" FROM "temporary_sentence_structure"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_sentence_structure"`);
  }
}
