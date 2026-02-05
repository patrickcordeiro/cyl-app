import { Column, Entity } from 'typeorm';
import { BaseModel } from '../ModelBase';

@Entity('expenses')
export default class Expense extends BaseModel {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'timestamptz', name: 'due_date' })
  dueDate!: Date;

  @Column({ type: 'timestamptz', name: 'payment_date', nullable: true })
  paymentDate!: Date | null;

  @Column({ type: 'decimal', name: 'expected_amount', precision: 14, scale: 4 })
  expectedAmount!: number;

  @Column({
    type: 'decimal',
    name: 'pay_amount',
    precision: 14,
    scale: 4,
    nullable: true,
  })
  payAmount!: number | null;
}
