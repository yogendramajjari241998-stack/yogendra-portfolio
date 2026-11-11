import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TECHNICAL_SKILLS_MATRIX } from '../data/portfolioData';
import { Cpu, CheckCircle2, Terminal, Shield, Zap } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const SkillsMatrix: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 1:
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <Terminal className="w-4 h-4 text-blue-400" />;
      case 3:
        return <Shield className="w-4 h-4 text-purple-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getSkillWidth = (level: string) => {
    if (level.includes('Architect') || level.includes('Enterprise')) return '95%';
    if (level.includes('Expert')) return '90%';
    if (level.includes('Advanced')) return '85%';
    return '80%';
  };

  return (
    <section id="tech-matrix" className="py-20 border-t border-white/[0.08] relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Motion scroll trigger */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>03. Technical Competencies</span>
            <span className="text-zinc-600">/</span>
            <span>Production-Tested</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Stack Systems &amp; RevOps Competency Matrix
          </h2>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
            Demonstrated mastery bridging generative AI models, custom relational database schemas, 
            and enterprise CRM routing without external software bloat.
          </p>
        </motion.div>

        {/* 4 Category Matrix Grid with Staggered Scroll-Into-View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TECHNICAL_SKILLS_MATRIX.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="p-6 cinematic-glass rounded-2xl border border-white/[0.08] hover:border-amber-400/30 transition-colors flex flex-col justify-between group shadow-lg shadow-black/40"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/[0.06]">
                  <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-colors">
                    {getCategoryIcon(groupIdx)}
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {group.skills.map((skill, skillIdx) => (
                    <li
                      key={skill.name}
                      className="flex flex-col text-xs"
                    >
                      <div className="flex items-center justify-between font-medium text-zinc-200 mb-1">
                        <span>{skill.name}</span>
                        <span className="text-[10px] font-mono text-amber-400/90 font-semibold">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500/40 via-amber-400 to-amber-300 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: getSkillWidth(skill.level) }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: 0.2 + groupIdx * 0.1 + skillIdx * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Domain {groupIdx + 1} of 4</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
