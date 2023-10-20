import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSession1697828402892 implements MigrationInterface {
    name = 'CreateUserSession1697828402892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_session" ("session_id" varchar(36) PRIMARY KEY NOT NULL, "user_id" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_session"`);
    }

}
