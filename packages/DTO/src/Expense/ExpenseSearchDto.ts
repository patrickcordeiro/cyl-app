import { z } from 'zod';

export const ExpenseSearchSchema = z.object({
  id: z.string(),
  name: z.string(),
  dueDate: z.date(),
  paymentDate: z.date().nullable(),
  expectedAmount: z.number(),
  payAmount: z.number().nullable(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type ExpenseSearchDto = z.infer<typeof ExpenseSearchSchema>;
