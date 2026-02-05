import { Column, PrimaryColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt!: Date | null;

  @Column({ type: 'boolean', default: true })
  active!: boolean;
}
