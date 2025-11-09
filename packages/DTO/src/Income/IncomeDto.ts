import { z } from 'zod';

export const IncomeSchema = z.object({
  id: z.string(),
  name: z.string(),
  expectedDate: z.date(),
  receiptDate: z.date().nullable(),
  expectedAmount: z.number(),
  receiptAmount: z.number().nullable(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type IncomeDto = z.infer<typeof IncomeSchema>;
