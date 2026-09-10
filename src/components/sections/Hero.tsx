import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Server,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { profileData } from '../../data/profile';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreArchitecture: () => void;
  onDownloadResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreArchitecture,
  onDownloadResume,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(profileData.avatarUrl);
  const [fallbackAttempted, setFallbackAttempted] = useState<number>(0);

  const handleImageError = () => {
    if (fallbackAttempted === 0) {
      setImgSrc('/myImage.jpeg');
      setFallbackAttempted(1);
    }
  };


  return (
    <section id="top" className="relative min-h-[92vh] pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-[#090a0f] bg-grid-pattern">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profileData.status.text}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-mono"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>MERN Stack Developer • React.js • Node.js • Express.js • MongoDB</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-400 tracking-wider select-none"
          >
            <span className="text-emerald-400 font-semibold">//</span>
            <span>OPEN TO WORK</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">FRESHER</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-zinc-400 font-medium mb-3 flex items-center gap-2"
            >
              <span>👋</span>
              <span>Hello, I am</span>
              <strong className="text-white font-semibold">{profileData.name}</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 select-none"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black font-display uppercase tracking-tight leading-[0.95] text-white whitespace-nowrap">
                Full-Stack
              </h1>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black font-display uppercase tracking-tight leading-[0.95] text-stroke-outline hover:text-stroke-outline-accent transition-all duration-300 cursor-default whitespace-nowrap">
                &amp; Architect
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed mb-8"
            >
              I build responsive, user-friendly web applications with the{' '}
              <span className="text-emerald-400 font-medium">MERN stack</span>{' '}
              (MongoDB, Express.js, React.js, Node.js),{' '}
              <span className="text-white font-medium">SEO-friendly development</span>,
              REST APIs, and performance-focused practices to create fast, accessible,
              and engaging digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <button
                id="hero-cta-projects"
                onClick={onExploreProjects}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Production Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-architecture"
                onClick={onExploreArchitecture}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/[0.1] font-medium text-sm transition-colors"
              >
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Explore Architecture</span>
              </button>

              <button
                id="hero-cta-resume"
                onClick={onDownloadResume}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.08] text-sm font-medium transition-colors"
                title="Download verified resume (Jatin_Jethava_Resume.pdf)"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Resume</span>
              </button>

              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-github"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-social-linkedin"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profileData.socialLinks.email || 'jatinjethava3125@gmail.com'}`}
                  id="hero-social-email"
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative w-full max-w-sm lg:max-w-[380px]"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141721] to-[#0d0f15] border border-white/[0.1] shadow-2xl p-4">

                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">ENGINEER_PROFILE.SYS</span>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    ACTIVE
                  </div>
                </div>

                <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-[#0a0c10] border border-white/[0.06] group">
                  <img
                    id="hero-portrait-image"
                    src={imgSrc}
                    alt={profileData.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#0a0c10]/85 backdrop-blur-md border border-white/[0.1] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">{profileData.name}</p>
                      <p className="text-[10px] font-mono text-emerald-400">Full-Stack MERN Specialist</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-zinc-400">EXP</span>
                      <p className="text-xs font-bold text-white">{profileData.experienceYears}+ Years</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-blue-400">⚛️</span> React.js
                  </div>

                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-blue-400">⚙️</span> Node/Express
                  </div>

                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-green-400">🍃</span> MongoDB
                  </div>

                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-yellow-400">⚡</span> JavaScript (ES6)
                  </div>

                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-cyan-400">🎨</span> Tailwind CSS
                  </div>

                  <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-zinc-300">
                    <span className="text-purple-400">🔍</span> SEO Basics
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 p-2.5 rounded-lg bg-[#0a0c10] border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-xl hidden sm:flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-Downtime Deployments</span>
              </div>
            </motion.div>
          </div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8"
        >
          {profileData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-300 mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 mt-0.5">
                {stat.helper}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};


