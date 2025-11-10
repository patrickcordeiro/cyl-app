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
import { getPagination } from '@shared/utils';
import { CustomError } from '@shared/errors';

@injectable()
export default class IncomeRepository
  extends BaseRepository
  implements IIncomeRepository
{
  async search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<IncomeSearchDto>> {
    const { itemsPerPage, limit, order, page, start, sort, ...othersFilters } =
      queryOptions;

    const connection = this.getConnection();

    const incomes = await connection
      .createQueryBuilder()
      .select('income')
      .from(IncomeModel, 'income')
      // .where(othersFilters)
      // .orderBy(
      //   `income.${sort}`,
      //   order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
      // )
      // .skip(Number(start))
      // .take(Number(limit))
      .getManyAndCount();

    const [data] = incomes;

    const { pagination } = getPagination(
      { itemsPerPage, page, limit, order, start, sort },
      data
    );

    const response: SearchResponse<IncomeSearchDto> = {
      data: data.map(item => {
        const income = new IncomeEntity({
          id: item.id,
          name: item.name,
          active: item.active,
          expectedAmount: item['expectedAmount'],
          expectedDate: item['expectedDate'],
          receiptAmount: item['receiptAmount'],
          receiptDate: item['receiptDate'],
          createdAt: item['createdAt'],
          updatedAt: item['updatedAt'],
        });
        return income.toJSON();
      }),
      pagination,
    };

    return response;
  }

  async getById(id: string): Promise<IncomeEntity | undefined> {
    const connection = this.getConnection();

    const income = await connection
      .createQueryBuilder()
      .select('income')
      .from(IncomeModel, 'income')
      .where('income.id = :id', { id })
      // .andWhere('income.active = :active', { active: true })
      // .orderBy(
      //   `income.${sort}`,
      //   order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
      // )
      // .skip(Number(start))
      // .take(Number(limit))
      .getOne();

    const response = income
      ? new IncomeEntity({
          id: income.id,
          name: income.name,
          active: income.active,
          expectedAmount: income['expectedAmount'],
          expectedDate: income['expectedDate'],
          receiptAmount: income['receiptAmount'],
          receiptDate: income['receiptDate'],
          createdAt: income['createdAt'],
          updatedAt: income['updatedAt'],
        })
      : undefined;

    return response;
  }

  async create(data: IncomeCreateDto): Promise<IncomeEntity> {
    const connection = this.getConnection();

    const newIncome = new IncomeEntity({
      ...data,
      updatedAt: null,
    });

    const createdIncome = await connection
      .createQueryBuilder()
      .insert()
      .into(IncomeModel)
      .values(newIncome.toJSON())
      .execute();

    return newIncome;
  }

  async update(id: string, data: IncomeUpdateDto): Promise<IncomeEntity> {
    const connection = this.getConnection();

    const existingIncome = await this.getById(id);

    if (!existingIncome) {
      throw new CustomError('Income not found', 404);
    }

    existingIncome.update(data);

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
