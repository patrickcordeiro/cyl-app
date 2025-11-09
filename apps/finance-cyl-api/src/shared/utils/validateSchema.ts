import { z } from 'zod';
import { ValidationError } from '@application/errors';

export default function validateSchema<T extends z.ZodSchema>(
  value: unknown,
  schema: T
): z.infer<T> {
  const parsed = schema.safeParse(value);

  if (!parsed.success) {
    const errors = parsed.error.issues
      .flatMap(i => i.path)
      .filter(i => typeof i === 'string');
    throw new ValidationError(errors);
  }

  return parsed.data;
}
