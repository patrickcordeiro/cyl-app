import { SearchResponse, BudgetDto } from '@cyl-app/dto';
import { fetchWrapper } from './fetchWrapper';

export const budgetService = {
  async search(params: { month: string; year: number }): Promise<SearchResponse<BudgetDto>> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    );

    return fetchWrapper.get<SearchResponse<BudgetDto>>(
      `${process.env.NEXT_PUBLIC_API_URL}/budgets/novembro/2025`,
      { headers }
    );
  },
};
