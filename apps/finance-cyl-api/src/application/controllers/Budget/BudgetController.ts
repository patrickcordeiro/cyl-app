import { z } from 'zod';
import { injectable } from 'inversify';
import { Request } from 'express';

import { CustomError } from '@shared/errors';
import { getRequestInfo, validateSchema } from '@shared/utils';

import { IBudgetController } from '@interfaces/controllers';
import { IBudgetService } from '@interfaces/services';

const monthSchema = z.object({
  month: z.enum([
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
  ]),
  year: z.coerce.number(),
});

@injectable()
export default class BudgetController implements IBudgetController {
  constructor(private service: IBudgetService) {}

  async findByMonth(req: Request) {
    const { params } = getRequestInfo(req);

    if (!params?.month) {
      new CustomError('Month param is missing', 400);
    }

    if (!params?.year) {
      new CustomError('Year param is missing', 400);
    }

    validateSchema(params, monthSchema);

    const budget = await this.service.findByMonth(
      params.month,
      Number(params.year)
    );

    return budget;
  }
}
