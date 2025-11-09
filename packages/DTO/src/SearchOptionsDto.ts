import { PaginationOptions } from './PaginationOptions';

export type SearchOptionsDto = PaginationOptions & {
  [key: string]: unknown;
};
