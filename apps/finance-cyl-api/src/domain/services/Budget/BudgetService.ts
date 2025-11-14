import { BudgetDto } from '@cyl-app/dto';
import Budget from '@entities/Budget/Budget';
import {
  IExpenseRepository,
  IIncomeRepository,
} from '@interfaces/repositories';
import { IBudgetService } from '@interfaces/services';
import { inject, injectable } from 'inversify';

@injectable()
export default class BudgetService implements IBudgetService {
  constructor(
    @inject(IIncomeRepository) private incomeRepository: IIncomeRepository,
    @inject(IExpenseRepository) private expenseRepository: IExpenseRepository
  ) {}

  async findByMonth(month: string, year: number): Promise<BudgetDto> {
    const incomes = await this.incomeRepository.getAllByMonth(month, year);
    const expenses = await this.expenseRepository.getAllByMonth(month, year);

    const budget = new Budget({
      month,
      year,
      incomes,
      expenses,
    });

    return budget.toJSON();
  }
}
