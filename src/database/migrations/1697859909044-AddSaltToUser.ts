import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSaltToUser1697859909044 implements MigrationInterface {
    name = 'AddSaltToUser1697859909044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "emailVerified" boolean NOT NULL DEFAULT (0), "salt" varchar(255))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("username", "password", "email", "emailVerified") SELECT "username", "password", "email", "emailVerified" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("username" varchar PRIMARY KEY NOT NULL, "password" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "emailVerified" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "user"("username", "password", "email", "emailVerified") SELECT "username", "password", "email", "emailVerified" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
