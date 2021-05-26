import {MigrationInterface, QueryRunner} from "typeorm";

export class addTokenColumn1622071531140 implements MigrationInterface {
    name = 'addTokenColumn1622071531140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD "recoverPasswordToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP COLUMN "recoverPasswordToken"`);
    }

}
