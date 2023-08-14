import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectMetadata1692042652459 implements MigrationInterface {
  name = "AddProjectMetadata1692042652459";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "emailVerified" boolean NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("username", "password") SELECT "username", "password" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("username", "password") SELECT "username", "password" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
