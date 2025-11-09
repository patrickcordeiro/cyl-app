import { NextFunction, Request, Response } from 'express';
import { Logger } from '@infra/logging';
import { ValidationError } from '@application/errors';
import { CustomError } from '@shared/errors';
import { responseError } from '@shared/utils';
import { ErrorResponse } from '@cyl-app/dto';

/**
 * Error Middleware
 * @returns express.Response
 */
export default function errorMiddleware() {
  return (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<ErrorResponse> => {
    const internalServerErrorMessage = 'Erro interno no servidor';

    if (!error) {
      next();
    }

    const { message: messageDefault, cause: causeDefault } = error;

    if (error instanceof ValidationError) {
      const messageError = `Invalid Params: ${messageDefault || ''}`;
      const causeError = causeDefault ? String(causeDefault) : null;
      const detailsError = error.fields.map(e => String(e));

      Logger.error(messageError);

      return responseError(
        res,
        {
          message: messageError,
          cause: causeError,
          details: detailsError,
        },
        400
      );
    }

    if (error instanceof CustomError) {
      const { sqlMessage } = (<unknown>error) as Record<string, string>;

      if (sqlMessage) {
        Logger.error(sqlMessage);

        return responseError(
          res,
          {
            message: internalServerErrorMessage,
            cause: causeDefault ? String(causeDefault) : 'db',
            details: [],
          },
          500
        );
      }

      Logger.error(messageDefault);

      return responseError(
        res,
        {
          message: messageDefault || internalServerErrorMessage,
          cause: causeDefault ? String(causeDefault) : null,
          details: [],
        },
        error.httpStatus || 500
      );
    }

    return responseError(
      res,
      {
        message: internalServerErrorMessage,
        cause: causeDefault ? String(causeDefault) : null,
        details: [],
      },
      500
    );
  };
}
