import { ValidationError } from '@application/errors';

const hasProperty = (value: object) => Object.entries(value).length === 0;

const isInvalidDate = (value: unknown) =>
  value instanceof Date && Number.isNaN(value.getTime());
const isInvalidObject = (value: unknown) =>
  typeof value === 'object' &&
  !(value instanceof Date) &&
  (value === null || hasProperty(value));
const isInvalidString = (value: unknown) =>
  typeof value === 'string' && value.length === 0;
const isInvalidArray = (value: unknown) =>
  Array.isArray(value) && value.length === 0;
const isUndefined = (value: unknown) => typeof value === 'undefined';

export default function validateObject<T = null>(
  object: unknown,
  requiredFields: Array<keyof T> | string[]
): void {
  const errors: Array<string | number | symbol> = [];
  const entries = Object.entries(object as Record<string, unknown>);

  requiredFields.forEach(requiredField => {
    const entry = entries.find(([k]) => k === requiredField);

    if (entry) {
      const [key, value] = entry;

      if (
        isUndefined(value) ||
        isInvalidArray(value) ||
        isInvalidDate(value) ||
        isInvalidObject(value) ||
        isInvalidString(value)
      ) {
        errors.push(key);
      }
    } else {
      errors.push(requiredField);
    }
  });

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
