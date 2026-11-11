import React from 'react';
import { motion, Variants } from 'framer-motion';
import { WORK_EXPERIENCE, CANDIDATE_PROFILE } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { EvolutionGraph } from './EvolutionGraph';

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const timelineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const timelineCardVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const bottomColumnsVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-white/[0.08] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Motion scroll trigger */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10"
        >
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>04. Track Record &amp; Leadership</span>
            <span className="text-zinc-600">/</span>
            <span>Proven In The Trenches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience &amp; Systems Ownership
          </h2>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
            From market research foundations to architecting enterprise revenue machinery and production 
            AI agents adopted company-wide.
          </p>
        </motion.div>

        {/* D3.js Evolution Graph: Skill Progression & Correlation with Motion reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <EvolutionGraph />
        </motion.div>

        {/* Experience Timeline Cards with Staggered Scroll-Into-View */}
        <motion.div
          variants={timelineContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 mb-16"
        >
          {WORK_EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.company}
              variants={timelineCardVariants}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] hover:border-amber-400/30 transition-colors relative overflow-hidden shadow-xl shadow-black/40 group"
            >
              {/* Subtle accent border on left */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-amber-400/80 via-amber-400/40 to-transparent group-hover:from-amber-400 group-hover:w-1.5 transition-all" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                    <span className="text-amber-400 font-semibold">{exp.company}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  {exp.concurrentRole && (
                    <div className="text-xs font-medium text-emerald-400 mt-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{exp.concurrentRole}</span>
                    </div>
                  )}
                </div>

                <div className="font-mono text-xs text-amber-300/90 bg-amber-400/[0.08] px-3.5 py-1.5 rounded-lg border border-amber-400/20 shrink-0 self-start font-semibold">
                  {exp.period}
                </div>
              </div>

              {/* Bullet highlights with stagger */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((item, hIdx) => (
                  <motion.div
                    key={hIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + hIdx * 0.06,
                      ease: 'easeOut',
                    }}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04] hover:border-white/[0.1] flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed transition-colors"
                  >
                    <span className="text-amber-400 font-mono text-xs mt-0.5 shrink-0">✦</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership Principles & Education Two-Column with Motion scroll trigger */}
        <motion.div
          variants={bottomColumnsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Leadership & Ownership */}
          <motion.div
            variants={timelineCardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-8 p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors space-y-4 shadow-xl shadow-black/40"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Leadership &amp; Operating Mindset</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Zero-Support Builder &amp; Cross-Functional Standard Setter
            </h3>
            
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Zero-Support Ownership</div>
                <p className="text-zinc-400 leading-relaxed">
                  Conceived, architected, and shipped autonomous agents, custom CRM, and intelligence platforms with zero dedicated engineering headcount.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Cross-Functional Builder</div>
                <p className="text-zinc-400 leading-relaxed">
                  Deeply studied marketing, pre-sales, and commercial sales workflows in the field, designing tools that those teams adopted directly to replace repetitive tasks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Adoption Driver</div>
                <p className="text-zinc-400 leading-relaxed">
                  Turned personal automation scripts into department-wide operating standards through hands-on training, documentation, and user feedback loops.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education & Academic Foundation */}
          <motion.div
            variants={timelineCardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-4 p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors flex flex-col justify-between shadow-xl shadow-black/40"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Academic Foundation</span>
              </div>
              
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] mb-4">
                <div className="text-base font-bold text-white tracking-tight">
                  {CANDIDATE_PROFILE.education.degree}
                </div>
                <div className="text-xs text-amber-400 font-mono mt-1 font-semibold">
                  {CANDIDATE_PROFILE.education.institution} · Class of {CANDIDATE_PROFILE.education.year}
                </div>
                <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                  Rigorous computer science core: relational database theory, algorithms, network architectures, and distributed systems fundamentals.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-xs text-zinc-300 font-mono">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>MNC Readiness</span>
              </div>
              <div className="text-zinc-300">Available for global remote &amp; on-site tier-1 tech hubs.</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
