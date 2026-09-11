import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/profile';
import { apiService } from '../../services/api';

interface ContactProps {
  initialSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || 'Full-Stack Engineering Inquiry',
    message: '',
  });

  useEffect(() => {
    if (initialSubject) {
      setFormData(prev => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionMeta, setSubmissionMeta] = useState<{
    submissionId?: string;
    mailResult?: {
      mode: string;
      adminDelivered: boolean;
      autoReplyDelivered: boolean;
      previewUrl?: string | null;
    };
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must contain at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await apiService.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
        setSubmissionMeta({
          submissionId: res.submissionId,
          mailResult: res.mailResult,
        });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#10b981', '#3b82f6', '#10b981']
        });
        setFormData({
          name: '',
          email: '',
          subject: 'Full-Stack Engineering Inquiry',
          message: '',
        });
      }
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'Failed to submit contact message.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#090b10] border-t border-white/[0.06]">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Connection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Let's Discuss Architecture & Engineering
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Currently open to Entry Level roles, MERN consulting and Architecture reviews.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Direct Inbox
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mt-2">
                  <span className="min-w-0 break-all text-xs sm:text-sm font-mono text-white select-all">
                    {profileData.socialLinks.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Guaranteed Response SLA</span>
                    <span className="text-zinc-400">Within 12 hours (often under 2 hours)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Location & Timezone</span>
                    <span className="text-zinc-400">{profileData.location} (IST / UTC+5:30) • Remote Worldwide</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Spam & Abuse Defense</span>
                    <span className="text-zinc-400">Protected by sliding-window Redis token bucket</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles and Technical Advising engagements.</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0f15] border border-white/[0.1] shadow-2xl">

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-4 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                      Nodemailer Transport Active
                    </span>
                    <h3 className="text-xl font-bold text-white">Transmission Delivered</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been successfully received, routed through the Express backend, and dispatched via <strong className="text-emerald-400 font-mono">Nodemailer</strong> to Jatin Jethava. An automated confirmation was also prepared for your inbox.
                  </p>

                  {submissionMeta?.submissionId && (
                    <div className="max-w-md mx-auto p-3 rounded-xl bg-black/60 border border-white/[0.08] text-left text-xs font-mono space-y-1.5">
                      <div className="flex items-start justify-between gap-3 text-zinc-400">
                        <span>Ticket ID:</span>
                        <span className="text-emerald-400 font-bold">{submissionMeta.submissionId}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 text-zinc-400">
                        <span>Transport Engine:</span>
                        <span className="text-zinc-200">Nodemailer (SMTP / Pool)</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 text-zinc-400">
                        <span>Target Recipient:</span>
                        <span className="min-w-0 break-all text-right text-zinc-200">jatinjethava3125@gmail.com</span>
                      </div>
                      {submissionMeta?.mailResult?.previewUrl && (
                        <div className="pt-2 mt-2 border-t border-white/[0.08] text-center">
                          <a
                            href={submissionMeta.mailResult.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-sans"
                          >
                            <span>Open Ethereal Sandbox Email Preview</span>
                            <span className="text-[10px] font-mono">↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setSubmissionMeta(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white border border-white/[0.1] transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-emerald-500/60 focus:bg-white/[0.05] text-white text-xs placeholder:text-zinc-600 outline-none transition-all"
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.connor@cyberdyne.io"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-emerald-500/60 focus:bg-white/[0.05] text-white text-xs placeholder:text-zinc-600 outline-none transition-all"
                      />
                      {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Subject / Project Scope *
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Lead Full-Stack Engineer / E-Commerce Consulting"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-emerald-500/60 focus:bg-white/[0.05] text-white text-xs placeholder:text-zinc-600 outline-none transition-all"
                    />
                    {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message & Architectural Requirements *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity, project architecture, expected timeline, and tech stack requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-emerald-500/60 focus:bg-white/[0.05] text-white text-xs placeholder:text-zinc-600 outline-none transition-all resize-none"
                    />
                    {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:cursor-not-allowed text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Validating & Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Message via /api/v1/contact</span>
                      </>
                    )}
                  </button>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[11px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400/80" />
                      <span>Nodemailer SMTP Pool</span>
                    </span>
                    <span className="text-zinc-600">&bull;</span>
                    <span>Direct Express Router</span>
                    <span className="text-zinc-600">&bull;</span>
                    <span>TLS 1.3 Encrypted</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
