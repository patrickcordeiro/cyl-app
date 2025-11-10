import { Container } from 'inversify';
import { IIncomeService } from '@interfaces/services';
import IncomeService from '@services/Income/IncomeService';

export default function bindServices(container: Container) {
  container.bind(IIncomeService).to(IncomeService);
}
