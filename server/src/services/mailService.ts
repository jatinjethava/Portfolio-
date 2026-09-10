import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config';

export interface SendMailOptions {
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionId: string;
  ip?: string;
}

export interface MailDeliveryResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string | null;
  mode: 'smtp_live' | 'ethereal_test' | 'simulated_fallback';
  adminDelivered: boolean;
  autoReplyDelivered: boolean;
  error?: string;
}

class MailService {
  private transporter: Transporter | null = null;
  private isInitialized = false;
  private activeMode: 'smtp_live' | 'ethereal_test' | 'simulated_fallback' = 'simulated_fallback';

  public async getTransporter(): Promise<Transporter> {
    if (this.transporter && this.isInitialized) {
      return this.transporter;
    }

    const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = config.email;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const liveTransport = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort || 587,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: config.env === 'production',
          },
        });

        await liveTransport.verify();
        this.transporter = liveTransport;
        this.activeMode = 'smtp_live';
        this.isInitialized = true;
        console.log(`[MailService] Live SMTP transport verified successfully (${smtpHost}:${smtpPort})`);
        return this.transporter;
      } catch (err) {
        console.warn('[MailService] Live SMTP verification failed, falling back to test transport:', (err as Error).message);
      }
    }

    try {
      const testAccount = await nodemailer.createTestAccount();
      const testTransport = nodemailer.createTransport({
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
      console.log(`[MailService] Ethereal test transporter initialized for sandbox (${testAccount.user})`);
      return this.transporter;
    } catch (testErr) {
      console.warn('[MailService] Ethereal creation failed, using JSON transport:', (testErr as Error).message);
      this.transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
      this.activeMode = 'simulated_fallback';
      this.isInitialized = true;
      return this.transporter;
    }
  }

  public async sendContactInquiry(options: SendMailOptions): Promise<MailDeliveryResult> {
    const { name, email, subject, message, submissionId, ip = '127.0.0.1' } = options;
    const transporter = await this.getTransporter();

    const rawFrom = config.email.smtpFrom || `"Jatin Jethava Portfolio" <${config.email.smtpUser || 'no-reply@jatinjethava.dev'}>`;
    const fromAddress = rawFrom.replace(/[\[\]]/g, '').trim();
    const adminRecipient = (config.email.adminRecipient || 'jatinjethava3125@gmail.com').replace(/[\[\]]/g, '').trim();
    const timestamp = new Date().toUTCString();

    let adminDelivered = false;
    let autoReplyDelivered = false;
    let messageId: string | undefined;
    let previewUrl: string | null = null;

    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
    .header { background: #0f172a; padding: 24px; border-bottom: 1px solid #1e293b; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .title { margin: 12px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .content { padding: 24px; }
    .meta-grid { margin: 16px 0; border: 1px solid #1f2937; border-radius: 8px; background: #0b0f17; }
    .meta-row { display: flex; padding: 10px 16px; border-bottom: 1px solid #1f2937; font-size: 13px; }
    .meta-row:last-child { border-bottom: none; }
    .meta-label { width: 110px; color: #94a3b8; font-weight: 600; }
    .meta-val { color: #f1f5f9; font-family: monospace; }
    .message-box { background: #0b0f17; border-left: 3px solid #10b981; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; margin-top: 16px; }
    .btn { display: inline-block; margin-top: 20px; background: #10b981; color: #042f2e; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; }
    .footer { padding: 16px 24px; background: #0a0e17; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">New Contact Inquiry</span>
      <h1 class="title">Portfolio Message Received</h1>
    </div>
    <div class="content">
      <p style="margin-top: 0; color: #94a3b8; font-size: 14px;">A visitor has submitted a new inquiry through your personal portfolio website.</p>
      
      <div class="meta-grid">
        <div class="meta-row"><span class="meta-label">Sender Name:</span><span class="meta-val">${name}</span></div>
        <div class="meta-row"><span class="meta-label">Email:</span><span class="meta-val"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></span></div>
        <div class="meta-row"><span class="meta-label">Subject:</span><span class="meta-val">${subject}</span></div>
        <div class="meta-row"><span class="meta-label">Submission ID:</span><span class="meta-val">${submissionId}</span></div>
        <div class="meta-row"><span class="meta-label">Timestamp:</span><span class="meta-val">${timestamp}</span></div>
        <div class="meta-row"><span class="meta-label">Client IP:</span><span class="meta-val">${ip}</span></div>
      </div>

      <div style="font-weight: 600; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</div>
      <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn">Reply to ${name}</a>
    </div>
    <div class="footer">
      Dispatched by Jatin Jethava Portfolio Mail Service &bull; Nodemailer Engine &bull; Port 3000
    </div>
  </div>
</body>
</html>
    `;

    try {
      const adminMailInfo = await transporter.sendMail({
        from: fromAddress,
        to: adminRecipient,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
        text: `New Portfolio Message:\n\nFrom: ${name} (${email})\nSubject: ${subject}\nID: ${submissionId}\nDate: ${timestamp}\nIP: ${ip}\n\nMessage:\n${message}`,
        html: adminHtml,
      });

      adminDelivered = true;
      messageId = adminMailInfo.messageId;

      if (this.activeMode === 'ethereal_test') {
        const testUrl = nodemailer.getTestMessageUrl(adminMailInfo);
        if (testUrl) {
          previewUrl = testUrl;
          console.log(`[MailService] Ethereal message preview URL: ${testUrl}`);
        }
      }
    } catch (adminErr) {
      console.error('[MailService] Failed to send admin notification email:', adminErr);
    }

    const userAutoReplyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
    .header { background: #0f172a; padding: 24px; border-bottom: 1px solid #1e293b; text-align: left; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); color: #34d399; }
    .title { margin: 12px 0 0 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #cbd5e1; }
    .summary-card { background: #0b0f17; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .footer { padding: 16px 24px; background: #0a0e17; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">Inquiry Acknowledgment</span>
      <h1 class="title">Thank you for reaching out, ${name}</h1>
    </div>
    <div class="content">
      <p>I have received your message regarding <strong>"${subject}"</strong>.</p>
      <p>As a Full-Stack MERN Developer specializing in high-concurrency architectures, payment gateways, and scalable web apps, I personally review every engineering and consulting inquiry and will get back to you within 24 hours.</p>
      
      <div class="summary-card">
        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">Reference Tracking:</div>
        <div style="font-family: monospace; font-size: 13px; color: #34d399;">Ticket ID: ${submissionId}</div>
      </div>

      <p style="margin-bottom: 0;">Best regards,<br><strong style="color: #ffffff;">Jatin Jethava</strong><br><span style="color: #94a3b8; font-size: 12px;">Full-Stack &amp; MERN Software Engineer</span></p>
    </div>
    <div class="footer">
      Jatin Jethava &bull; Portfolio &bull; Ahmedabad, Gujarat, India
    </div>
  </div>
</body>
</html>
    `;

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `Message Received: ${subject} - Jatin Jethava`,
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}" (Ref: ${submissionId}) and will get back to you within 24 hours.\n\nBest regards,\nJatin Jethava\nFull-Stack Software Engineer`,
        html: userAutoReplyHtml,
      });
      autoReplyDelivered = true;
    } catch (replyErr) {
      console.warn('[MailService] Auto-reply confirmation note:', (replyErr as Error).message);
    }

    return {
      success: adminDelivered || autoReplyDelivered || this.activeMode !== 'smtp_live',
      messageId,
      previewUrl,
      mode: this.activeMode,
      adminDelivered,
      autoReplyDelivered,
    };
  }

  public async getStatus() {
    return {
      initialized: this.isInitialized,
      activeMode: this.activeMode,
      configuredHost: config.email.smtpHost || '(Not configured - using resilient sandbox)',
      configuredPort: config.email.smtpPort,
      adminRecipient: config.email.adminRecipient,
      hasSmtpPass: Boolean(config.email.smtpPass),
    };
  }
}

export const mailService = new MailService();
