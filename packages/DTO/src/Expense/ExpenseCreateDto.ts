import { z } from 'zod';

const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const ExpenseCreateSchema = z.object({
  name: z.string(),
  dueDate: z.string().regex(dateRegex, {
    message: 'dueDate deve estar no formato DD/MM/YYYY',
  }),
  paymentDate: z
    .string()
    .regex(dateRegex, {
      message: 'paymentDate deve estar no formato DD/MM/YYYY',
    })
    .nullable()
    .default(null),
  expectedAmount: z.coerce.number(),
  payAmount: z.coerce.number().nullable().default(null),
  active: z.boolean().default(true),
});

export type ExpenseCreateDto = z.infer<typeof ExpenseCreateSchema>;
