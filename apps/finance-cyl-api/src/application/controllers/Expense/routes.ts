import express from 'express';

import routerHandler from '../routerHandler';
import container from '@infra/IoC';
import { IExpenseController } from '@interfaces/controllers';

const controller = container.get<IExpenseController>(IExpenseController);

const router = express.Router();

router.get('/search', routerHandler(controller, 'search', { status: 200 }));

router.get('/:id', routerHandler(controller, 'findById', { status: 200 }));

router.post('/', routerHandler(controller, 'create', { status: 201 }));

router.patch('/:id', routerHandler(controller, 'update', { status: 200 }));

router.delete('/:id', routerHandler(controller, 'delete', { status: 204 }));

export const expenseRouter = { basePath: '/expenses', router };
