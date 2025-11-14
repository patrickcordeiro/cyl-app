import { BudgetDto, SearchOptionsDto } from '@cyl-app/dto';

export default abstract class IBudgetRepository {
  abstract findByMonth(
    month: string,
    year: number,
    queryOptions: SearchOptionsDto
  ): Promise<BudgetDto | undefined>;
}
