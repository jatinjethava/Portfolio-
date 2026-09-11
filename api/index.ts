import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server/src/app';

export default function handler(req: VercelRequest, res: VercelResponse) {
    try {
        app(req as any, res as any);
    } catch (err: any) {
        console.error('[Vercel Handler] Error:', err?.message || err);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: 'ServerError',
                message: 'An internal server error occurred.',
                debug: process.env.NODE_ENV !== 'production' ? (err?.message || String(err)) : undefined,
            });
        }
    }
}
