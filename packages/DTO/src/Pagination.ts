export type Pagination = {
  page: number;
  first: number;
  last: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
