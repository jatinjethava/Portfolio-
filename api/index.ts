import type { VercelRequest, VercelResponse } from '@vercel/node';

let appInstance: any = null;
let initError: Error | null = null;

async function getApp() {
    if (appInstance) return appInstance;
    if (initError) throw initError;

    try {
        const mod = await import('../server/src/app');
        appInstance = mod.app;
        return appInstance;
    } catch (err) {
        initError = err as Error;
        console.error('[Vercel] Failed to initialize Express app:', err);
        throw err;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const app = await getApp();
        await new Promise<void>((resolve, reject) => {
            res.on('finish', resolve);
            res.on('error', reject);
            app(req, res);
        });
    } catch (err: any) {
        console.error('[Vercel Handler] Error:', err?.message || err);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: 'ServerInitializationError',
                message: 'The server function failed to initialize. Check Vercel function logs for details.',
                debug: process.env.NODE_ENV !== 'production' ? (err?.message || String(err)) : undefined,
            });
        }
    }
}
