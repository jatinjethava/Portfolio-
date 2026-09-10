"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, _req, res, _next) {
    var statusCode = err.statusCode || 500;
    var message = err.message || 'Internal Server Error';
    res.status(statusCode).json(__assign(__assign({ success: false, statusCode: statusCode, error: err.name || 'ApplicationError', message: message }, (err.errors ? { details: err.errors } : {})), { timestamp: new Date().toISOString() }));
};
exports.errorHandler = errorHandler;
