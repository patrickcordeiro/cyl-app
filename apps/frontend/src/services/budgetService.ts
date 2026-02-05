import { BudgetDto } from '@cyl-app/dto';
import { fetchWrapper } from './fetchWrapper';

export const budgetService = {
  async search({ month, year }: { month: string; year: number }): Promise<BudgetDto> {
    const headers = {
      'Content-Type': 'application/json',
    };

    return fetchWrapper.get<BudgetDto>(
      `${process.env.NEXT_PUBLIC_API_URL}/budgets/${month}/${year}`,
      { headers }
    );
  },
};
