import { injectable } from 'inversify';
import { IExpenseRepository } from '@interfaces/repositories';
import { BaseRepository } from '../BaseRepository';
import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { ExpenseEntity } from '@entities/Expense';
import { ExpenseModel } from '@infra/data/models';
import { getPagination, getValidDate } from '@shared/utils';
import { CustomError } from '@shared/errors';

@injectable()
export default class ExpenseRepository
  extends BaseRepository
  implements IExpenseRepository
{
  async search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<ExpenseSearchDto>> {
    const { itemsPerPage, order, sort, page, search, status } = queryOptions;

    const connection = this.getConnection();

    const firstIndex = (page - 1) * itemsPerPage;

    const query = connection
      .createQueryBuilder()
      .select('expenses')
      .from(ExpenseModel, 'expenses')
      .skip(firstIndex)
      .take(itemsPerPage);

    if (status !== 'all') {
      query.andWhere('expenses.active = :status', {
        status: Boolean(status === 'active'),
      });
    }

    if (search) {
      query.andWhere('expenses.name ILIKE :search', { search: `%${search}%` });
    }

    if (sort) {
      query.orderBy(`expenses.${sort}`, order === 'ASC' ? 'ASC' : 'DESC');
    }

    const [data, total] = await query.getManyAndCount();

    const { pagination } = getPagination({
      total,
      itemsPerPage,
      page,
    });

    return {
      pagination,
      data: data.map(item => new ExpenseEntity(item).toJSON()),
    } as SearchResponse<ExpenseSearchDto>;
  }

  async getById(id: string): Promise<ExpenseEntity | undefined> {
    const connection = this.getConnection();

    const expense = await connection
      .createQueryBuilder()
      .select('expenses')
      .from(ExpenseModel, 'expenses')
      .where('expenses.id = :id', { id })
      .getOne();

    if (!expense) {
      throw new CustomError('Expense not found', 404);
    }

    const response = expense ? new ExpenseEntity(expense) : undefined;

    return response;
  }

  async create(data: ExpenseCreateDto): Promise<ExpenseEntity> {
    const connection = this.getConnection();

    const newExpense = new ExpenseEntity({
      ...data,
      dueDate: getValidDate(data.dueDate),
      paymentDate: data.paymentDate ? getValidDate(data.paymentDate) : null,
      updatedAt: null,
    });

    const createdExpense = await connection
      .createQueryBuilder()
      .insert()
      .into(ExpenseModel)
      .values(newExpense.toJSON())
      .execute();

    const createdExpenseId = createdExpense?.identifiers[0]?.id;

    if (!createdExpenseId) {
      throw new CustomError('Error creating expense', 400);
    }

    const expenseCreated = await this.getById(createdExpenseId);

    if (!expenseCreated) {
      throw new CustomError('Error creating expense', 400);
    }

    return expenseCreated;
  }

  async update(id: string, data: ExpenseUpdateDto): Promise<ExpenseEntity> {
    const connection = this.getConnection();

    const existingExpense = await this.getById(id);

    if (!existingExpense) {
      throw new CustomError('Expense not found', 404);
    }

    existingExpense.update({
      ...data,
      dueDate: data.dueDate
        ? getValidDate(data.dueDate)
        : existingExpense.getDueDate(),
      paymentDate: data.paymentDate
        ? getValidDate(data.paymentDate)
        : existingExpense.getPaymentDate(),
    });

    await connection
      .createQueryBuilder()
      .update(ExpenseModel)
      .set(existingExpense.toJSON())
      .where('id = :id', { id })
      .execute();

    const updatedExpense = await this.getById(id);

    if (!updatedExpense) {
      throw new CustomError('Error updating expense', 500);
    }

    return updatedExpense;
  }

  async delete(id: string): Promise<void> {
    const connection = this.getConnection();

    const existingExpense = await this.getById(id);

    if (!existingExpense) {
      throw new CustomError('Expense not found', 404);
    }

    await connection
      .createQueryBuilder()
      .delete()
      .from(ExpenseModel)
      .where('id = :id', { id })
      .execute();

    return;
  }
}
