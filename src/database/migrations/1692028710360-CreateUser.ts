import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1692028710360 implements MigrationInterface {
  name = "CreateUser1692028710360";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
