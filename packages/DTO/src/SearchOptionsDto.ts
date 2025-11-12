import { z } from 'zod';
import { PaginationOptionsSchema } from './PaginationOptions.js';

export const SearchOptionsSchema = PaginationOptionsSchema.extend({
  sort: z.string().optional(),
  order: z
    .enum(['asc', 'desc'])
    .transform(val => val.toUpperCase())
    .default('asc'),
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
});

export type SearchOptionsDto = z.infer<typeof SearchOptionsSchema>;
