import { Pagination } from '@cyl-app/dto';
import { CustomError } from '@shared/errors';

interface IPaginationParams {
  total: number;
  page: number;
  itemsPerPage: number;
}

interface IPagination {
  pagination: Pagination;
}

export default function pagination({
  total,
  page,
  itemsPerPage,
}: IPaginationParams): IPagination {
  const total_pages = Math.ceil(total / itemsPerPage);

  if (total > 0 && page > total_pages) {
    throw new CustomError(`Página ${page} não encontrada`, 400);
  }

  return {
    pagination: {
      page: total > 0 ? page : null,
      itemsPerPage: total > 0 ? itemsPerPage : null,
      totalPages: total_pages > 0 ? total_pages : null,
      totalItems: total > 0 ? total : null,
      hasNext: page < total_pages,
      hasPrev: page > 1,
    },
  };
}
