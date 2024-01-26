import { z } from 'zod';

const envSchema = z.object({
  // NODE_ENV
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = parsedEnv.data;
