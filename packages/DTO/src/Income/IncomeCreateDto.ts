import { z } from 'zod';

export const IncomeCreateSchema = z.object({
  name: z.string(),
  expectedDate: z.date(),
  receiptDate: z.date().nullable().default(null),
  expectedAmount: z.number(),
  receiptAmount: z.number().nullable().default(null),
  active: z.boolean().default(true),
});

export type IncomeCreateDto = z.infer<typeof IncomeCreateSchema>;
