import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiV1Router } from './routes/apiV1';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', apiV1Router);

const distPath = path.join(process.cwd(), 'dist');
console.log(distPath)
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

app.use(errorHandler);

