import { Container } from 'inversify';
import { IIncomeRepository } from '@interfaces/repositories';
import IncomeRepository from '@infra/data/repositories/Income/IncomeRepository';

export default function bindRepositories(container: Container) {
  container.bind(IIncomeRepository).to(IncomeRepository);
}
