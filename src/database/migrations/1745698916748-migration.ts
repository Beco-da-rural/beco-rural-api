import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1745698916748 implements MigrationInterface {
  name = 'Migration1745698916748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "listing" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "categoryId" integer, CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_33bd8a3b7eeccb95ae45038d956" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "listing" ADD CONSTRAINT "FK_2bbfb12dc1f8dc97c66afa6fe4c" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_2bbfb12dc1f8dc97c66afa6fe4c"`);
    await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_33bd8a3b7eeccb95ae45038d956"`);
    await queryRunner.query(`DROP TABLE "listing"`);
  }
}
