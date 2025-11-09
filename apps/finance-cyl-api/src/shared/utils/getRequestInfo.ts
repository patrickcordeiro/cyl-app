import { z } from 'zod';
import { Request } from 'express';
import { UnauthorizedError, ValidationError } from '@application/errors';
import { RequestContextDto, SearchOptionsDto } from '@cyl-app/dto';

export type RequestInfo<T> = {
  params: Record<string, string>;
  body: T;
  contextParams: RequestContextDto;
  query: SearchOptionsDto;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getRequestInfo<T extends z.ZodSchema = any>(
  req: Request,
  schema?: T
): RequestInfo<z.infer<T>> {
  const { body, params, contextParams, query } = req as Request & {
    contextParams?: RequestContextDto;
  };
  let data = body;

  if (!contextParams) {
    throw new UnauthorizedError('User is not logged in');
  }

  if (schema) {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues
        .flatMap(i => i.path)
        .filter(i => typeof i === 'string');
      throw new ValidationError(errors);
    }
    data = parsed.data;
  }

  return {
    body: data,
    params,
    query: query as SearchOptionsDto,
    contextParams,
  };
}
