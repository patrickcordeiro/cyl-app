import { config } from 'dotenv';
import { z } from 'zod';
import { Logger } from '@infra/logging';

config({
  quiet: true,
});

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['production', 'staging', 'development', 'test']),

  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string(),
  DB_CA: z.string().optional().nullable().default(null),
});

let env: z.infer<typeof envSchema>;

function getEnv() {
  if (env) {
    return env;
  }

  const data = envSchema.safeParse(process.env);

  if (data.success) {
    env = data.data;
    return data.data;
  }

  const messages = data.error?.issues.reduce((acc, item) => {
    acc.push(`${String(item.path[0])}: ${item.message}`);
    return acc;
  }, [] as string[]);

  Logger.error(`Environments Error:\r\n${messages.join('\r\n')}`);
  // eslint-disable-next-line no-process-exit
  return process.exit(0);
}

export default getEnv();
