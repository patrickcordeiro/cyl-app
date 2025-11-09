import { Request, Response } from 'express';
import { Logger } from '@infra/logging';
import { responseError } from '@shared/utils';

export default (_req: Request, res: Response): Response => {
  Logger.debug("Attempt to access a route that doesn't exist");

  return responseError(
    res,
    {
      message: 'Route Not Found',
      cause: null,
      details: [],
    },
    404
  );
};
