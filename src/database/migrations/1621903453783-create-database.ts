import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1621903453783 implements MigrationInterface {
    name = 'createDatabase1621903453783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."flashcard" DROP CONSTRAINT "FK_1aba85cf87447e9dee9f8048d08"`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" DROP CONSTRAINT "FK_c17e88ef31fafce40676f4395cd"`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" ADD CONSTRAINT "FK_17d37c45c506192ce7e5acbb91e" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" ADD CONSTRAINT "FK_bea0562b4044acf238ad89b8d69" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD CONSTRAINT "FK_c3b0505cdea87f5dba0a999531f" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" DROP CONSTRAINT "FK_c3b0505cdea87f5dba0a999531f"`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" DROP CONSTRAINT "FK_bea0562b4044acf238ad89b8d69"`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" DROP CONSTRAINT "FK_17d37c45c506192ce7e5acbb91e"`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" ADD CONSTRAINT "FK_c17e88ef31fafce40676f4395cd" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."flashcard" ADD CONSTRAINT "FK_1aba85cf87447e9dee9f8048d08" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
