import { Container } from 'inversify';
import { IIncomeController } from '@interfaces/controllers';
import IncomeController from '@application/controllers/Income/IncomeController';

export default function bindControllers(container: Container) {
  container.bind(IIncomeController).to(IncomeController);
}
