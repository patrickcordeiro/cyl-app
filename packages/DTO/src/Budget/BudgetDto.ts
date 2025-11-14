import { ExpenseDto } from '@/Expense';
import { IncomeDto } from '@/Income';

export type BudgetDto = {
  month: string;
  year: number;
  incomes: IncomeDto[];
  expenses: ExpenseDto[];
};
