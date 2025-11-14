import {
  IncomeCreateDto,
  IncomeSearchDto,
  IncomeUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { IncomeEntity } from '@entities/Income';
import Income from '@entities/Income/Income';

export default abstract class IIncomeRepository {
  abstract search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<IncomeSearchDto>>;
  abstract getAllByMonth(month: string, year: number): Promise<Income[]>;
  abstract getById(id: string): Promise<IncomeEntity | undefined>;
  abstract create(data: IncomeCreateDto): Promise<IncomeEntity>;
  abstract update(id: string, data: IncomeUpdateDto): Promise<IncomeEntity>;
  abstract delete(id: string): Promise<void>;
}
