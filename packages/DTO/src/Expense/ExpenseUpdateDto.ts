import { z } from 'zod';

const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const ExpenseUpdateSchema = z.object({
  name: z.string().optional(),
  dueDate: z
    .string()
    .regex(dateRegex, {
      message: 'dueDate deve estar no formato DD/MM/YYYY',
    })
    .optional(),
  paymentDate: z
    .string()
    .regex(dateRegex, {
      message: 'paymentDate deve estar no formato DD/MM/YYYY',
    })
    .nullable()
    .optional()
    .default(null),
  expectedAmount: z.coerce.number().optional(),
  payAmount: z.coerce.number().nullable().optional().default(null),
  active: z.boolean().optional().default(true),
});

export type ExpenseUpdateDto = z.infer<typeof ExpenseUpdateSchema>;
