import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { profileData } from '../../data/profile';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090d] border-t border-white/[0.06] text-zinc-400 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/[0.06]">

          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black tracking-tight text-white">
                <span className="text-emerald-400">&lt;</span>
                {profileData.name.split(' ')[0]}
                <span className="text-emerald-400">/&gt;</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded">
                MERN ARCHITECT
              </span>
            </div>
            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              Engineering high-throughput, resilient web applications and microservices. Dedicated to clean code, defensive security, and scalable systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.socialLinks.email}`}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block mb-3">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">About & Mindset</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills Matrix</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">Production Projects</a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture & API Playground</a>
              </li>
              <li>
                <a href="#resume" className="hover:text-emerald-400 transition-colors">Verified Resume</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">Direct Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-white font-bold block mb-3">
              System Health
            </span>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-zinc-300">Cluster Status: All Systems 100%</span>
              </div>
              <div className="text-zinc-400">
                P99 Latency: <span className="text-emerald-400">18ms</span> (Redis Cached)
              </div>
              <div className="text-zinc-400">
                Stack: React 19 • Node.js • Express • MongoDB • Other Related Technologies
              </div>
              <div className="pt-2">
                <button
                  onClick={onAdminClick}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 text-xs"
                >
                  Admin Control Portal &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
          <div className="text-zinc-400">
            © {new Date().getFullYear()} {profileData.name}. Designed & Engineered with production-grade rigor.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};