import { ValidationError } from '@application/errors';

export default function getValidDate(date: Date | string | null): Date {
  if (!date) {
    throw new ValidationError(['date']);
  }

  if (date instanceof Date) {
    return date;
  }

  if (!date.includes('/')) {
    throw new ValidationError(['date']);
  }

  const parts = date.split('/');

  if (parts.length !== 3) {
    throw new ValidationError(['date']);
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JS Date
  const year = parseInt(parts[2], 10);

  const parsedDate = new Date(year, month, day);

  if (isNaN(parsedDate.getTime())) {
    throw new ValidationError(['date']);
  }

  return parsedDate;
}
