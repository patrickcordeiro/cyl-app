import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { ExpenseEntity } from '@entities/Expense';
import { IExpenseRepository } from '@interfaces/repositories';
import { IExpenseService } from '@interfaces/services';
import { inject, injectable } from 'inversify';

@injectable()
export default class ExpenseService implements IExpenseService {
  constructor(
    @inject(IExpenseRepository) private repository: IExpenseRepository
  ) {}

  async search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<ExpenseSearchDto>> {
    return this.repository.search(queryOptions);
  }

  async findById(id: string): Promise<ExpenseEntity> {
    const expense = await this.repository.getById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  }

  async create(dto: ExpenseCreateDto): Promise<ExpenseEntity> {
    return this.repository.create(dto);
  }

  async update(id: string, dto: ExpenseUpdateDto): Promise<ExpenseEntity> {
    const expense = await this.repository.getById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    const expense = await this.repository.getById(id);
    if (!expense) {
      throw new Error('Expense not found');
    }
    return this.repository.delete(id);
  }
}
