import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultPublicValueToProject1692138572724
  implements MigrationInterface
{
  name = "AddDefaultPublicValueToProject1692138572724";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "ownerUsername" varchar NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "description" text, "public" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "FK_93499dba47b930b3c31e91d04eb" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_project"("id", "name", "ownerUsername", "lastUpdated", "description", "public") SELECT "id", "name", "ownerUsername", "lastUpdated", "description", "public" FROM "project"`,
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
      `CREATE TABLE "project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255) NOT NULL, "ownerUsername" varchar NOT NULL, "lastUpdated" datetime NOT NULL DEFAULT (datetime('now')), "description" text, "public" boolean NOT NULL, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "FK_93499dba47b930b3c31e91d04eb" FOREIGN KEY ("ownerUsername") REFERENCES "user" ("username") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "project"("id", "name", "ownerUsername", "lastUpdated", "description", "public") SELECT "id", "name", "ownerUsername", "lastUpdated", "description", "public" FROM "temporary_project"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_project"`);
  }
}
