import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableIncome1762785242565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "incomes" (
        "id" uuid PRIMARY KEY,
        "name" varchar NOT NULL,
        "expected_date" timestamptz NOT NULL,
        "receipt_date" timestamptz,
        "expected_amount" numeric(14,4) NOT NULL,
        "receipt_amount" numeric(14,4),
        "active" boolean NOT NULL DEFAULT true,
        "created_at" timestamptz NOT NULL,
        "updated_at" timestamptz
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "incomes"
    `);
  }
}
