import {
  IncomeCreateDto,
  IncomeSearchDto,
  IncomeUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { IncomeEntity } from '@entities/Income';
import { IIncomeRepository } from '@interfaces/repositories';
import { IIncomeService } from '@interfaces/services';
import { inject, injectable } from 'inversify';

@injectable()
export default class IncomeService implements IIncomeService {
  constructor(
    @inject(IIncomeRepository) private repository: IIncomeRepository
  ) {}

  async search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<IncomeSearchDto>> {
    return this.repository.search(queryOptions);
  }

  async findById(id: string): Promise<IncomeEntity> {
    const income = await this.repository.getById(id);
    if (!income) {
      throw new Error('Income not found');
    }
    return income;
  }

  async create(dto: IncomeCreateDto): Promise<IncomeEntity> {
    return this.repository.create(dto);
  }

  async update(id: string, dto: IncomeUpdateDto): Promise<IncomeEntity> {
    const income = await this.repository.getById(id);
    if (!income) {
      throw new Error('Income not found');
    }
    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    const income = await this.repository.getById(id);
    if (!income) {
      throw new Error('Income not found');
    }
    return this.repository.delete(id);
  }
}
