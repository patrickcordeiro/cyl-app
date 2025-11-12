import { z } from 'zod';
import { injectable } from 'inversify';
import { Request } from 'express';

import { IncomeCreateSchema, IncomeUpdateSchema } from '@cyl-app/dto';

import { CustomError } from '@shared/errors';
import { getRequestInfo, validateSchema } from '@shared/utils';

import { IIncomeController } from '@interfaces/controllers';
import { IIncomeService } from '@interfaces/services';

const idSchema = z.object({
  id: z.uuidv4(),
});

@injectable()
export default class IncomeController implements IIncomeController {
  constructor(private service: IIncomeService) {}

  async search(req: Request) {
    const { query } = getRequestInfo(req);

    const incomes = await this.service.search(query);

    return incomes;
  }

  async findById(req: Request) {
    const { params } = getRequestInfo(req);

    if (!params?.id) {
      new CustomError('Id income missing', 400);
    }

    validateSchema(params, idSchema);

    const income = await this.service.findById(params.id);

    return income.toJSON();
  }

  async create(req: Request) {
    const { body } = getRequestInfo(req, IncomeCreateSchema);

    const income = await this.service.create(body);

    return income.toJSON();
  }

  async update(req: Request) {
    const { params, body } = getRequestInfo(req, IncomeUpdateSchema);

    if (!params?.id) {
      new CustomError('Id income missing', 400);
    }

    validateSchema(params, idSchema);

    const income = await this.service.update(params.id, body);

    return income.toJSON();
  }

  async delete(req: Request) {
    const { params } = getRequestInfo(req);

    if (!params?.id) {
      new CustomError('Id income missing', 400);
    }

    validateSchema(params, idSchema);

    await this.service.delete(params.id);

    return;
  }
}
