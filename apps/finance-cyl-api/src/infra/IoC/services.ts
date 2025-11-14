import { Container } from 'inversify';
import {
  IBudgetService,
  IExpenseService,
  IIncomeService,
} from '@interfaces/services';
import { IncomeService } from '@services/Income';
import { ExpenseService } from '@services/Expense';
import BudgetService from '@services/Budget/BudgetService';

export default function bindServices(container: Container) {
  container.bind(IIncomeService).to(IncomeService);
  container.bind(IExpenseService).to(ExpenseService);
  container.bind(IBudgetService).to(BudgetService);
}
