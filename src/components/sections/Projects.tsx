import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowRight,
  Layers,
  Sparkles,
  ShoppingBag,
  LayoutDashboard,
  Wand2
} from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { toast } from 'sonner';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filterTabs = [
    { id: 'all' as ProjectCategory, label: 'All Projects', icon: Sparkles },
    { id: 'fullstack' as ProjectCategory, label: 'Full Stack', icon: Layers },
    { id: 'ecommerce' as ProjectCategory, label: 'E-Commerce', icon: ShoppingBag },
    { id: 'admin' as ProjectCategory, label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'ai-built' as ProjectCategory, label: 'AI-Built', icon: Wand2 },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleLiveDemoClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string, url: string) => {
    if (slug === 'vastra-verse-admin') {
      e.preventDefault();
      toast.info('Demo Credentials Required', {
        description: 'Email: jatinjethava3125@gmail.com\nPassword: JatinJethava@123',
        duration: 6000,
      });
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 1000);
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#090b10] border-t border-white/[0.06]">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>My Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Real-world full-stack MERN applications I've built — from e-commerce platforms with payment integration to food ordering systems and production-grade portfolio architecture.
            </p>
          </div>

          <div className="mobile-scroll-row flex w-full md:w-auto flex-nowrap overflow-x-auto gap-2 mt-6 md:mt-0 pb-1">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`project-filter-${tab.id}`}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex shrink-0 items-center gap-1.5 px-3 py-2 md:py-1.5 rounded-xl text-xs font-medium transition-all ${isSelected
                    ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-emerald-950/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/[0.06]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                  />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0c10]/85 backdrop-blur-md border border-white/[0.1] text-[11px] font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="capitalize">{project.category}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-zinc-400">
                    {project.date}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono mt-1 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="text-xs font-bold text-white block">{m.value}</span>
                          <span className="text-[10px] font-mono text-zinc-400">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.backend.slice(0, 3).concat(project.techStack.frontend.slice(0, 2)).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      id={`view-details-${project.slug}`}
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                        title="View Source on GitHub"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                          title="Live Demo Application"
                          aria-label="Live Demo"
                          onClick={(e) => handleLiveDemoClick(e, project.slug, project.liveUrl!)}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
