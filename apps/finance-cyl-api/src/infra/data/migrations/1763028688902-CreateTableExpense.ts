import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableExpense1763028688902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "expenses" (
        "id" uuid PRIMARY KEY,
        "name" varchar NOT NULL,
        "due_date" timestamptz NOT NULL,
        "payment_date" timestamptz,
        "expected_amount" numeric(14,4) NOT NULL,
        "pay_amount" numeric(14,4),
        "active" boolean NOT NULL DEFAULT true,
        "created_at" timestamptz NOT NULL,
        "updated_at" timestamptz
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "expenses"
    `);
  }
}
