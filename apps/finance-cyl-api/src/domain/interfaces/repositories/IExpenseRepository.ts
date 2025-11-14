import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
  SearchOptionsDto,
  SearchResponse,
} from '@cyl-app/dto';
import { ExpenseEntity } from '@entities/Expense';
import Expense from '@entities/Expense/Expense';

export default abstract class IExpenseRepository {
  abstract search(
    queryOptions: SearchOptionsDto
  ): Promise<SearchResponse<ExpenseSearchDto>>;
  abstract getAllByMonth(month: string, year: number): Promise<Expense[]>;
  abstract getById(id: string): Promise<ExpenseEntity | undefined>;
  abstract create(data: ExpenseCreateDto): Promise<ExpenseEntity>;
  abstract update(id: string, data: ExpenseUpdateDto): Promise<ExpenseEntity>;
  abstract delete(id: string): Promise<void>;
}
