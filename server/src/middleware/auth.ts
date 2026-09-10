import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Bearer token required.',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token.length < 10) {
    return res.status(401).json({
      success: false,
      error: 'InvalidToken',
      message: 'Token verification failed or expired.',
    });
  }

  req.user = {
    id: 'admin-1',
    role: 'superadmin',
    email: 'jatinjethava3125@gmail.com',
  };

  next();
};
