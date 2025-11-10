import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('incomes')
export default class Income {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'date', name: 'expected_date' })
  expectedDate!: Date;

  @Column({ type: 'date', name: 'receipt_date', nullable: true })
  receiptDate!: Date | null;

  @Column({ type: 'decimal', name: 'expected_amount', precision: 14, scale: 4 })
  expectedAmount!: number;

  @Column({
    type: 'decimal',
    name: 'receipt_amount',
    precision: 14,
    scale: 4,
    nullable: true,
  })
  receiptAmount!: number | null;

  @Column({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt!: Date | null;

  @Column({ type: 'boolean', default: true })
  active!: boolean;
}
