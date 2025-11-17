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

  public getIncomesAmountTotal(): number {
    return this.getIncomes().reduce((a, b) => {
      return a + b.getExpectedAmount();
    }, 0);
  }

  public getExpensesAmountTotal(): number {
    return this.getExpenses().reduce((a, b) => {
      return a + b.getExpectedAmount();
    }, 0);
  }

  public getBalanceMonth(): number {
    return this.getIncomesAmountTotal() - this.getExpensesAmountTotal();
  }

  /* #endregion */

  /* #region Setters */

  public setYear(year: number): void {
    this.year = year;
  }

  /* #endregion */

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

  public toJSON(): BudgetDto {
    return {
      month: this.getMonth(),
      year: this.getYear(),
      incomesAmountTotal: this.getIncomesAmountTotal(),
      expensesAmountTotal: this.getExpensesAmountTotal(),
      balanceMonth: this.getBalanceMonth(),
      incomes: this.getIncomes().map(i => i.toJSON()),
      expenses: this.getExpenses().map(e => e.toJSON()),
    };
  }
}
