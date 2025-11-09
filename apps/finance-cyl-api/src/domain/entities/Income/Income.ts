import { IncomeDto } from '@cyl-app/dto';
import { EntityBase, IEntityBase } from 'src/domain/entities/EntityBase';
import { validateObject } from '@shared/utils';

export interface IIncome extends IEntityBase {
  id: string;
  name: string;
  expectedDate: Date;
  receiptDate: Date | null;
  expectedAmount: number;
  receiptAmount: number | null;
  createdAt?: Date;
  active?: boolean;
}

export interface IIncomeUpdate {
  name?: string;
  expectedDate?: Date;
  receiptDate?: Date | null;
  expectedAmount?: number;
  receiptAmount?: number | null;
  active?: boolean;
}

export default class Income extends EntityBase {
  protected name: string;
  protected expectedDate: Date;
  protected receiptDate: Date | null;
  protected expectedAmount: number;
  protected receiptAmount: number | null;

  constructor(props: IIncome) {
    super(props);
    this.name = props.name;
    this.expectedDate = props.expectedDate;
    this.receiptDate = props.receiptDate ?? null;
    this.expectedAmount = props.expectedAmount;
    this.receiptAmount = props.receiptAmount ?? null;
  }

  public validate(): void {
    validateObject<IIncome>(this, [
      'id',
      'name',
      'expectedDate',
      'receiptDate',
      'expectedAmount',
      'receiptAmount',
      'createdAt',
      'active',
    ]);
  }

  /* #region Getters */

  public getName(): string {
    return this.name;
  }

  public getExpectedDate(): Date {
    return this.expectedDate;
  }

  public getReceiptDate(): Date | null {
    return this.receiptDate;
  }

  public getExpectedAmount(): number {
    return this.expectedAmount;
  }

  public getReceiptAmount(): number | null {
    return this.receiptAmount;
  }

  /* #endregion */

  /* #region Setters */

  public setName(name: string): void {
    this.setString(name, 'name');
  }

  public setExpectedDate(expectedDate: Date): void {
    this.setDate(expectedDate, 'expectedDate');
  }

  public setReceiptDate(receiptDate: Date | null): void {
    this.setNullableDate(receiptDate, 'receiptDate');
  }

  public setExpectedAmount(expectedAmount: number): void {
    this.setNumber(expectedAmount, 'expectedAmount');
  }

  public setReceiptAmount(receiptAmount: number | null): void {
    this.setNullableNumber(receiptAmount, 'receiptAmount');
  }

  /* #endregion */

  public update(dto: IIncomeUpdate): void {
    const settersDictionary = {
      name: this.setName,
      expectedDate: this.setExpectedDate,
      receiptDate: this.setReceiptDate,
      expectedAmount: this.setExpectedAmount,
      receiptAmount: this.setReceiptAmount,
      active: this.setActive,
    };

    this.applyChanges(dto, settersDictionary);
  }

  public toJSON(): IncomeDto {
    return {
      id: this.id,
      name: this.name,
      expectedDate: this.expectedDate,
      receiptDate: this.receiptDate,
      expectedAmount: this.expectedAmount,
      receiptAmount: this.receiptAmount,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
