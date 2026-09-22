import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
    const diag: Record<string, unknown> = {
        ok: true,
        timestamp: new Date().toISOString(),
        runtime: process.version,
        platform: process.platform,
        arch: process.arch,
        env: {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            VERCEL_REGION: process.env.VERCEL_REGION,
            HAS_SMTP_USER: Boolean(process.env.SMTP_USER),
            HAS_SMTP_PASS: Boolean(process.env.SMTP_PASS),
            HAS_SMTP_HOST: Boolean(process.env.SMTP_HOST),
            HAS_ADMIN_EMAIL: Boolean(process.env.ADMIN_EMAIL),
        },
        memoryMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    };

    import('../server/src/app')
        .then(() => {
            diag.expressImport = 'SUCCESS';
            res.status(200).json(diag);
        })
        .catch((err) => {
            diag.expressImport = 'FAILED';
            diag.importError = {
                message: err?.message,
                stack: err?.stack?.split('\n').slice(0, 5),
            };
            res.status(200).json(diag);
        });
}
