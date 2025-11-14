import { BudgetDto } from '@/Budget';
import { ControllerBase } from './ControllerBase';

export interface BudgetController extends ControllerBase {
  findByMonth: {
    request: undefined;
    response: BudgetDto;
  };
}
