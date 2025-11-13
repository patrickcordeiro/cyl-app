import { ExpenseDto } from '@cyl-app/dto';
import { EntityBase, IEntityBase } from 'src/domain/entities/EntityBase';
import { getValidDate, parseDecimalValue, validateObject } from '@shared/utils';

export interface IExpense extends IEntityBase {
  id?: string;
  name: string;
  dueDate: Date;
  paymentDate: Date | null;
  expectedAmount: number;
  payAmount: number | null;
  createdAt?: Date;
  active?: boolean;
}

export interface IExpenseUpdate {
  name?: string;
  dueDate?: Date;
  paymentDate?: Date | null;
  expectedAmount?: number;
  payAmount?: number | null;
  active?: boolean;
}

export default class Expense extends EntityBase {
  protected name: string;
  protected dueDate: Date;
  protected paymentDate: Date | null;
  protected expectedAmount: number;
  protected payAmount: number | null;

  constructor(props: IExpense) {
    super(props);
    this.name = props.name;
    this.dueDate = getValidDate(props.dueDate);
    this.paymentDate = props.paymentDate
      ? getValidDate(props.paymentDate)
      : null;
    this.expectedAmount = parseDecimalValue(props.expectedAmount);
    this.payAmount = props.payAmount
      ? parseDecimalValue(props.payAmount)
      : null;
  }

  public validate(): void {
    validateObject<IExpense>(this, [
      'id',
      'name',
      'dueDate',
      'paymentDate',
      'expectedAmount',
      'payAmount',
      'createdAt',
      'active',
    ]);
  }

  /* #region Getters */

  public getName(): string {
    return this.name;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getPaymentDate(): Date | null {
    return this.paymentDate;
  }

  public getExpectedAmount(): number {
    return this.expectedAmount;
  }

  public getPayAmount(): number | null {
    return this.payAmount;
  }

  /* #endregion */

  /* #region Setters */

  public setName(name: string): void {
    this.setString(name, 'name');
  }

  public setDueDate(dueDate: Date): void {
    this.setDate(getValidDate(dueDate), 'dueDate');
  }

  public setpaymentDate(paymentDate: Date | null): void {
    this.setNullableDate(getValidDate(paymentDate), 'paymentDate');
  }

  public setExpectedAmount(expectedAmount: number): void {
    this.setNumber(parseDecimalValue(expectedAmount), 'expectedAmount');
  }

  public setPayAmount(payAmount: number | null): void {
    this.setNullableNumber(parseDecimalValue(payAmount), 'payAmount');
  }

  /* #endregion */

  public update(dto: IExpenseUpdate): void {
    const settersDictionary = {
      name: this.setName,
      dueDate: this.setDueDate,
      paymentDate: this.setpaymentDate,
      expectedAmount: this.setExpectedAmount,
      payAmount: this.setPayAmount,
      active: this.setActive,
    };

    this.applyChanges(dto, settersDictionary);
  }

  public toJSON(): ExpenseDto {
    return {
      id: this.id,
      name: this.name,
      dueDate: this.dueDate,
      paymentDate: this.paymentDate,
      expectedAmount: this.expectedAmount,
      payAmount: this.payAmount,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
