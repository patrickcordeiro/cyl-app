import { BudgetController } from '@cyl-app/dto';
import { Request } from 'express';

export default abstract class IBudgetController {
  abstract findByMonth(
    req: Request
  ): Promise<BudgetController['findByMonth']['response']>;
}
