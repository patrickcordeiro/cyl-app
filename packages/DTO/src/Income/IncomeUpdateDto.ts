import { z } from 'zod';

const dateRegex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const IncomeUpdateSchema = z.object({
  name: z.string().optional(),
  expectedDate: z
    .string()
    .regex(dateRegex, {
      message: 'expectedDate deve estar no formato DD/MM/YYYY',
    })
    .optional(),
  receiptDate: z
    .string()
    .regex(dateRegex, {
      message: 'receiptDate deve estar no formato DD/MM/YYYY',
    })
    .nullable()
    .optional()
    .default(null),
  expectedAmount: z.coerce.number().optional(),
  receiptAmount: z.coerce.number().nullable().optional().default(null),
  active: z.boolean().optional().default(true),
});

export type IncomeUpdateDto = z.infer<typeof IncomeUpdateSchema>;
