import { Response } from 'express';
import { ErrorResponse } from '@cyl-app/dto';

export default function responseError(
  res: Response,
  objError: ErrorResponse,
  status: number
): Response<ErrorResponse> {
  const { message, cause, details } = objError;

  return res.status(status).json({
    message: message,
    cause: cause || null,
    details: details?.length > 0 ? details : [],
  });
}
