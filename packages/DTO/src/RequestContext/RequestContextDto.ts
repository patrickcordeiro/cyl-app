import { z } from 'zod';
import { RequestContextUserSchema } from './RequestContextUserDto.js';
import { RequestContextRealmSchema } from './RequestContextRealmDto.js';
import { RequestContextLanguageSchema } from './RequestContextLanguageDto.js';

export const RequestContextSchema = z.object({
  user: RequestContextUserSchema,
  realm: RequestContextRealmSchema,
  language: RequestContextLanguageSchema,
});

export type RequestContextDto = z.infer<typeof RequestContextSchema>;
