import { Pagination, PaginationOptions } from '@cyl-app/dto';
import { CustomError } from '@shared/errors';

interface IPagination<T> {
  pagination: Pagination;
  dataSorted: T[];
}

export default function pagination<T>(
  {
    limit = '50',
    order = 'asc',
    page = '1',
    sort,
    start = '1',
    itemsPerPage = '5',
  }: PaginationOptions,
  data: T[]
): IPagination<T> {
  const total_pages = Math.ceil(data.length / Number(itemsPerPage)) || 1;

  if (Number(page) > total_pages) {
    throw new CustomError(`Página ${page} não encontrada`, 400);
  }

  const totalItems = Number(limit) < data.length ? Number(limit) : data.length;
  const last =
    Number(page) * Number(itemsPerPage) > totalItems
      ? totalItems
      : Number(page) * Number(itemsPerPage) < Number(start)
        ? Number(start)
        : Number(page) * Number(itemsPerPage);

  const dataPaginated = data.slice(Number(start) - 1, last);

  const dataSorted = sort ? dataPaginated.map(d => d) : dataPaginated;

  return {
    pagination: {
      page: Number(page),
      first: Number(start),
      last,
      itemsPerPage: Number(itemsPerPage),
      totalItems,
      totalPages: total_pages,
      hasNext: Number(page) < total_pages,
      hasPrev: Number(page) > 1,
    },
    dataSorted,
  };
}
