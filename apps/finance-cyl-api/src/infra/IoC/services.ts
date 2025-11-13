import { Container } from 'inversify';
import { IExpenseService, IIncomeService } from '@interfaces/services';
import { IncomeService } from '@services/Income';
import { ExpenseService } from '@services/Expense';

export default function bindServices(container: Container) {
  container.bind(IIncomeService).to(IncomeService);
  container.bind(IExpenseService).to(ExpenseService);
}
