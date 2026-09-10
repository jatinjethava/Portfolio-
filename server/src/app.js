"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var path_1 = require("path");
var fs_1 = require("fs");
var apiV1_1 = require("./routes/apiV1");
var errorHandler_1 = require("./middleware/errorHandler");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/api/v1', apiV1_1.apiV1Router);
var distPath = path_1.default.join(process.cwd(), 'dist');
console.log(distPath);
if (fs_1.default.existsSync(distPath)) {
    exports.app.use(express_1.default.static(distPath));
    exports.app.get('*', function (req, res, next) {
        if (req.path.startsWith('/api')) {
            return next();
        }
        res.sendFile(path_1.default.join(distPath, 'index.html'));
    });
}
exports.app.use(errorHandler_1.errorHandler);
