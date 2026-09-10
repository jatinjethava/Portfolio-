import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Mail,
  Phone,
  Github,
  CheckCircle2,
  Sun,
  Moon,
  Columns,
  Rows,
  FileDown,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RESUME_INFO = {
  name: 'JATIN JETHAVA',
  role: 'FULL-STACK MERN DEVELOPER',
  address: '106, Himmat Nagar, Hirabag, Surat, Gujarat, India',
  phone: '+91 81600 82638',
  email: 'jatinjethava3125@gmail.com',
  github: 'https://github.com/jatinjethava',
  githubDisplay: 'github.com/jatinjethava',
  portfolio: 'https://jatin-jethava.vercel.app/',
};

export const ResumeView: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [paperTheme, setPaperTheme] = useState<'dark' | 'paper'>('dark');
  const [layoutMode, setLayoutMode] = useState<'spread' | 'stacked'>('spread');
  const [toastProgress, setToastProgress] = useState(100);

  const handleDirectDownload = useCallback(() => {
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#10b981', '#38bdf8', '#ffffff']
    });
    setDownloadSuccess(true);
    setToastProgress(100);
  }, []);

  // Auto-dismiss toast with smooth progress drain
  useEffect(() => {
    if (!downloadSuccess) return;

    const duration = 4500;
    const interval = 50;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setToastProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setDownloadSuccess(false);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [downloadSuccess]);

  const isPaper = paperTheme === 'paper';

  return (
    <section id="resume" className="py-10 sm:py-14 relative bg-[#07090e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================================================================ */}
        {/* Section Header & Redesigned Action Toolbar                       */}
        {/* ================================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Curriculum Vitae</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              Verified Technical Resume
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              2-Page Official Developer Profile &bull; Designed with Executive ATS Spacing
            </p>
          </div>

          {/* Flexible Toolbar for All Devices */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto">
            {/* Layout Toggle: Two-Page Spread vs Single Stacked */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/[0.08] text-xs font-mono shrink-0">
              <button
                onClick={() => setLayoutMode('spread')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${layoutMode === 'spread'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
                  }`}
                title="Two-Page Spread View"
                aria-label="Switch to two-page spread view"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Spread</span>
              </button>
              <button
                onClick={() => setLayoutMode('stacked')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${layoutMode === 'stacked'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
                  }`}
                title="Single Column Stacked View"
                aria-label="Switch to single column stacked view"
              >
                <Rows className="w-3.5 h-3.5" />
                <span>Stacked</span>
              </button>
            </div>

            {/* View Mode Toggle: Dark vs Authentic Paper */}
            <div className="flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/[0.08] text-xs font-mono shrink-0">
              <button
                onClick={() => setPaperTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${!isPaper
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
                  }`}
                title="Obsidian Dark View"
                aria-label="Switch to dark theme view"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Obsidian</span>
              </button>
              <button
                onClick={() => setPaperTheme('paper')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${isPaper
                  ? 'bg-white text-zinc-900 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
                  }`}
                title="Crisp A4 Paper View"
                aria-label="Switch to paper theme view"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>A4 Paper</span>
              </button>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              {/* Direct static file link */}
              <a
                id="resume-direct-pdf-link"
                href="/Jatin_Jethava_Resume.pdf"
                download="Jatin_Jethava_Resume.pdf"
                onClick={handleDirectDownload}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08] font-mono text-xs transition-all hover:border-white/[0.15] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-[#07090e]"
                title="Direct file download — no JavaScript required"
                aria-label="Download pre-compiled resume PDF directly from server"
              >
                <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct .PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Download Success Toast with Progress Bar                         */}
        {/* ================================================================ */}
        <AnimatePresence>
          {downloadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="mb-5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25 overflow-hidden shadow-lg shadow-emerald-500/5"
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-300">
                      Resume downloaded successfully
                    </p>
                    <p className="text-[11px] text-emerald-400/70 mt-0.5 font-mono">
                      Jatin_Jethava_Resume.pdf — 2 pages, A4 format
                    </p>
                  </div>
                </div>
                <a
                  href="/Jatin_Jethava_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 font-mono text-[11px] text-emerald-300 hover:text-emerald-200 transition-colors shrink-0"
                  aria-label="View raw PDF in new tab"
                >
                  <span>View Raw</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {/* Auto-dismiss progress bar */}
              <div className="h-[2px] bg-emerald-500/10">
                <div
                  className="h-full bg-emerald-400/60 transition-none"
                  style={{ width: `${toastProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================================================================ */}
        {/* Two-Page Resume Container with Refined Spacing                   */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={
            layoutMode === 'spread'
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-start'
              : 'max-w-4xl mx-auto space-y-6 sm:space-y-8'
          }
        >
          {/* ============================================================== */}
          {/* PAGE 1 CARD (Sheet 1) */}
          {/* ============================================================== */}
          <div
            className={`rounded-2xl transition-all duration-300 shadow-2xl relative print:p-0 print:border-none print:shadow-none print:bg-white print:text-black ${isPaper
              ? 'bg-[#ffffff] text-zinc-900 border border-zinc-200 shadow-zinc-950/40'
              : 'bg-[#0d0f15] text-zinc-100 border border-white/[0.1] shadow-black/60'
              } p-5 sm:p-6 lg:p-7`}
          >
            {/* Top Sheet Header Strip */}
            <div className={`flex justify-between items-center pb-3 mb-4 border-b text-[11px] font-mono print:hidden ${isPaper ? 'border-zinc-200 text-zinc-500' : 'border-white/[0.06] text-zinc-400'
              }`}>
              <span className={`flex items-center gap-2 font-medium ${isPaper ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Official Technical Resume &bull; Sheet 1
              </span>
              <span className="font-semibold">Page 1 of 2</span>
            </div>

            {/* Candidate Header: Name, Title, Contact */}
            <div className={`pb-4 mb-5 border-b-2 ${isPaper ? 'border-zinc-800' : 'border-zinc-700'
              }`}>
              <h1 className={`text-2xl sm:text-3xl font-black font-display tracking-tight uppercase ${isPaper ? 'text-zinc-900' : 'text-white'
                }`}>
                {RESUME_INFO.name}
              </h1>

              <p className={`text-xs sm:text-sm font-bold font-mono tracking-wider uppercase mt-1 ${isPaper ? 'text-zinc-800' : 'text-emerald-400'
                }`}>
                {RESUME_INFO.role}
              </p>

              <p className={`text-xs sm:text-[13px] mt-1.5 font-sans ${isPaper ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                {RESUME_INFO.address}
              </p>

              <div className={`flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs font-mono mt-2.5 ${isPaper ? 'text-zinc-700' : 'text-zinc-300'
                }`}>
                <span className="flex items-center gap-1.5">
                  <Phone className={`w-3.5 h-3.5 ${isPaper ? 'text-zinc-700' : 'text-emerald-400'}`} />
                  <span>Phone: <strong className={isPaper ? 'text-zinc-900' : 'text-zinc-100'}>{RESUME_INFO.phone}</strong></span>
                </span>
                <span className={isPaper ? 'text-zinc-300' : 'text-zinc-600'}>|</span>
                <span className="flex items-center gap-1.5">
                  <Mail className={`w-3.5 h-3.5 ${isPaper ? 'text-zinc-700' : 'text-emerald-400'}`} />
                  <span>Email: <a href={`mailto:${RESUME_INFO.email}`} className={`hover:underline ${isPaper ? 'text-emerald-700 font-medium' : 'text-emerald-400'}`}>{RESUME_INFO.email}</a></span>
                </span>
                <span className={isPaper ? 'text-zinc-300' : 'text-zinc-600'}>|</span>
                <span className="flex items-center gap-1.5">
                  <Github className={`w-3.5 h-3.5 ${isPaper ? 'text-zinc-700' : 'text-emerald-400'}`} />
                  <span>GitHub: <a href={RESUME_INFO.github} target="_blank" rel="noopener noreferrer" className={`hover:underline ${isPaper ? 'text-emerald-700 font-medium' : 'text-emerald-400'}`}>{RESUME_INFO.githubDisplay}</a></span>
                </span>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <div className="mb-5 sm:mb-6">
              <div className={`border-b pb-1 mb-2.5 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  PROFESSIONAL SUMMARY
                </h2>
              </div>
              <p className={`text-xs sm:text-[13px] leading-relaxed text-justify font-sans ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                }`}>
                I am a Full-Stack Developer who genuinely enjoys the entire development cycle, from brainstorming system architecture to shipping production-ready code. Backed by a strong academic foundation (8.4 CGPA), I focus on building reliable, fast, and user-centric web applications. Ready to collaborate on real-world projects, take on challenging production tasks, and contribute immediately to engineering teams by shipping clean, scalable, and dependable software.
              </p>
            </div>

            {/* 2. TECHNICAL SKILLS */}
            <div className="mb-5 sm:mb-6">
              <div className={`border-b pb-1 mb-3 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  TECHNICAL SKILLS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-6 sm:gap-x-8 text-xs sm:text-[13px] font-mono">
                {/* Column 1 */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>React.js</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Express.js</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>JavaScript (ES6+)</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>TanStack Query</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>MySQL</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>JWT Authentication</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Git &amp; GitHub</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Next.js</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>MongoDB</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Redux Toolkit</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>RESTful APIs</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>HTML5 &amp; CSS3</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Razorpay API</span>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Node.js</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>TypeScript</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>RTK Query</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Socket.io</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isPaper ? 'text-zinc-800' : 'text-zinc-300'}`}>
                    <span className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Cloudinary API</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. EDUCATION */}
            <div className="mb-5 sm:mb-6">
              <div className={`border-b pb-1 mb-3 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  EDUCATION
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px]">
                {/* Degree 1 */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <strong className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-white'}`}>
                      Bachelor of Computer Applications (BCA)
                    </strong>
                    <span className={`font-mono text-xs ${isPaper ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Expected Graduation: March 2026
                    </span>
                  </div>
                  <p className={`font-sans ${isPaper ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    Veer Narmad South Gujarat University | Current CGPA: <strong className={isPaper ? 'text-zinc-900 font-bold' : 'text-emerald-400'}>8.4 / 10</strong> (Sem-6)
                  </p>
                </div>

                {/* Degree 2 */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <strong className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-white'}`}>
                      Higher Secondary Certificate (HSC – 12th)
                    </strong>
                    <span className={`font-mono text-xs ${isPaper ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Completed: March 2023
                    </span>
                  </div>
                  <p className={`font-sans ${isPaper ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    Gujarat Secondary and Higher Secondary Education Board (GSEB) | Score: <strong className={isPaper ? 'text-zinc-900 font-bold' : 'text-emerald-400'}>83%</strong>
                  </p>
                </div>

                {/* Degree 3 */}
                <div className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <strong className={`font-bold ${isPaper ? 'text-zinc-900' : 'text-white'}`}>
                      Secondary School Certificate (SSC – 10th)
                    </strong>
                    <span className={`font-mono text-xs ${isPaper ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Completed: March 2021
                    </span>
                  </div>
                  <p className={`font-sans ${isPaper ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    Gujarat Secondary and Higher Secondary Education Board (GSEB) | Score: <strong className={isPaper ? 'text-zinc-900 font-bold' : 'text-emerald-400'}>92%</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* 4. LANGUAGES */}
            <div>
              <div className={`border-b pb-1 mb-2.5 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  LANGUAGES
                </h2>
              </div>
              <p className={`text-xs sm:text-sm font-mono py-0.5 ${isPaper ? 'text-zinc-800' : 'text-zinc-200'
                }`}>
                English &nbsp;|&nbsp; Hindi &nbsp;|&nbsp; Gujarati
              </p>
            </div>

            {/* Page 1 Bottom Footer */}
            <div className={`pt-4 mt-5 border-t flex justify-end text-[11px] font-mono ${isPaper ? 'border-zinc-200 text-zinc-500' : 'border-white/[0.06] text-zinc-500'
              }`}>
              <span>Page 1 of 2</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PAGE 2 CARD (Sheet 2) */}
          {/* ============================================================== */}
          <div
            className={`rounded-2xl transition-all duration-300 shadow-2xl relative print:p-0 print:border-none print:shadow-none print:bg-white print:text-black ${isPaper
              ? 'bg-[#ffffff] text-zinc-900 border border-zinc-200 shadow-zinc-950/40'
              : 'bg-[#0d0f15] text-zinc-100 border border-white/[0.1] shadow-black/60'
              } p-5 sm:p-6 lg:p-7`}
          >
            {/* Top Sheet Header Strip */}
            <div className={`flex justify-between items-center pb-3 mb-4 border-b text-[11px] font-mono print:hidden ${isPaper ? 'border-zinc-200 text-zinc-500' : 'border-white/[0.06] text-zinc-400'
              }`}>
              <span className={`flex items-center gap-2 font-medium ${isPaper ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Projects &amp; Competencies &bull; Sheet 2
              </span>
              <span className="font-semibold">Page 2 of 2</span>
            </div>

            {/* TECHNICAL PROJECTS */}
            <div className="mb-6 sm:mb-7">
              <div className={`border-b pb-1 mb-4 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  TECHNICAL PROJECTS
                </h2>
              </div>

              {/* Project 1: Vastra Verse */}
              <div className="space-y-2 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className={`text-sm sm:text-base font-bold ${isPaper ? 'text-zinc-900' : 'text-white'
                    }`}>
                    Vastra Verse – Full-Stack MERN E-Commerce Platform
                  </h3>
                  <span className={`text-xs font-mono font-semibold ${isPaper ? 'text-emerald-700' : 'text-emerald-400'
                    }`}>
                    Live Architecture Project
                  </span>
                </div>

                <p className={`text-xs sm:text-[12.5px] font-mono leading-relaxed ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                  }`}>
                  <strong className={isPaper ? 'text-zinc-900' : 'text-white'}>Technologies:</strong> React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS, Redux Toolkit, Socket.io, Razorpay API, Cloudinary
                </p>

                <ul className={`space-y-1.5 pl-2 sm:pl-3 text-xs sm:text-[13px] leading-relaxed ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                  }`}>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Architected and developed a full-stack, enterprise-grade fashion e-commerce platform with isolated frontend and backend environments.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Implemented secure authentication with JWT, role-based authorization (User/Admin), email-based OTP verification, and automated password recovery.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Built an interactive and fully responsive customer storefront featuring advanced search, multi-attribute filtering, dynamic cart management, and user wishlists.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Integrated Razorpay payment gateway enabling smooth checkout workflows, transaction webhooks, and integrated user wallet functionality.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Engineered real-time features using Socket.io for immediate order status notifications and dynamic inventory tracking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Developed a comprehensive administrative control panel with full CRUD capabilities for products, categories, brands, banner ads, and discount coupons.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Incorporated automated PDF invoice generation, dynamic sales analytics reports, and Cloudinary image asset optimization.</span>
                  </li>
                </ul>
              </div>

              {/* Project 2: BunStory */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className={`text-sm sm:text-base font-bold ${isPaper ? 'text-zinc-900' : 'text-white'
                    }`}>
                    BunStory – Food Ordering Web Application
                  </h3>
                  <span className={`text-xs font-mono font-semibold ${isPaper ? 'text-emerald-700' : 'text-emerald-400'
                    }`}>
                    Full-Stack Project
                  </span>
                </div>

                <p className={`text-xs sm:text-[12.5px] font-mono leading-relaxed ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                  }`}>
                  <strong className={isPaper ? 'text-zinc-900' : 'text-white'}>Technologies:</strong> React.js, Node.js, Express.js, MongoDB, RESTful APIs, Tailwind CSS
                </p>

                <ul className={`space-y-1.5 pl-2 sm:pl-3 text-xs sm:text-[13px] leading-relaxed ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                  }`}>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Designed and developed a complete burger ordering web platform featuring responsive customer ordering flows and centralized administrative controls.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Structured backend RESTful APIs using Node.js and Express.js to facilitate product catalog browsing, cart operations, user profiles, and order processing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Built dedicated administrative management screens allowing store managers to create, update, and organize menu categories, items, and incoming order statuses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                    <span>Implemented client-side form validation, error handling middleware, and persistent cart sessions to deliver a smooth end-user experience.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* KEY COMPETENCIES & DEVELOPMENT PRACTICES */}
            <div className="mb-6 sm:mb-7">
              <div className={`border-b pb-1 mb-3.5 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  KEY COMPETENCIES &amp; DEVELOPMENT PRACTICES
                </h2>
              </div>

              <ul className={`space-y-2 pl-2 sm:pl-3 text-xs sm:text-[13px] leading-relaxed font-sans ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                }`}>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                  <span><strong className={isPaper ? 'text-zinc-900 font-semibold' : 'text-white font-semibold'}>Architectural Design:</strong> RESTful API design principles, MVC architecture, component-driven UI development, and clean code standards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                  <span><strong className={isPaper ? 'text-zinc-900 font-semibold' : 'text-white font-semibold'}>Performance Optimization:</strong> Client-side state normalization, code splitting, lazy loading, database indexing, and asset caching.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className={`font-bold flex-shrink-0 ${isPaper ? 'text-zinc-900' : 'text-emerald-400'}`}>-&gt;</span>
                  <span><strong className={isPaper ? 'text-zinc-900 font-semibold' : 'text-white font-semibold'}>Version Control &amp; Collaboration:</strong> Git workflow, branch management, pull requests, collaborative debugging, and environment configuration.</span>
                </li>
              </ul>
            </div>

            {/* DECLARATION */}
            <div className="pt-1">
              <div className={`border-b pb-1 mb-2.5 ${isPaper ? 'border-zinc-700' : 'border-zinc-700'
                }`}>
                <h2 className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold ${isPaper ? 'text-zinc-900' : 'text-emerald-400'
                  }`}>
                  DECLARATION
                </h2>
              </div>
              <p className={`text-xs sm:text-[13px] leading-relaxed italic ${isPaper ? 'text-zinc-800' : 'text-zinc-300'
                }`}>
                I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief.
              </p>
            </div>

            {/* Page 2 Bottom Footer */}
            <div className={`pt-4 mt-5 border-t flex justify-end text-[11px] font-mono ${isPaper ? 'border-zinc-200 text-zinc-500' : 'border-white/[0.06] text-zinc-500'
              }`}>
              <span>Page 2 of 2</span>
            </div>
          </div>
        </motion.div>



      </div>
    </section>
  );
};
