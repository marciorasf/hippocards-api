import { MigrationInterface, QueryRunner } from "typeorm";

export class createDatabase1621904625043 implements MigrationInterface {
  name = "createDatabase1621904625043";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "flashcards"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_835ea1519a6e69fdfe9869f35ae" UNIQUE ("email"), CONSTRAINT "PK_87822c8ea9fbb7f12984431b10e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "flashcards"."flashcard" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying NOT NULL, "isBookmarked" boolean NOT NULL DEFAULT false, "isKnown" boolean NOT NULL DEFAULT false, "views" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_03d037404611950eb87f01f1546" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "flashcards"."category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_0c5943277e179f68ae354717fe5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "flashcards"."flashcard" ADD CONSTRAINT "FK_7af454323cf154412c0211729b4" FOREIGN KEY ("userId") REFERENCES "flashcards"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "flashcards"."flashcard" ADD CONSTRAINT "FK_9c06e3ef8548ec9f19f3afd4797" FOREIGN KEY ("categoryId") REFERENCES "flashcards"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "flashcards"."category" ADD CONSTRAINT "FK_73f1b6858a804ff076cefe24141" FOREIGN KEY ("userId") REFERENCES "flashcards"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flashcards"."category" DROP CONSTRAINT "FK_73f1b6858a804ff076cefe24141"`
    );
    await queryRunner.query(
      `ALTER TABLE "flashcards"."flashcard" DROP CONSTRAINT "FK_9c06e3ef8548ec9f19f3afd4797"`
    );
    await queryRunner.query(
      `ALTER TABLE "flashcards"."flashcard" DROP CONSTRAINT "FK_7af454323cf154412c0211729b4"`
    );
    await queryRunner.query(`DROP TABLE "flashcards"."category"`);
    await queryRunner.query(`DROP TABLE "flashcards"."flashcard"`);
    await queryRunner.query(`DROP TABLE "flashcards"."user"`);
  }
}
