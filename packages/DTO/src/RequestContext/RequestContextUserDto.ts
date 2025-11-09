import { z } from 'zod';

export const RequestContextUserSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  username: z.string().nullable(),
  email: z.string().nullable(),
  photo: z.string().nullable(),
  groups: z.string().array(),
});

export type RequestContextUserDto = z.infer<typeof RequestContextUserSchema>;
