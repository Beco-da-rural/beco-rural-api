import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746333531560 implements MigrationInterface {
  name = 'Migration1746333531560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
  }
}
