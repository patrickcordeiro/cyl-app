import { BudgetDto } from '@cyl-app/dto';

export default abstract class IBudgetService {
  abstract findByMonth(month: string, year: number): Promise<BudgetDto>;
}
