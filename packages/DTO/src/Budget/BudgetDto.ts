import { ExpenseDto } from '@/Expense';
import { IncomeDto } from '@/Income';

export type BudgetDto = {
  month: string;
  year: number;
  incomesAmountTotal: number;
  expensesAmountTotal: number;
  balanceMonth: number;
  incomes: IncomeDto[];
  expenses: ExpenseDto[];
};
