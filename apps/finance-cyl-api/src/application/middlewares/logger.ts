import { Logger } from '@infra/logging';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.method.toUpperCase() === 'OPTIONS') {
    next();
    return;
  }

  const urlCalled = `${req.protocol}://${req.hostname}:${process.env.SERVER_PORT}${req.originalUrl}`;
  const startTime = process.hrtime();
  Logger.httpDebugStart(req.method, urlCalled);

  res.once('finish', () => {
    const elapsedHrTime = process.hrtime(startTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    Logger.httpDebugEnd(
      req.method,
      urlCalled,
      res.statusCode,
      Math.round(elapsedTimeInMs)
    );
  });

  next();
};
