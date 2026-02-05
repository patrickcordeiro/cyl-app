import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BudgetDto } from '@cyl-app/dto';
import { budgetService } from '@/services/budgetService';

interface UseSearchBudgetsProps {
  month: string;
  year: number;
}

export function useSearchBudgets({ month, year }: UseSearchBudgetsProps) {
  return useQuery<BudgetDto>({
    queryKey: ['budgets', { month, year }],
    queryFn: () =>
      budgetService.search({
        month,
        year,
      }),
    placeholderData: keepPreviousData, // mantém dados da página anterior enquanto carrega a nova
    staleTime: 1000 * 60 * 1, // 1 min
  });
}
