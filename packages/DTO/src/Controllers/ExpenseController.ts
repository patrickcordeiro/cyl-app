import {
  ExpenseCreateDto,
  ExpenseDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
} from '@/Expense';
import { SearchResponse } from '../SearchResponse';

import { ControllerBase } from './ControllerBase';

export interface ExpenseController extends ControllerBase {
  search: {
    request: undefined;
    response: SearchResponse<ExpenseSearchDto>;
  };
  findById: {
    request: undefined;
    response: ExpenseDto;
  };
  create: {
    request: ExpenseCreateDto;
    response: ExpenseDto;
  };
  update: {
    request: ExpenseUpdateDto;
    response: ExpenseDto;
  };
  delete: {
    request: undefined;
    response: void;
  };
}
