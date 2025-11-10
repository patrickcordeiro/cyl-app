import {
  IncomeCreateDto,
  IncomeSearchDto,
  IncomeUpdateDto,
  SearchResponse,
} from '@cyl-app/dto';
import { IncomeEntity } from '@entities/Income';

export default abstract class IIncomeRepository {
  abstract search(
    queryOptions: Record<string, unknown>
  ): Promise<SearchResponse<IncomeSearchDto>>;
  abstract getById(id: string): Promise<IncomeEntity | undefined>;
  abstract create(data: IncomeCreateDto): Promise<IncomeEntity>;
  abstract update(id: string, data: IncomeUpdateDto): Promise<IncomeEntity>;
  abstract delete(id: string): Promise<void>;
}
