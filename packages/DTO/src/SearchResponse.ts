import { Pagination } from './Pagination.js';

export type SearchResponse<T> = {
  pagination: Pagination;
  data: T[];
};
