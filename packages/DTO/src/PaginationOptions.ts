import { z } from 'zod';

export const PaginationOptionsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  itemsPerPage: z.coerce.number().optional().default(10),
});

export type PaginationOptions = z.infer<typeof PaginationOptionsSchema>;
