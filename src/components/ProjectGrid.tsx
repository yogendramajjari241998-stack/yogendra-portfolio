import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Database, Bot, Zap, Globe, Shield, ExternalLink, Code2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS, ProjectItem } from '../data/portfolioData';

interface ProjectGridProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES = ['All Systems', 'AI Agents', 'Custom CRM', 'Data & BI', 'RevOps & Growth', 'Web Systems'] as const;

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Systems');

  const filteredProjects = activeCategory === 'All Systems'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI Agents':
        return <Bot className="w-4 h-4 text-amber-400" />;
      case 'Custom CRM':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Data & BI':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'RevOps & Growth':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Web Systems':
        return <Globe className="w-4 h-4 text-purple-400" />;
      default:
        return <Code2 className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span>02. Engineering &amp; Operations Portfolio</span>
              <span className="text-zinc-600">/</span>
              <span>Production Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              High-End Revenue Systems &amp; BI Platforms
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
              Autonomous agents, proprietary CRM infrastructure, geospatial intelligence engines, and 
              high-ROI growth pipelines delivered with zero-dependency ownership.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-x-auto max-w-full">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* High-Resolution Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            // Give first 2 featured items col-span-2 or special framing on large screens if in 'All' view
            const isFeatured = idx === 0 && activeCategory === 'All Systems';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative cinematic-glass rounded-2xl p-6 border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90' : ''
                }`}
              >
                {/* Subtle hover spotlight element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/[0.03] rounded-full blur-2xl group-hover:bg-amber-400/[0.08] transition-all pointer-events-none" />

                <div>
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(project.category)}
                      <span className="font-medium text-zinc-300">{project.category}</span>
                      <span className="text-zinc-600" aria-hidden="true">·</span>
                      <span className="font-mono text-zinc-500">{project.timeline}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-amber-400 transition-colors">
                      <span className="text-[11px] font-mono hidden sm:inline">Inspect Architecture</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.subtitle}
                  </p>

                  {/* High-Impact Metric Block */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black text-amber-400 font-mono tabular-nums tracking-tight">
                        {project.impactMetric}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {project.impactLabel}
                      </div>
                    </div>
                    <div className="text-right max-w-[180px]">
                      <div className="text-[11px] text-zinc-400 italic line-clamp-2">
                        &quot;{project.quoteOrHighlight}&quot;
                      </div>
                    </div>
                  </div>

                  {/* Core Architecture summary */}
                  <p className="text-xs text-zinc-300 mb-6 line-clamp-3 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Tech Stack tags */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
