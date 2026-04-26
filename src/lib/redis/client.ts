// src/lib/redis/client.ts

import { Redis } from '@upstash/redis';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Global Redis client instance.
 * Note: If environment variables are missing during build/dev,
 * this will fail gracefully on the first attempted call if not initialized.
 */
export const redis = new Redis({
  url: redisUrl || '',
  token: redisToken || '',
});

export default redis;
