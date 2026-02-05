'use client';

import InputMonthYear from '@/components/InputMonthYear';
import { useSearchBudgets } from '@/hooks/getBudgetsByMonth';
import formatCurrency from '@/utils/formatCurrency';
import formatDate from '@/utils/formatDate';
import { useState } from 'react';

export default function BudgetPage() {
  const date = new Date();
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear());

  const {
    data: budgetList,
    isLoading,
    isError,
  } = useSearchBudgets({
    month: month,
    year: year,
  });

  console.log(budgetList);

  const statusIncome = (incomeExpectedDate: Date, incomeReceiptDate: Date | null) => {
    if (date > incomeExpectedDate && !incomeReceiptDate) {
      return 'Atrasado';
    }

    if (date < incomeExpectedDate && !incomeReceiptDate) {
      return 'Pendente';
    }

    return 'Recebido';
  };

  const statusExpense = (expenseDueDate: Date, expensePaymentDate: Date | null) => {
    if (date > expenseDueDate && !expensePaymentDate) {
      return 'Vencido';
    }

    if (date < expenseDueDate && !expensePaymentDate) {
      return 'Pendente';
    }

    return 'Pago';
  };

  if (isError) {
    return <div>Erro ao listar</div>;
  }

  if (isLoading) {
    return <div>Carregando</div>;
  }

  if (!budgetList) {
    return <div>Orçamento do mês não encontrado</div>;
  }

  return (
    <div className="flex h-screen w-full border-2">
      <div className="flex w-full flex-col items-center gap-3 border-2 border-solid border-red-500">
        <h1 className="text-4xl font-bold">Orçamento Mensal</h1>
        <div className="flex items-center gap-3">
          <InputMonthYear
            actualMonth={month}
            actualYear={year}
            setMonth={setMonth}
            setYear={setYear}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-md p-5 shadow-md">
            Receitas: {formatCurrency(budgetList?.incomesAmountTotal)}
          </div>
          <div className="rounded-md p-5 shadow-md">
            Despesas: {formatCurrency(budgetList?.expensesAmountTotal)}
          </div>
          <div className="rounded-md p-5 shadow-md">
            Saldo:{' '}
            <span
              className={
                budgetList?.balanceMonth && budgetList?.balanceMonth >= 0
                  ? `text-green-500`
                  : `text-red-500`
              }
            >
              {formatCurrency(budgetList?.balanceMonth)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col rounded-md p-5 shadow-md">
            <h2>Receitas</h2>

            {!budgetList.incomes.length && <div>Nenhuma receita cadastrada para o mês</div>}
            {budgetList.incomes.map((income) => {
              return (
                <div className="flex gap-3" key={income.id}>
                  <p>{formatDate(income.expectedDate)}</p>
                  <h3>{income.name}</h3>
                  <p>{formatCurrency(income.expectedAmount)}</p>
                  <p className={income.receiptDate ? `text-green-500` : `text-yellow-500`}>
                    {statusIncome(
                      new Date(income.expectedDate),
                      income.receiptDate ? new Date(income.receiptDate) : null
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col rounded-md p-5 shadow-md">
            <h2>Despesas</h2>

            {!budgetList?.expenses.length && <div>Nenhuma despesa cadastrada para o mês</div>}

            {budgetList?.expenses.map((expense) => {
              return (
                <div className="flex gap-3" key={expense.id}>
                  <p>{formatDate(expense.dueDate)}</p>
                  <h3>{expense.name}</h3>
                  <p>{formatCurrency(expense.expectedAmount)}</p>
                  <p className={expense.paymentDate ? `text-green-500` : `text-yellow-500`}>
                    {statusExpense(
                      new Date(expense.dueDate),
                      expense.paymentDate ? new Date(expense.paymentDate) : null
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
