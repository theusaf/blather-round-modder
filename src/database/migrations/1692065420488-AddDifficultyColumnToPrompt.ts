import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDifficultyColumnToPrompt1692065420488
  implements MigrationInterface
{
  name = "AddDifficultyColumnToPrompt1692065420488";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, "difficulty" varchar(16) NOT NULL, CONSTRAINT "UQ_57a163bf22e615c9dd6e6cae4c4" UNIQUE ("password"), CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "prompt"`,
    );
    await queryRunner.query(`DROP TABLE "prompt"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_prompt" RENAME TO "prompt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prompt" RENAME TO "temporary_prompt"`,
    );
    await queryRunner.query(
      `CREATE TABLE "prompt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar(16) NOT NULL, "password" varchar(255) NOT NULL, "subcategory" varchar(255), "us" boolean NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "UQ_57a163bf22e615c9dd6e6cae4c4" UNIQUE ("password"), CONSTRAINT "FK_c67590ca06752650fb3ab322a1f" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "prompt"("id", "category", "password", "subcategory", "us", "projectId") SELECT "id", "category", "password", "subcategory", "us", "projectId" FROM "temporary_prompt"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_prompt"`);
  }
}
