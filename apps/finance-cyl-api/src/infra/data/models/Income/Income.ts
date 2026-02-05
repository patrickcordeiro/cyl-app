import { Column, Entity } from 'typeorm';
import { BaseModel } from '../ModelBase';

@Entity('incomes')
export default class Income extends BaseModel {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'timestamptz', name: 'expected_date' })
  expectedDate!: Date;

  @Column({ type: 'timestamptz', name: 'receipt_date', nullable: true })
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
}
