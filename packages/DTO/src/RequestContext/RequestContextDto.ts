import { z } from 'zod';
import { RequestContextUserSchema } from './RequestContextUserDto';
import { RequestContextRealmSchema } from './RequestContextRealmDto';
import { RequestContextLanguageSchema } from './RequestContextLanguageDto';

export const RequestContextSchema = z.object({
  user: RequestContextUserSchema,
  realm: RequestContextRealmSchema,
  language: RequestContextLanguageSchema,
});

export type RequestContextDto = z.infer<typeof RequestContextSchema>;
