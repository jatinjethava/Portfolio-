import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../services/redisService.js';

export const rateLimiter = (maxRequests: number = 60, windowSeconds: number = 60) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-client';
    const key = `ratelimit:${req.path}:${ip}`;

    const { allowed, remaining } = await redisClient.checkRateLimit(key, maxRequests, windowSeconds);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (!allowed) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: `Rate limit threshold of ${maxRequests} requests per ${windowSeconds}s reached. Please slow down.`,
      });
    }

    next();
  };
};
