import { z } from 'zod';

const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const IncomeCreateSchema = z.object({
  name: z.string(),
  expectedDate: z.string().regex(dateRegex, {
    message: 'expectedDate deve estar no formato DD/MM/YYYY',
  }),
  receiptDate: z
    .string()
    .regex(dateRegex, {
      message: 'receiptDate deve estar no formato DD/MM/YYYY',
    })
    .nullable()
    .default(null),
  expectedAmount: z.coerce.number(),
  receiptAmount: z.coerce.number().nullable().default(null),
  active: z.boolean().default(true),
});

export type IncomeCreateDto = z.infer<typeof IncomeCreateSchema>;
