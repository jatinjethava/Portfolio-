"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
var requireAdmin = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
            message: 'Missing or malformed Authorization header. Bearer token required.',
        });
    }
    var token = authHeader.split(' ')[1];
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
exports.requireAdmin = requireAdmin;
