import { Request } from 'express';
import { IncomeController } from '@cyl-app/dto';

export default abstract class IIncomeController {
  abstract search(
    req: Request
  ): Promise<IncomeController['search']['response']>;
  abstract findById(
    req: Request
  ): Promise<IncomeController['findById']['response']>;
  abstract create(
    req: Request
  ): Promise<IncomeController['create']['response']>;
  abstract update(
    req: Request
  ): Promise<IncomeController['update']['response']>;
  abstract delete(
    req: Request
  ): Promise<IncomeController['delete']['response']>;
}
