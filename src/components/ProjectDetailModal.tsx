import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Code2, Layers, Cpu, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenRecruiterDossier: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenRecruiterDossier
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0f14] border border-white/[0.12] rounded-2xl shadow-2xl z-10 p-6 sm:p-8 text-zinc-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <span className="text-amber-400 font-semibold">{project.category}</span>
                <span>·</span>
                <span>{project.timeline}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Metric Spotlight Strip */}
          <div className="my-6 p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-amber-300 uppercase tracking-wider mb-1">
                Primary Business Impact
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {project.impactMetric}
                <span className="text-sm font-sans font-normal text-zinc-400 ml-2">
                  ({project.impactLabel})
                </span>
              </div>
            </div>
            <div className="text-xs text-zinc-300 sm:max-w-md italic border-l-0 sm:border-l border-white/[0.1] sm:pl-4">
              &quot;{project.quoteOrHighlight}&quot;
            </div>
          </div>

          {/* Deep-Dive Grid: Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>The Delivered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] my-6 space-y-2">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Technical Architecture &amp; Data Pipeline</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          <div className="my-6">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Key Capabilities &amp; Verification Points
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-start gap-2.5 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code or SQL architecture snippet if available */}
          {project.codeSnippet && (
            <div className="my-6">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  {project.codeSnippet.title}
                </span>
                <span className="uppercase text-[10px] text-zinc-500">
                  {project.codeSnippet.language}
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-black/80 border border-white/[0.08] overflow-x-auto text-[11px] font-mono text-zinc-300 leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tech Stack */}
          <div className="my-6 pt-4 border-t border-white/[0.08]">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
              Technology Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(item => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded-md text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-zinc-500 font-mono">
              Role: Systems Owner &amp; Lead Engineer
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenRecruiterDossier();
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                <span>Evaluate Fit for Open Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
