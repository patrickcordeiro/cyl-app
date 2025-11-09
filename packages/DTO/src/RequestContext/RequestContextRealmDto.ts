import { z } from 'zod';

export const RequestContextRealmSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type RequestContextRealmDto = z.infer<typeof RequestContextRealmSchema>;
