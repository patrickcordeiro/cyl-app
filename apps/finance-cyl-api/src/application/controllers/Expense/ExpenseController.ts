import { z } from 'zod';
import { injectable } from 'inversify';
import { Request } from 'express';

import { ExpenseCreateSchema, ExpenseUpdateSchema } from '@cyl-app/dto';

import { CustomError } from '@shared/errors';
import { getRequestInfo, validateSchema } from '@shared/utils';

import { IExpenseController } from '@interfaces/controllers';
import { IExpenseService } from '@interfaces/services';

const idSchema = z.object({
  id: z.uuidv4(),
});

@injectable()
export default class ExpenseController implements IExpenseController {
  constructor(private service: IExpenseService) {}

  async search(req: Request) {
    const { query } = getRequestInfo(req);

    const expenses = await this.service.search(query);

    return expenses;
  }

  async findById(req: Request) {
    const { params } = getRequestInfo(req);

    if (!params?.id) {
      new CustomError('Id expense missing', 400);
    }

    validateSchema(params, idSchema);

    const expense = await this.service.findById(params.id);

    return expense.toJSON();
  }

  async create(req: Request) {
    const { body } = getRequestInfo(req, ExpenseCreateSchema);

    const expense = await this.service.create(body);

    return expense.toJSON();
  }

  async update(req: Request) {
    const { params, body } = getRequestInfo(req, ExpenseUpdateSchema);

    if (!params?.id) {
      new CustomError('Id expense missing', 400);
    }

    validateSchema(params, idSchema);

    const expense = await this.service.update(params.id, body);

    return expense.toJSON();
  }

  async delete(req: Request) {
    const { params } = getRequestInfo(req);

    if (!params?.id) {
      new CustomError('Id expense missing', 400);
    }

    validateSchema(params, idSchema);

    await this.service.delete(params.id);

    return;
  }
}
