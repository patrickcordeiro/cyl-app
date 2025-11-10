import {
  IncomeCreateDto,
  IncomeSearchDto,
  IncomeUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { IncomeEntity } from '@entities/Income';

export default abstract class IIncomeService {
  abstract search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<IncomeSearchDto>>;
  abstract findById(id: string): Promise<IncomeEntity>;
  abstract create(dto: IncomeCreateDto): Promise<IncomeEntity>;
  abstract update(id: string, dto: IncomeUpdateDto): Promise<IncomeEntity>;
  abstract delete(id: string): Promise<void>;
}
