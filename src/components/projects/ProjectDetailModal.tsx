import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  BookOpen,
  Server,
  Code
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0d0f15] border border-white/[0.12] shadow-2xl text-zinc-200"
        >
          <button
            onClick={onClose}
            id="close-project-modal"
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/[0.1] transition-all"
            aria-label="Close Project Detail Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-52 sm:h-72 w-full overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-75 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-[#0d0f15]/50 to-transparent" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-14 sm:right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono capitalize">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  // {project.date} ARCHITECTURE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                {project.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="text-xs font-mono text-zinc-400 block">{m.label}</span>
                    <span className="text-sm sm:text-base font-bold text-white">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex w-full sm:w-auto items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white border border-white/[0.08] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-black shadow-lg shadow-emerald-500/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/20">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 font-mono mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>The Architectural Problem</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>The Engineered Solution</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Key Production Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300"
                  >
                    <span className="text-emerald-400 font-bold">›</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Architecture & Execution Flow</span>
              </h3>
              <p className="text-xs text-zinc-300 mb-4">{project.architecture.overview}</p>

              <div className="space-y-2 relative pl-4 border-l-2 border-emerald-500/30">
                {project.architecture.flowSteps.map((step, idx) => (
                  <div key={idx} className="relative text-xs text-zinc-300 py-1">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-emerald-400 font-bold mr-2">0{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>Database Schema & Indexing Strategy</span>
                </h4>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/[0.04]">
                  {project.architecture.databaseSchemaNotes}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span>Primary API Endpoints</span>
                </h4>
                <div className="space-y-2">
                  {project.architecture.apiEndpoints.map((ep, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04] text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                          ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                          {ep.method}
                        </span>
                        <span className="text-zinc-200">{ep.path}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 font-sans">{ep.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Performance Tuning</span>
                </h4>
                <ul className="space-y-1.5 text-[11px] text-zinc-300">
                  {project.performanceNotes.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Security Hardening</span>
                </h4>
                <ul className="space-y-1.5 text-[11px] text-zinc-300">
                  {project.securityNotes.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Engineering Takeaway</span>
                </h4>
                <ul className="space-y-1.5 text-[11px] text-zinc-300">
                  {project.lessonsLearned.map((l, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                Complete Technology Stack
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-emerald-400 block mb-1">Frontend:</span>
                  <p className="text-zinc-300">{project.techStack.frontend.join(', ')}</p>
                </div>
                <div>
                  <span className="text-blue-400 block mb-1">Backend:</span>
                  <p className="text-zinc-300">{project.techStack.backend.join(', ')}</p>
                </div>
                <div>
                  <span className="text-purple-400 block mb-1">Database:</span>
                  <p className="text-zinc-300">{project.techStack.database.join(', ')}</p>
                </div>
                <div>
                  <span className="text-amber-400 block mb-1">DevOps:</span>
                  <p className="text-zinc-300">{project.techStack.devops.join(', ')}</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
