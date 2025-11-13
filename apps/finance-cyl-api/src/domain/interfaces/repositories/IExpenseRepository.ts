import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
  SearchResponse,
} from '@cyl-app/dto';
import { ExpenseEntity } from '@entities/Expense';

export default abstract class IExpenseRepository {
  abstract search(
    queryOptions: Record<string, unknown>
  ): Promise<SearchResponse<ExpenseSearchDto>>;
  abstract getById(id: string): Promise<ExpenseEntity | undefined>;
  abstract create(data: ExpenseCreateDto): Promise<ExpenseEntity>;
  abstract update(id: string, data: ExpenseUpdateDto): Promise<ExpenseEntity>;
  abstract delete(id: string): Promise<void>;
}
