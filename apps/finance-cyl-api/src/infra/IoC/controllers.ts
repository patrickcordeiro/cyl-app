import { Container } from 'inversify';
import { IExpenseController, IIncomeController } from '@interfaces/controllers';
import IncomeController from '@application/controllers/Income/IncomeController';
import ExpenseController from '@application/controllers/Expense/ExpenseController';

export default function bindControllers(container: Container) {
  container.bind(IIncomeController).to(IncomeController);
  container.bind(IExpenseController).to(ExpenseController);
}
