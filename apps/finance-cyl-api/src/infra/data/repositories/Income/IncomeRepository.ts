import { injectable } from 'inversify';
import { IIncomeRepository } from '@interfaces/repositories';
import { BaseRepository } from '../BaseRepository';
import {
  IncomeCreateDto,
  IncomeSearchDto,
  IncomeUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { IncomeEntity } from '@entities/Income';
import { IncomeModel } from '@infra/data/models';
import { getPagination, getValidDate } from '@shared/utils';
import { CustomError } from '@shared/errors';

@injectable()
export default class IncomeRepository
  extends BaseRepository
  implements IIncomeRepository
{
  async search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<IncomeSearchDto>> {
    const { itemsPerPage, order, sort, page, search, status } = queryOptions;

    const connection = this.getConnection();

    const firstIndex = (page - 1) * itemsPerPage;

    const query = connection
      .createQueryBuilder()
      .select('incomes')
      .from(IncomeModel, 'incomes')
      .skip(firstIndex)
      .take(itemsPerPage);

    if (status !== 'all') {
      query.andWhere('incomes.active = :status', {
        status: Boolean(status === 'active'),
      });
    }

    if (search) {
      query.andWhere('incomes.name ILIKE :search', { search: `%${search}%` });
    }

    if (sort) {
      query.orderBy(`incomes.${sort}`, order === 'ASC' ? 'ASC' : 'DESC');
    }

    const [data, total] = await query.getManyAndCount();

    const { pagination } = getPagination({
      total,
      itemsPerPage,
      page,
    });

    return {
      pagination,
      data: data.map(item => new IncomeEntity(item).toJSON()),
    } as SearchResponse<IncomeSearchDto>;
  }

  async getById(id: string): Promise<IncomeEntity | undefined> {
    const connection = this.getConnection();

    const income = await connection
      .createQueryBuilder()
      .select('incomes')
      .from(IncomeModel, 'incomes')
      .where('incomes.id = :id', { id })
      .getOne();

    if (!income) {
      throw new CustomError('Income not found', 404);
    }

    const response = income ? new IncomeEntity(income) : undefined;

    return response;
  }

  async create(data: IncomeCreateDto): Promise<IncomeEntity> {
    const connection = this.getConnection();

    const newIncome = new IncomeEntity({
      ...data,
      expectedDate: getValidDate(data.expectedDate),
      receiptDate: data.receiptDate ? getValidDate(data.receiptDate) : null,
      updatedAt: null,
    });

    const createdIncome = await connection
      .createQueryBuilder()
      .insert()
      .into(IncomeModel)
      .values(newIncome.toJSON())
      .execute();

    const createdIncomeId = createdIncome?.identifiers[0]?.id;

    if (!createdIncomeId) {
      throw new CustomError('Error creating income', 400);
    }

    const incomeCreated = await this.getById(createdIncomeId);

    if (!incomeCreated) {
      throw new CustomError('Error creating income', 400);
    }

    return incomeCreated;
  }

  async update(id: string, data: IncomeUpdateDto): Promise<IncomeEntity> {
    const connection = this.getConnection();

    const existingIncome = await this.getById(id);

    if (!existingIncome) {
      throw new CustomError('Income not found', 404);
    }

    existingIncome.update({
      ...data,
      expectedDate: data.expectedDate
        ? getValidDate(data.expectedDate)
        : existingIncome.getExpectedDate(),
      receiptDate: data.receiptDate
        ? getValidDate(data.receiptDate)
        : existingIncome.getReceiptDate(),
    });

    await connection
      .createQueryBuilder()
      .update(IncomeModel)
      .set(existingIncome.toJSON())
      .where('id = :id', { id })
      .execute();

    const updatedIncome = await this.getById(id);

    if (!updatedIncome) {
      throw new CustomError('Error updating income', 500);
    }

    return updatedIncome;
  }

  async delete(id: string): Promise<void> {
    const connection = this.getConnection();

    const existingIncome = await this.getById(id);

    if (!existingIncome) {
      throw new CustomError('Income not found', 404);
    }

    await connection
      .createQueryBuilder()
      .delete()
      .from(IncomeModel)
      .where('id = :id', { id })
      .execute();

    return;
  }
}
