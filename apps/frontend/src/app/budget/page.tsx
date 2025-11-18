'use client';

import { useSearchBudgets } from '@/hooks/getBudgetsByMonth';

export default function BudgetPage() {
  const {
    data: budgetList,
    isFetching,
    isError,
  } = useSearchBudgets({
    month: 'novembro',
    year: 2025,
  });

  console.log(budgetList);

  return <div>budget</div>;
}
