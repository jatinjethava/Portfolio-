import Redis from 'ioredis';
import { config } from '../config/index.js';

class RedisService {
  private client: Redis | null = null;
  private isConnected = false;
  private memoryCache = new Map<string, { val: string; expiry: number }>();
  private rateLimitMap = new Map<string, { count: number; resetAt: number }>();

  constructor() {
    try {
      const isCloudOrProd = config.env === 'production' || !!process.env.VERCEL;
      const isLocalRedis = !config.redisUrl || config.redisUrl.includes('localhost') || config.redisUrl.includes('127.0.0.1');

      // In serverless / cloud without an external Redis URL, use fast in-memory store
      if (isCloudOrProd && isLocalRedis) {
        console.log('[RedisService] Cloud serverless detected without remote Redis. Using in-memory caching & rate limiter.');
        return;
      }

      this.client = new Redis(config.redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        enableReadyCheck: false,
        connectTimeout: 1500,
        commandTimeout: 1500,
      });

      this.client.connect().then(() => {
        this.isConnected = true;
        console.log('✅ Remote Redis connected');
      }).catch((err) => {
        this.isConnected = false;
        console.warn('⚠️ Redis connection skipped/unavailable:', err.message);
      });

      this.client.on('error', (_err) => {
        this.isConnected = false;
      });
    } catch (err) {
      this.isConnected = false;
      this.client = null;
      console.warn('[RedisService] Constructor failed, using in-memory fallback:', (err as Error).message);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.isConnected && this.client) {
      try {
        const data = await this.client.get(key);
        if (!data) return null;
        return JSON.parse(data) as T;
      } catch {
        // fallback to memory
      }
    }

    const item = this.memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    try {
      return JSON.parse(item.val) as T;
    } catch {
      return null;
    }
  }

  async set(key: string, data: unknown, ttlSeconds: number = 300): Promise<void> {
    const serialized = JSON.stringify(data);
    if (this.isConnected && this.client) {
      try {
        await this.client.set(key, serialized, 'EX', ttlSeconds);
        return;
      } catch {
        // fallback to memory
      }
    }

    this.memoryCache.set(key, {
      val: serialized,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    if (this.isConnected && this.client) {
      try {
        await this.client.del(key);
      } catch {
        // ignore
      }
    }
    this.memoryCache.delete(key);
  }

  async delPattern(patternPrefix: string): Promise<void> {
    if (this.isConnected && this.client) {
      try {
        const keys = await this.client.keys(`${patternPrefix}*`);
        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      } catch {
        // ignore
      }
    }
    for (const k of this.memoryCache.keys()) {
      if (k.startsWith(patternPrefix)) {
        this.memoryCache.delete(k);
      }
    }
  }

  async checkRateLimit(identifier: string, limit: number = 10, windowSeconds: number = 60): Promise<{ allowed: boolean; remaining: number }> {
    if (this.isConnected && this.client) {
      try {
        const key = `ratelimit:${identifier}`;
        const pipeline = this.client.pipeline();
        pipeline.incr(key);
        pipeline.ttl(key);

        const results = await pipeline.exec();
        if (results && results[0] && results[1]) {
          const currentCount = results[0][1] as number;
          const ttl = results[1][1] as number;

          if (ttl === -1) {
            await this.client.expire(key, windowSeconds);
          }

          if (currentCount > limit) {
            return { allowed: false, remaining: 0 };
          }
          return { allowed: true, remaining: Math.max(0, limit - currentCount) };
        }
      } catch {
        // fallback to in-memory limiter below
      }
    }

    // In-memory rate limiting fallback
    const now = Date.now();
    const entry = this.rateLimitMap.get(identifier);

    if (!entry || now > entry.resetAt) {
      this.rateLimitMap.set(identifier, {
        count: 1,
        resetAt: now + windowSeconds * 1000,
      });
      return { allowed: true, remaining: limit - 1 };
    }

    entry.count += 1;
    if (entry.count > limit) {
      return { allowed: false, remaining: 0 };
    }

    return { allowed: true, remaining: limit - entry.count };
  }
}

export const redisClient = new RedisService();