import Redis from 'ioredis';
import { config } from '../config';

class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis(config.redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      keepAlive: 10000,
      connectTimeout: 10000,
      commandTimeout: 10000,
    });

    this.client.on('connect', () => {
      console.log('✅ Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis error:', err.message);
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (err) {
      console.error(`[Redis] Get Error for key ${key}:`, err);
      return null;
    }
  }

  async set(key: string, data: unknown, ttlSeconds: number = 300): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds);
    } catch (err) {
      console.error(`[Redis] Set Error for key ${key}:`, err);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`[Redis] Del Error for key ${key}:`, err);
    }
  }

  async delPattern(patternPrefix: string): Promise<void> {
    try {
      const keys = await this.client.keys(`${patternPrefix}*`);
      if (keys.length > 0) {
        await this.client.del(...keys);
      }
    } catch (err) {
      console.error(`[Redis] delPattern Error:`, err);
    }
  }

  async checkRateLimit(identifier: string, limit: number = 10, windowSeconds: number = 60): Promise<{ allowed: boolean; remaining: number }> {
    try {
      const key = `ratelimit:${identifier}`;
      const pipeline = this.client.pipeline();
      pipeline.incr(key);
      pipeline.ttl(key);

      const results = await pipeline.exec();
      if (!results) return { allowed: true, remaining: limit - 1 };

      const currentCount = results[0][1] as number;
      const ttl = results[1][1] as number;

      if (ttl === -1) {
        await this.client.expire(key, windowSeconds);
      }

      if (currentCount > limit) {
        return { allowed: false, remaining: 0 };
      }

      return { allowed: true, remaining: limit - currentCount };
    } catch (err) {
      console.error(`[Redis] RateLimit Error for identifier ${identifier}:`, err);
      return { allowed: true, remaining: 1 };
    }
  }
}

export const redisClient = new RedisService();
