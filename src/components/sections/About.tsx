import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Terminal,
  Compass,
  BookOpen,
  Workflow,
  Database,
  Calendar,
  Building,
  Check
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { experienceData, educationData, certificationsData } from '../../data/experience';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'timeline' | 'certifications'>('philosophy');

  return (
    <section id="about" className="py-24 relative border-t border-white/[0.06] bg-[#090b10]">
      <div className="absolute top-10 right-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-white/[0.06] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Engineering Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              About & Development Philosophy
            </h2>
          </div>

          <div className="flex items-center gap-1.5 mt-4 sm:mt-0 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl">
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'philosophy'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-zinc-400 hover:text-white'
                }`}
            >
              Philosophy & Skills
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'timeline'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-zinc-400 hover:text-white'
                }`}
            >
              Experience Timeline
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'certifications'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-zinc-400 hover:text-white'
                }`}
            >
              Credentials & Edu
            </button>
          </div>
        </div>

        {activeTab === 'philosophy' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>The Engineering Mindset</span>
                </h3>
                <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {profileData.aboutBio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 font-mono mb-4 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-emerald-400" />
                  <span>What I Specialize In</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {profileData.specializations.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-zinc-200"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Four Pillars of My Development</span>
              </h3>

              <div className="grid grid-cols-1 gap-3.5">

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      1. Clean & Responsive Development
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    I focus on writing clean, maintainable code and building responsive
                    interfaces that provide a consistent experience across different
                    devices and screen sizes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      2. Performance & User Experience
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    I pay attention to page performance, efficient API usage, responsive
                    UI, and smooth user interactions to create fast and user-friendly
                    web applications.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      3. Practical MERN Development
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Through hands-on projects, I work with React.js, Node.js, Express.js,
                    MongoDB, REST APIs, authentication, and database operations to
                    strengthen my full-stack development skills.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-sm">
                      4. Continuous Learning
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    As a fresher, I continuously improve my skills through practical
                    projects, problem-solving, and learning modern technologies, with a
                    strong mindset to adapt and grow.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-10">
              {experienceData.map((exp, idx) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090b10] border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors" />

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>{exp.role}</span>
                          {exp.link && (
                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                              LINK
                            </a>
                          )}

                        </h3>
                        <p className="text-sm font-medium text-emerald-400 flex items-center gap-2 mt-0.5">
                          <Building className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">{exp.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-lg self-start">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-300 mb-4">{exp.description}</p>

                    <div className="space-y-2 mb-4">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Key Engineering Wins:</span>
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <span className="text-emerald-400 font-bold mt-0.5">›</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                      {exp.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-white/[0.04] text-[11px] font-mono text-zinc-300 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Professional Certifications</span>
              </h3>
              <div className="space-y-4">
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                    <p className="text-xs text-emerald-400 mt-0.5">{cert.issuer}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2">
                      <span>ID: {cert.credentialId}</span>
                      <span>Verified {cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Formal Education</span>
              </h3>
              <div className="space-y-4">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                    <p className="text-xs text-emerald-400 mt-0.5">{edu.institution}</p>
                    <p className="text-xs text-zinc-400 mt-2">{edu.details}</p>
                    <div className="text-[11px] font-mono text-zinc-500 mt-2">
                      Graduated {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
