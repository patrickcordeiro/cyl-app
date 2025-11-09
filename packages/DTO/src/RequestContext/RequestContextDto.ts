import { z } from 'zod';
import { RequestContextLanguageSchema } from './RequestContextLanguageDto';
import { RequestContextRealmSchema } from './RequestContextRealmDto';
import { RequestContextUserSchema } from './RequestContextUserDto';

export const RequestContextSchema = z.object({
  user: RequestContextUserSchema,
  realm: RequestContextRealmSchema,
  language: RequestContextLanguageSchema,
});

export type RequestContextDto = z.infer<typeof RequestContextSchema>;
