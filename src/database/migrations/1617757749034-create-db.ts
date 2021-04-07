import {MigrationInterface, QueryRunner} from "typeorm";

export class new1617757749034 implements MigrationInterface {
    name = 'new1617757749034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flashcard" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, "isBookmarked" boolean NOT NULL DEFAULT false, "isKnown" boolean NOT NULL DEFAULT false, "views" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_e0aba0501d3bc532951efc9f791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flashcard" ADD CONSTRAINT "FK_1aba85cf87447e9dee9f8048d08" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flashcard" ADD CONSTRAINT "FK_c17e88ef31fafce40676f4395cd" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "flashcard" DROP CONSTRAINT "FK_c17e88ef31fafce40676f4395cd"`);
        await queryRunner.query(`ALTER TABLE "flashcard" DROP CONSTRAINT "FK_1aba85cf87447e9dee9f8048d08"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "flashcard"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
