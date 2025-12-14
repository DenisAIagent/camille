import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Redis client
// If no Redis URL is provided, rate limiting will be disabled (development mode)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create a rate limiter that allows:
// - 3 requests per 10 seconds (burst protection)
// - 10 requests per hour (sustained protection)
export const contactRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '10 s'),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null;

export const contactHourlyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      analytics: true,
      prefix: 'ratelimit:contact:hourly',
    })
  : null;
