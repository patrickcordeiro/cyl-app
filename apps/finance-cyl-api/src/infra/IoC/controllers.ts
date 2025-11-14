import { Container } from 'inversify';
import {
  IBudgetController,
  IExpenseController,
  IIncomeController,
} from '@interfaces/controllers';
import IncomeController from '@application/controllers/Income/IncomeController';
import ExpenseController from '@application/controllers/Expense/ExpenseController';
import BudgetController from '@application/controllers/Budget/BudgetController';

export default function bindControllers(container: Container) {
  container.bind(IIncomeController).to(IncomeController);
  container.bind(IExpenseController).to(ExpenseController);
  container.bind(IBudgetController).to(BudgetController);
}
