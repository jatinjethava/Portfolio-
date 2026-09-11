import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { app as apiApp } from './server/src/app.js';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(apiApp);

  app.use(express.static(path.join(process.cwd(), 'public')));
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`⚡ MERN Full-Stack Server active on http://localhost:${PORT}`);
  });
}

startServer();
