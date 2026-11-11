import React from 'react';
import { WORK_EXPERIENCE, CANDIDATE_PROFILE } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { EvolutionGraph } from './EvolutionGraph';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>04. Track Record &amp; Leadership</span>
            <span className="text-zinc-600">/</span>
            <span>Proven In The Trenches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience &amp; Systems Ownership
          </h2>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
            From market research foundations to architecting enterprise revenue machinery and production 
            AI agents adopted company-wide.
          </p>
        </div>

        {/* D3.js Evolution Graph: Skill Progression & Correlation */}
        <EvolutionGraph />

        {/* Experience Timeline Cards */}
        <div className="space-y-8 mb-16">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.company}
              className="p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                    <span className="text-amber-400 font-semibold">{exp.company}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {exp.role}
                  </h3>
                  {exp.concurrentRole && (
                    <div className="text-xs font-medium text-emerald-400 mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{exp.concurrentRole}</span>
                    </div>
                  )}
                </div>

                <div className="font-mono text-xs text-zinc-400 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.08] shrink-0 self-start">
                  {exp.period}
                </div>
              </div>

              {/* Bullet highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((item, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04] flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed"
                  >
                    <span className="text-amber-400 font-mono text-xs mt-0.5">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Principles & Education Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Leadership & Ownership */}
          <div className="lg:col-span-8 p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Leadership &amp; Operating Mindset</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Zero-Support Builder &amp; Cross-Functional Standard Setter
            </h3>
            
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Zero-Support Ownership</div>
                <p className="text-zinc-400">
                  Conceived, architected, and shipped the autonomous agents, custom CRM, and intelligence platforms with zero dedicated engineering headcount.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Cross-Functional Builder</div>
                <p className="text-zinc-400">
                  Deeply studied marketing, pre-sales, and commercial sales workflows in the field, designing tools that those teams adopted directly to replace repetitive tasks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 space-y-1">
                <div className="font-semibold text-white">Adoption Driver</div>
                <p className="text-zinc-400">
                  Turned personal automation scripts into department-wide operating standards through hands-on training, documentation, and user feedback loops.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Academic Foundation */}
          <div className="lg:col-span-4 p-6 sm:p-8 cinematic-glass rounded-2xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Academic Foundation</span>
              </div>
              
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] mb-4">
                <div className="text-base font-bold text-white">
                  {CANDIDATE_PROFILE.education.degree}
                </div>
                <div className="text-xs text-amber-400 font-mono mt-1">
                  {CANDIDATE_PROFILE.education.institution} · Class of {CANDIDATE_PROFILE.education.year}
                </div>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Rigorous computer science core: relational database theory, algorithms, network architectures, and distributed systems fundamentals.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-xs text-zinc-300 font-mono">
              <div className="text-amber-400 font-bold mb-1">MNC Readiness</div>
              <div>Available for global remote &amp; on-site tier-1 tech hubs.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
