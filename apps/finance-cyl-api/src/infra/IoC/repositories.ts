import { Container } from 'inversify';
import {
  IExpenseRepository,
  IIncomeRepository,
} from '@interfaces/repositories';
import IncomeRepository from '@infra/data/repositories/Income/IncomeRepository';
import { ExpenseRepository } from '@infra/data/repositories';

export default function bindRepositories(container: Container) {
  container.bind(IIncomeRepository).to(IncomeRepository);
  container.bind(IExpenseRepository).to(ExpenseRepository);
}
