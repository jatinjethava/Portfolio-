"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var ioredis_1 = require("ioredis");
var config_1 = require("../config");
var RedisService = /** @class */ (function () {
    function RedisService() {
        this.client = new ioredis_1.default(config_1.config.redisUrl, {
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            keepAlive: 10000,
            connectTimeout: 10000,
            commandTimeout: 10000,
        });
        this.client.on('connect', function () {
            console.log('✅ Redis connected');
        });
        this.client.on('error', function (err) {
            console.error('❌ Redis error:', err.message);
        });
    }
    RedisService.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get(key)];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, null];
                        return [2 /*return*/, JSON.parse(data)];
                    case 2:
                        err_1 = _a.sent();
                        console.error("[Redis] Get Error for key ".concat(key, ":"), err_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisService.prototype.set = function (key_1, data_1) {
        return __awaiter(this, arguments, void 0, function (key, data, ttlSeconds) {
            var err_2;
            if (ttlSeconds === void 0) { ttlSeconds = 300; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error("[Redis] Set Error for key ".concat(key, ":"), err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisService.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.del(key)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.error("[Redis] Del Error for key ".concat(key, ":"), err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisService.prototype.delPattern = function (patternPrefix) {
        return __awaiter(this, void 0, void 0, function () {
            var keys, err_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.client.keys("".concat(patternPrefix, "*"))];
                    case 1:
                        keys = _b.sent();
                        if (!(keys.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (_a = this.client).del.apply(_a, keys)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_4 = _b.sent();
                        console.error("[Redis] delPattern Error:", err_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RedisService.prototype.checkRateLimit = function (identifier_1) {
        return __awaiter(this, arguments, void 0, function (identifier, limit, windowSeconds) {
            var key, pipeline, results, currentCount, ttl, err_5;
            if (limit === void 0) { limit = 10; }
            if (windowSeconds === void 0) { windowSeconds = 60; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        key = "ratelimit:".concat(identifier);
                        pipeline = this.client.pipeline();
                        pipeline.incr(key);
                        pipeline.ttl(key);
                        return [4 /*yield*/, pipeline.exec()];
                    case 1:
                        results = _a.sent();
                        if (!results)
                            return [2 /*return*/, { allowed: true, remaining: limit - 1 }];
                        currentCount = results[0][1];
                        ttl = results[1][1];
                        if (!(ttl === -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.expire(key, windowSeconds)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (currentCount > limit) {
                            return [2 /*return*/, { allowed: false, remaining: 0 }];
                        }
                        return [2 /*return*/, { allowed: true, remaining: limit - currentCount }];
                    case 4:
                        err_5 = _a.sent();
                        console.error("[Redis] RateLimit Error for identifier ".concat(identifier, ":"), err_5);
                        return [2 /*return*/, { allowed: true, remaining: 1 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return RedisService;
}());
exports.redisClient = new RedisService();
