import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Server,
  Database,
  Shield,
  Wrench,
  Sparkles,
  Layers
} from 'lucide-react';
import { skillsData } from '../../data/skills';
import { SkillCategory } from '../../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Sparkles },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'database', label: 'Database & Caching', icon: Database },
    { id: 'architecture', label: 'Architecture & Security', icon: Shield },
    { id: 'tools', label: 'DevOps & Tools', icon: Wrench },
  ];

  const displayedCategories: SkillCategory[] = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter(c => c.id === selectedCategory);

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Proficient':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Beginner':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#0a0c10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Mastery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Skills & Production Competencies
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Honest, battle-tested proficiency levels across the modern full-stack web stack, with zero exaggerated claims.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`skill-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${isSelected
                    ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-12">
          {displayedCategories.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{group.name}</h3>
                <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
                  // {group.description}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.035] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-400">
                            {(skill.experienceYears === "fresher") ? "fresher" : `${skill.experienceYears}y`} exp
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${getLevelBadgeClass(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        {skill.highlight}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
