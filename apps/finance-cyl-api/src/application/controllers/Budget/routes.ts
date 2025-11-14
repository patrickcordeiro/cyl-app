import express from 'express';

import routerHandler from '../routerHandler';
import container from '@infra/IoC';
import { IBudgetController } from '@interfaces/controllers';

const controller = container.get<IBudgetController>(IBudgetController);

const router = express.Router();

router.get(
  '/:month/:year',
  routerHandler(controller, 'findByMonth', { status: 200 })
);

export const budgetsRouter = { basePath: '/budgets', router };
