export type Pagination = {
  page: number | null;
  itemsPerPage: number | null;
  totalItems: number | null;
  totalPages: number | null;
  hasNext: boolean;
  hasPrev: boolean;
};
