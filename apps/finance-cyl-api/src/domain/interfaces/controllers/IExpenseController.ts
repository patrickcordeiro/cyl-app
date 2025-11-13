import { ExpenseController } from '@cyl-app/dto';
import { Request } from 'express';

export default abstract class IExpenseController {
  abstract search(
    req: Request
  ): Promise<ExpenseController['search']['response']>;
  abstract findById(
    req: Request
  ): Promise<ExpenseController['findById']['response']>;
  abstract create(
    req: Request
  ): Promise<ExpenseController['create']['response']>;
  abstract update(
    req: Request
  ): Promise<ExpenseController['update']['response']>;
  abstract delete(
    req: Request
  ): Promise<ExpenseController['delete']['response']>;
}
