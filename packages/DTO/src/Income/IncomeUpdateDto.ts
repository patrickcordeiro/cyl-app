import { z } from 'zod';

export const IncomeUpdateSchema = z.object({
  name: z.string().optional(),
  expectedDate: z.date().optional(),
  receiptDate: z.date().nullable().optional(),
  expectedAmount: z.number().optional(),
  receiptAmount: z.number().nullable().optional(),
  active: z.boolean().optional(),
});

export type IncomeUpdateDto = z.infer<typeof IncomeUpdateSchema>;
