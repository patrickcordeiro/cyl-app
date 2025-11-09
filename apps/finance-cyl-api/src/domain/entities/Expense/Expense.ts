import { ExpenseDto } from '@cyl-app/dto';
import { EntityBase, IEntityBase } from 'src/domain/entities/EntityBase';
import { validateObject } from '@shared/utils';

export interface IExpense extends IEntityBase {
  id: string;
  name: string;
  dueDate: Date;
  paymentDate: Date | null;
  expectedAmount: number;
  payAmmount: number | null;
  createdAt?: Date;
  active?: boolean;
}

export interface IExpenseUpdate {
  name?: string;
  dueDate?: Date;
  paymentDate?: Date | null;
  expectedAmount?: number;
  payAmmount?: number | null;
  active?: boolean;
}

export default class Expense extends EntityBase {
  protected name: string;
  protected dueDate: Date;
  protected paymentDate: Date | null;
  protected expectedAmount: number;
  protected payAmmount: number | null;

  constructor(props: IExpense) {
    super(props);
    this.name = props.name;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate ?? null;
    this.expectedAmount = props.expectedAmount;
    this.payAmmount = props.payAmmount ?? null;
  }

  public validate(): void {
    validateObject<IExpense>(this, [
      'id',
      'name',
      'dueDate',
      'paymentDate',
      'expectedAmount',
      'payAmmount',
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

  public getpaymentDate(): Date | null {
    return this.paymentDate;
  }

  public getExpectedAmount(): number {
    return this.expectedAmount;
  }

  public getPayAmount(): number | null {
    return this.payAmmount;
  }

  /* #endregion */

  /* #region Setters */

  public setName(name: string): void {
    this.setString(name, 'name');
  }

  public setDueDate(dueDate: Date): void {
    this.setDate(dueDate, 'dueDate');
  }

  public setpaymentDate(paymentDate: Date | null): void {
    this.setNullableDate(paymentDate, 'paymentDate');
  }

  public setExpectedAmount(expectedAmount: number): void {
    this.setNumber(expectedAmount, 'expectedAmount');
  }

  public setPayAmount(payAmmount: number | null): void {
    this.setNullableNumber(payAmmount, 'payAmmount');
  }

  /* #endregion */

  public update(dto: IExpenseUpdate): void {
    const settersDictionary = {
      name: this.setName,
      dueDate: this.setDueDate,
      paymentDate: this.setpaymentDate,
      expectedAmount: this.setExpectedAmount,
      payAmmount: this.setPayAmount,
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
      payAmmount: this.payAmmount,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
