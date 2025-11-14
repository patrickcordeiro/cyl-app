import { BudgetDto } from '@cyl-app/dto';
import { validateObject } from '@shared/utils';
import Income from '@entities/Income/Income';
import Expense from '@entities/Expense/Expense';

export interface IBudget {
  month: string;
  year: number;
  incomes: Income[];
  expenses: Expense[];
}

export interface IBudgetUpdate {
  year?: number;
}

export default class Budget {
  readonly month: string;
  protected year: number;
  protected incomes: Income[];
  protected expenses: Expense[];

  constructor(props: IBudget) {
    this.month = props.month;
    this.year = props.year;
    this.incomes = props.incomes;
    this.expenses = props.expenses;
  }

  public validate(): void {
    validateObject<IBudget>(this, ['month', 'year', 'incomes', 'expenses']);
  }

  /* #region Getters */

  public getMonth(): string {
    return this.month;
  }

  public getYear(): number {
    return this.year;
  }

  public getIncomes(): Income[] {
    return this.incomes;
  }

  public getExpenses(): Expense[] {
    return this.expenses;
  }

  /* #endregion */

  /* #region Setters */

  public setYear(year: number): void {
    this.year = year;
  }

  public addIncome(income: Income): Income[] {
    const incomeAlreadyExists = this.getIncomes().find(i => i.isSame(income));

    if (!incomeAlreadyExists) {
      this.incomes.push(income);
    }

    return this.getIncomes();
  }

  public removeIncome(income: Income): Income[] {
    const incomeToDeleteIndex = this.getIncomes().findIndex(i =>
      i.isSame(income)
    );

    if (!incomeToDeleteIndex) {
      this.incomes.splice(incomeToDeleteIndex, 1);
    }

    return this.getIncomes();
  }

  public addExpense(expense: Expense): Expense[] {
    const expenseAlreadyExists = this.getExpenses().find(i =>
      i.isSame(expense)
    );

    if (!expenseAlreadyExists) {
      this.expenses.push(expense);
    }

    return this.getExpenses();
  }

  public removeExpense(expense: Expense): Expense[] {
    const expenseToDeleteIndex = this.getExpenses().findIndex(i =>
      i.isSame(expense)
    );

    if (!expenseToDeleteIndex) {
      this.expenses.splice(expenseToDeleteIndex, 1);
    }

    return this.getExpenses();
  }

  /* #endregion */

  public toJSON(): BudgetDto {
    return {
      month: this.getMonth(),
      year: this.getYear(),
      incomes: this.getIncomes().map(i => i.toJSON()),
      expenses: this.getExpenses().map(e => e.toJSON()),
    };
  }
}
