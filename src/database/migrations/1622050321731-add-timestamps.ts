import {MigrationInterface, QueryRunner} from "typeorm";

export class addTimestamps1622050321731 implements MigrationInterface {
    name = 'addTimestamps1622050321731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "flashcards"."flashcard" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "flashcards"."category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "flashcards"."category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcards"."category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."flashcard" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "flashcards"."user" DROP COLUMN "createdAt"`);
    }

}
