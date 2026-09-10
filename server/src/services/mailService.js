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
exports.mailService = void 0;
var nodemailer_1 = require("nodemailer");
var config_1 = require("../config");
var MailService = /** @class */ (function () {
    function MailService() {
        this.transporter = null;
        this.isInitialized = false;
        this.activeMode = 'simulated_fallback';
    }
    MailService.prototype.getTransporter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass, liveTransport, err_1, testAccount, testTransport, testErr_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.transporter && this.isInitialized) {
                            return [2 /*return*/, this.transporter];
                        }
                        _a = config_1.config.email, smtpHost = _a.smtpHost, smtpPort = _a.smtpPort, smtpSecure = _a.smtpSecure, smtpUser = _a.smtpUser, smtpPass = _a.smtpPass;
                        if (!(smtpHost && smtpUser && smtpPass)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        liveTransport = nodemailer_1.default.createTransport({
                            host: smtpHost,
                            port: smtpPort || 587,
                            secure: smtpSecure,
                            auth: {
                                user: smtpUser,
                                pass: smtpPass,
                            },
                            tls: {
                                rejectUnauthorized: config_1.config.env === 'production',
                            },
                        });
                        return [4 /*yield*/, liveTransport.verify()];
                    case 2:
                        _b.sent();
                        this.transporter = liveTransport;
                        this.activeMode = 'smtp_live';
                        this.isInitialized = true;
                        console.log("[MailService] Live SMTP transport verified successfully (".concat(smtpHost, ":").concat(smtpPort, ")"));
                        return [2 /*return*/, this.transporter];
                    case 3:
                        err_1 = _b.sent();
                        console.warn('[MailService] Live SMTP verification failed, falling back to test transport:', err_1.message);
                        return [3 /*break*/, 4];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, nodemailer_1.default.createTestAccount()];
                    case 5:
                        testAccount = _b.sent();
                        testTransport = nodemailer_1.default.createTransport({
                            host: testAccount.smtp.host,
                            port: testAccount.smtp.port,
                            secure: testAccount.smtp.secure,
                            auth: {
                                user: testAccount.user,
                                pass: testAccount.pass,
                            },
                        });
                        this.transporter = testTransport;
                        this.activeMode = 'ethereal_test';
                        this.isInitialized = true;
                        console.log("[MailService] Ethereal test transporter initialized for sandbox (".concat(testAccount.user, ")"));
                        return [2 /*return*/, this.transporter];
                    case 6:
                        testErr_1 = _b.sent();
                        console.warn('[MailService] Ethereal creation failed, using JSON transport:', testErr_1.message);
                        this.transporter = nodemailer_1.default.createTransport({
                            jsonTransport: true,
                        });
                        this.activeMode = 'simulated_fallback';
                        this.isInitialized = true;
                        return [2 /*return*/, this.transporter];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MailService.prototype.sendContactInquiry = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, subject, message, submissionId, _a, ip, transporter, rawFrom, fromAddress, adminRecipient, timestamp, adminDelivered, autoReplyDelivered, messageId, previewUrl, adminHtml, adminMailInfo, testUrl, adminErr_1, userAutoReplyHtml, replyErr_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        name = options.name, email = options.email, subject = options.subject, message = options.message, submissionId = options.submissionId, _a = options.ip, ip = _a === void 0 ? '127.0.0.1' : _a;
                        return [4 /*yield*/, this.getTransporter()];
                    case 1:
                        transporter = _b.sent();
                        rawFrom = config_1.config.email.smtpFrom || "\"Jatin Jethava Portfolio\" <".concat(config_1.config.email.smtpUser || 'no-reply@jatinjethava.dev', ">");
                        fromAddress = rawFrom.replace(/[\[\]]/g, '').trim();
                        adminRecipient = (config_1.config.email.adminRecipient || 'jatinjethava3125@gmail.com').replace(/[\[\]]/g, '').trim();
                        timestamp = new Date().toUTCString();
                        adminDelivered = false;
                        autoReplyDelivered = false;
                        previewUrl = null;
                        adminHtml = "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }\n    .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }\n    .header { background: #0f172a; padding: 24px; border-bottom: 1px solid #1e293b; }\n    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }\n    .title { margin: 12px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff; }\n    .content { padding: 24px; }\n    .meta-grid { margin: 16px 0; border: 1px solid #1f2937; border-radius: 8px; background: #0b0f17; }\n    .meta-row { display: flex; padding: 10px 16px; border-bottom: 1px solid #1f2937; font-size: 13px; }\n    .meta-row:last-child { border-bottom: none; }\n    .meta-label { width: 110px; color: #94a3b8; font-weight: 600; }\n    .meta-val { color: #f1f5f9; font-family: monospace; }\n    .message-box { background: #0b0f17; border-left: 3px solid #10b981; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; margin-top: 16px; }\n    .btn { display: inline-block; margin-top: 20px; background: #10b981; color: #042f2e; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; }\n    .footer { padding: 16px 24px; background: #0a0e17; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <span class=\"badge\">New Contact Inquiry</span>\n      <h1 class=\"title\">Portfolio Message Received</h1>\n    </div>\n    <div class=\"content\">\n      <p style=\"margin-top: 0; color: #94a3b8; font-size: 14px;\">A visitor has submitted a new inquiry through your personal portfolio website.</p>\n      \n      <div class=\"meta-grid\">\n        <div class=\"meta-row\"><span class=\"meta-label\">Sender Name:</span><span class=\"meta-val\">".concat(name, "</span></div>\n        <div class=\"meta-row\"><span class=\"meta-label\">Email:</span><span class=\"meta-val\"><a href=\"mailto:").concat(email, "\" style=\"color: #38bdf8;\">").concat(email, "</a></span></div>\n        <div class=\"meta-row\"><span class=\"meta-label\">Subject:</span><span class=\"meta-val\">").concat(subject, "</span></div>\n        <div class=\"meta-row\"><span class=\"meta-label\">Submission ID:</span><span class=\"meta-val\">").concat(submissionId, "</span></div>\n        <div class=\"meta-row\"><span class=\"meta-label\">Timestamp:</span><span class=\"meta-val\">").concat(timestamp, "</span></div>\n        <div class=\"meta-row\"><span class=\"meta-label\">Client IP:</span><span class=\"meta-val\">").concat(ip, "</span></div>\n      </div>\n\n      <div style=\"font-weight: 600; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;\">Message Body:</div>\n      <div class=\"message-box\">").concat(message.replace(/</g, '&lt;').replace(/>/g, '&gt;'), "</div>\n\n      <a href=\"mailto:").concat(email, "?subject=Re: ").concat(encodeURIComponent(subject), "\" class=\"btn\">Reply to ").concat(name, "</a>\n    </div>\n    <div class=\"footer\">\n      Dispatched by Jatin Jethava Portfolio Mail Service &bull; Nodemailer Engine &bull; Port 3000\n    </div>\n  </div>\n</body>\n</html>\n    ");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, transporter.sendMail({
                                from: fromAddress,
                                to: adminRecipient,
                                replyTo: email,
                                subject: "[Portfolio Inquiry] ".concat(subject, " - from ").concat(name),
                                text: "New Portfolio Message:\n\nFrom: ".concat(name, " (").concat(email, ")\nSubject: ").concat(subject, "\nID: ").concat(submissionId, "\nDate: ").concat(timestamp, "\nIP: ").concat(ip, "\n\nMessage:\n").concat(message),
                                html: adminHtml,
                            })];
                    case 3:
                        adminMailInfo = _b.sent();
                        adminDelivered = true;
                        messageId = adminMailInfo.messageId;
                        if (this.activeMode === 'ethereal_test') {
                            testUrl = nodemailer_1.default.getTestMessageUrl(adminMailInfo);
                            if (testUrl) {
                                previewUrl = testUrl;
                                console.log("[MailService] Ethereal message preview URL: ".concat(testUrl));
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        adminErr_1 = _b.sent();
                        console.error('[MailService] Failed to send admin notification email:', adminErr_1);
                        return [3 /*break*/, 5];
                    case 5:
                        userAutoReplyHtml = "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }\n    .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }\n    .header { background: #0f172a; padding: 24px; border-bottom: 1px solid #1e293b; text-align: left; }\n    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); color: #34d399; }\n    .title { margin: 12px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff; }\n    .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }\n    .summary-card { background: #0b0f17; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; margin: 16px 0; }\n    .footer { padding: 16px 24px; background: #0a0e17; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <span class=\"badge\">Inquiry Acknowledgment</span>\n      <h1 class=\"title\">Thank you for reaching out, ".concat(name, "</h1>\n    </div>\n    <div class=\"content\">\n      <p>I have received your message regarding <strong>\"").concat(subject, "\"</strong>.</p>\n      <p>As a Full-Stack MERN Developer specializing in high-concurrency architectures, payment gateways, and scalable web apps, I personally review every engineering and consulting inquiry and will get back to you within 24 hours.</p>\n      \n      <div class=\"summary-card\">\n        <div style=\"font-size: 12px; color: #94a3b8; margin-bottom: 6px;\">Reference Tracking:</div>\n        <div style=\"font-family: monospace; font-size: 13px; color: #34d399;\">Ticket ID: ").concat(submissionId, "</div>\n      </div>\n\n      <p style=\"margin-bottom: 0;\">Best regards,<br><strong style=\"color: #ffffff;\">Jatin Jethava</strong><br><span style=\"color: #94a3b8; font-size: 12px;\">Full-Stack &amp; MERN Software Engineer</span></p>\n    </div>\n    <div class=\"footer\">\n      Jatin Jethava &bull; Portfolio &bull; Ahmedabad, Gujarat, India\n    </div>\n  </div>\n</body>\n</html>\n    ");
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, transporter.sendMail({
                                from: fromAddress,
                                to: email,
                                subject: "Message Received: ".concat(subject, " - Jatin Jethava"),
                                text: "Hi ".concat(name, ",\n\nThank you for reaching out! I have received your message regarding \"").concat(subject, "\" (Ref: ").concat(submissionId, ") and will get back to you within 24 hours.\n\nBest regards,\nJatin Jethava\nFull-Stack Software Engineer"),
                                html: userAutoReplyHtml,
                            })];
                    case 7:
                        _b.sent();
                        autoReplyDelivered = true;
                        return [3 /*break*/, 9];
                    case 8:
                        replyErr_1 = _b.sent();
                        console.warn('[MailService] Auto-reply confirmation note:', replyErr_1.message);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, {
                            success: adminDelivered || autoReplyDelivered || this.activeMode !== 'smtp_live',
                            messageId: messageId,
                            previewUrl: previewUrl,
                            mode: this.activeMode,
                            adminDelivered: adminDelivered,
                            autoReplyDelivered: autoReplyDelivered,
                        }];
                }
            });
        });
    };
    MailService.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        initialized: this.isInitialized,
                        activeMode: this.activeMode,
                        configuredHost: config_1.config.email.smtpHost || '(Not configured - using resilient sandbox)',
                        configuredPort: config_1.config.email.smtpPort,
                        adminRecipient: config_1.config.email.adminRecipient,
                        hasSmtpPass: Boolean(config_1.config.email.smtpPass),
                    }];
            });
        });
    };
    return MailService;
}());
exports.mailService = new MailService();
