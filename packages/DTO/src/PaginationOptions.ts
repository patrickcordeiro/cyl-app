import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.string().optional().default('1'),
  start: z.string().optional().default('1'),
  limit: z.string().optional().default('50'),
  itemsPerPage: z.string().optional().default('10'),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']),
});

export type PaginationOptions = z.infer<typeof PaginationSchema>;
