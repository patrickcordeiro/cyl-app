import { z } from 'zod';

export const RequestContextLanguageSchema = z.enum(['pt-BR', 'en-US', 'es-ES']);

export type RequestContextLanguageDto = z.infer<
  typeof RequestContextLanguageSchema
>;
