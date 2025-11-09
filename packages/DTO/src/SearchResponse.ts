import { Pagination } from './Pagination';

export type SearchResponse<T> = {
  pagination: Pagination;
  data: T[];
};
