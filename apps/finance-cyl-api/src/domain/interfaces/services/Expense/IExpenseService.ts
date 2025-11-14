import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { ExpenseEntity } from '@entities/Expense';

export default abstract class IExpenseService {
  abstract search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<ExpenseSearchDto>>;
  abstract findById(id: string): Promise<ExpenseEntity>;
  abstract create(dto: ExpenseCreateDto): Promise<ExpenseEntity>;
  abstract update(id: string, dto: ExpenseUpdateDto): Promise<ExpenseEntity>;
  abstract delete(id: string): Promise<void>;
}
