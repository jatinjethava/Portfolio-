import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  ShoppingBag,
  LayoutDashboard,
  Cpu,
  Zap,
  Globe,
  ArrowRight,
  Check,
  Clock,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../../data/services';
import { Service } from '../../types';

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'ShoppingBag': return ShoppingBag;
      case 'LayoutDashboard': return LayoutDashboard;
      case 'Cpu': return Cpu;
      case 'Zap': return Zap;
      case 'Globe': return Globe;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#0a0c10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Services & Consulting Engagements
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              High-impact engineering services for founders, engineering teams, and enterprises seeking resilient architectures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.035] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{service.typicalTimeline}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {service.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      Scope Deliverables:
                    </span>
                    {service.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {service.techStack.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
