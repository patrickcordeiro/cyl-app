import {
  IncomeCreateDto,
  IncomeDto,
  IncomeSearchDto,
  IncomeUpdateDto,
} from '@/Income';
import { SearchResponse } from '../SearchResponse';

import { ControllerBase } from './ControllerBase';

export interface IncomeController extends ControllerBase {
  search: {
    request: undefined;
    response: SearchResponse<IncomeSearchDto>;
  };
  findById: {
    request: undefined;
    response: IncomeDto;
  };
  create: {
    request: IncomeCreateDto;
    response: IncomeDto;
  };
  update: {
    request: IncomeUpdateDto;
    response: IncomeDto;
  };
  delete: {
    request: undefined;
    response: void;
  };
}
