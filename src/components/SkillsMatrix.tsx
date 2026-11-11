import React, { useState } from 'react';
import { TECHNICAL_SKILLS_MATRIX } from '../data/portfolioData';
import { Cpu, CheckCircle2, Terminal, Shield, Zap } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

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

  return (
    <section id="tech-matrix" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>03. Technical Competencies</span>
            <span className="text-zinc-600">/</span>
            <span>Production-Tested</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Stack Systems &amp; RevOps Competency Matrix
          </h2>
          <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
            Demonstrated mastery bridging generative AI models, custom relational database schemas, 
            and enterprise CRM routing without external software bloat.
          </p>
        </div>

        {/* 4 Category Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNICAL_SKILLS_MATRIX.map((group, groupIdx) => (
            <div
              key={group.category}
              className="p-6 cinematic-glass rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                  {getCategoryIcon(groupIdx)}
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {group.skills.map(skill => (
                    <li
                      key={skill.name}
                      className="flex flex-col text-xs"
                    >
                      <div className="flex items-center justify-between font-medium text-zinc-200 mb-0.5">
                        <span>{skill.name}</span>
                        <span className="text-[10px] font-mono text-amber-400/90">
                          {skill.level}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400/50 to-amber-400 rounded-full"
                          style={{
                            width: skill.level.includes('Architect') || skill.level.includes('Enterprise')
                              ? '95%'
                              : skill.level.includes('Expert')
                              ? '90%'
                              : skill.level.includes('Advanced')
                              ? '85%'
                              : '80%'
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Domain {groupIdx + 1} of 4</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
