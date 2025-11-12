import { z } from 'zod';
import { Request } from 'express';
import { ValidationError } from '@application/errors';
import {
  RequestContextDto,
  SearchOptionsDto,
  SearchOptionsSchema,
} from '@cyl-app/dto';
import validateSchema from './validateSchema';

export type RequestInfo<T> = {
  params: Record<string, string>;
  body: T;
  contextParams: RequestContextDto | undefined;
  query: SearchOptionsDto;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function getRequestInfo<T extends z.ZodSchema = any>(
  req: Request,
  schemaBody?: T
): RequestInfo<z.infer<T>> {
  const { body, params, contextParams, query } = req as Request & {
    contextParams?: RequestContextDto;
  };
  let data = body;

  // if (!contextParams) {
  // throw new UnauthorizedError('User is not logged in');
  // }

  if (schemaBody) {
    const parsed = schemaBody.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues
        .flatMap(i => i.path)
        .filter(i => typeof i === 'string');
      throw new ValidationError(errors);
    }
    data = parsed.data;
  }

  const validatedQuery = validateSchema(query, SearchOptionsSchema);

  return {
    body: data,
    params,
    query: validatedQuery as SearchOptionsDto,
    contextParams,
  };
}
