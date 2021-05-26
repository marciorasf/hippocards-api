import {MigrationInterface, QueryRunner} from "typeorm";

export class alterRecoverTokenOption1622073372668 implements MigrationInterface {
    name = 'alterRecoverTokenOption1622073372668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP COLUMN "recoverPasswordToken"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD "recoverPasswordToken" text`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD CONSTRAINT "UQ_0cde2b8ca9e22c041f6db577b82" UNIQUE ("recoverPasswordToken")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP CONSTRAINT "UQ_0cde2b8ca9e22c041f6db577b82"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP COLUMN "recoverPasswordToken"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD "recoverPasswordToken" character varying`);
    }

}
