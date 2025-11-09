import { z } from 'zod';

export const ExpenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  dueDate: z.date(),
  paymentDate: z.date().nullable(),
  expectedAmount: z.number(),
  payAmmount: z.number().nullable(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type ExpenseDto = z.infer<typeof ExpenseSchema>;
