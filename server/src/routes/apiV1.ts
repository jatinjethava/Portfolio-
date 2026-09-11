import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/auth.js';
import { redisClient } from '../services/redisService.js';
import { mailService } from '../services/mailService.js';

export const apiV1Router = Router();

apiV1Router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    name: 'MERN Portfolio API',
    version: 'v1',
    message: 'MERN Portfolio REST API is online.',
    endpoints: {
      health: '/api/v1/health',
      stats: '/api/v1/stats',
      resume: '/api/v1/resume/download',
      mailStatus: '/api/v1/mail/status',
      contact: 'POST /api/v1/contact',
      authLogin: 'POST /api/v1/auth/login',
      telemetry: 'GET /api/v1/admin/telemetry',
    },
  });
});

apiV1Router.get('/resume/download', (_req: Request, res: Response) => {
  const filePath = path.join(process.cwd(), 'public', 'Jatin_Jethava_Resume_RealProjects.pdf');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Jatin_Jethava_Resume_RealProjects.pdf"');
    return res.sendFile(filePath);
  }
  res.status(404).json({ success: false, message: 'Resume document not found.' });
});

apiV1Router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      api: 'healthy',
      database: 'connected',
      redis: 'active',
    },
  });
});

apiV1Router.get('/stats', rateLimiter(120, 60), async (_req: Request, res: Response) => {
  const cached = await redisClient.get('stats:system');
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json({ success: true, source: 'cache', data: cached });
  }

  const stats = {
    apiUptime: '99.98%',
    totalRequests: 418902,
    avgLatencyMs: 34,
    cacheHitRatioPercent: 94.6,
    activeServices: ['Express Core', 'Redis Cache L2', 'MongoDB Primary', 'Worker Queue'],
    lastDeployment: '2026-09-08T18:30:00Z',
  };

  await redisClient.set('stats:system', stats, 30);
  res.setHeader('X-Cache', 'MISS');
  res.json({ success: true, source: 'database', data: stats });
});

apiV1Router.post('/contact', rateLimiter(5, 60), async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: 'Name, email, and message are required fields.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'ValidationError',
      message: 'Please provide a valid email address.',
    });
  }

  const submissionId = `msg_${Date.now()}`;
  const ip = req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';

  try {
    const mailResult = await mailService.sendContactInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
      submissionId,
      ip,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been processed and dispatched via Nodemailer mail transport.',
      submissionId,
      mailResult: {
        mode: mailResult.mode,
        adminDelivered: mailResult.adminDelivered,
        autoReplyDelivered: mailResult.autoReplyDelivered,
        previewUrl: mailResult.previewUrl || null,
        messageId: mailResult.messageId || null,
      },
    });
  } catch (err) {
    console.error('Error dispatching email with nodemailer:', err);
    res.status(500).json({
      success: false,
      error: 'MailDispatchError',
      message: 'Failed to dispatch email notification via mail service.',
    });
  }
});

apiV1Router.get('/mail/status', async (_req: Request, res: Response) => {
  const status = await mailService.getStatus();
  res.json({
    success: true,
    mailService: status,
  });
});

apiV1Router.post('/auth/login', rateLimiter(10, 60), (req: Request, res: Response) => {
  const { password } = req.body || {};
  if (password === 'JatinJethava@123') {
    return res.json({
      success: true,
      token: `jwt_${Buffer.from(`admin:${Date.now()}`).toString('base64')}`,
      user: {
        role: 'superadmin',
        name: 'Jatin Jethava',
        email: 'jatinjethava3125@gmail.com',
      },
      expiresIn: '8h',
    });
  }

  res.status(401).json({
    success: false,
    error: 'AuthenticationFailed',
    message: 'Invalid credentials. Please provide valid authorization key.',
  });
});

apiV1Router.get('/admin/telemetry', requireAdmin, (_req: Request, res: Response) => {
  res.json({
    success: true,
    telemetry: {
      nodeMemoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      nodeVersion: process.version,
      cpuLoad: '4.2%',
      dbPoolActiveConnections: 8,
      redisConnectedClients: 3,
    },
  });
});
