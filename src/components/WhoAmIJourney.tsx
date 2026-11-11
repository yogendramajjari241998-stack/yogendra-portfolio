import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Database,
  BarChart2,
  Send,
  Palette,
  Briefcase,
  Cpu,
  ArrowDown,
  Quote,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';
import { WHO_AM_I_STORY, StoryChapter, CANDIDATE_PROFILE } from '../data/portfolioData';

interface WhoAmIJourneyProps {
  onExploreSystems?: () => void;
  onOpenRecruiterDossier?: () => void;
}

export const WhoAmIJourney: React.FC<WhoAmIJourneyProps> = ({
  onExploreSystems,
  onOpenRecruiterDossier
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);

  const currentChapter: StoryChapter = WHO_AM_I_STORY[activeChapterIndex];

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) {
      setAutoProgress(0);
      return;
    }

    const duration = 8000; // 8 seconds per chapter
    const tick = 100;
    const increment = (tick / duration) * 100;

    const interval = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((idx) => (idx + 1) % WHO_AM_I_STORY.length);
          return 0;
        }
        return prev + increment;
      });
    }, tick);

    return () => clearInterval(interval);
  }, [isPlaying, activeChapterIndex]);

  const handleNext = () => {
    setActiveChapterIndex((prev) => (prev + 1) % WHO_AM_I_STORY.length);
    setAutoProgress(0);
  };

  const handlePrev = () => {
    setActiveChapterIndex((prev) => (prev - 1 + WHO_AM_I_STORY.length) % WHO_AM_I_STORY.length);
    setAutoProgress(0);
  };

  const handleSelect = (idx: number) => {
    setActiveChapterIndex(idx);
    setAutoProgress(0);
  };

  // Chapter icon resolver
  const getChapterIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Database className="w-4 h-4" />;
      case 1:
        return <BarChart2 className="w-4 h-4" />;
      case 2:
        return <Send className="w-4 h-4" />;
      case 3:
        return <Palette className="w-4 h-4" />;
      case 4:
        return <Briefcase className="w-4 h-4" />;
      case 5:
        return <Cpu className="w-4 h-4" />;
      case 6:
        return <Zap className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="who-am-i" className="py-20 relative bg-black border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[#de1b1c]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Cinematic Origin &amp; Professional Odyssey</span>
              <span className="text-zinc-600">/</span>
              <span>Ground Truth</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Who Am I?
            </h2>
            <p className="text-zinc-400 mt-3 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Not a list of academic lectures or corporate buzzwords. The authentic story of a small village boy with big dreams 😉 who mastered raw data with his bare hands—and ended up automating enterprise revenue.
            </p>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer shadow-md shadow-amber-400/20 active:scale-95"
              title={isPlaying ? 'Pause cinematic reel' : 'Play cinematic story reel'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Story</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Cinematic Reel</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/[0.08]">
              <button
                onClick={handlePrev}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-zinc-300 px-2 tabular-nums">
                0{activeChapterIndex + 1} / 0{WHO_AM_I_STORY.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Next chapter"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 7-Chapter Interactive Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {WHO_AM_I_STORY.map((chapter, idx) => {
            const isSelected = activeChapterIndex === idx;
            return (
              <button
                key={chapter.id}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400/80 shadow-lg shadow-amber-400/10'
                    : 'bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04]'
                }`}
              >
                {/* Auto-play progress fill line on active button */}
                {isSelected && isPlaying && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-amber-400/10 transition-all ease-linear"
                    style={{ width: `${autoProgress}%` }}
                  />
                )}

                {/* Top active marker */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-amber-400 text-zinc-950' : 'bg-white/[0.05] text-zinc-400'
                      }`}
                    >
                      {getChapterIcon(idx)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{chapter.chapterNumber}</span>
                  </div>

                  <div className="text-xs font-bold text-white line-clamp-1 mb-0.5">
                    {chapter.title.split(':')[0]}
                  </div>
                  <div className="text-[10px] text-zinc-400 line-clamp-1">{chapter.tagline}</div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-white/[0.05] text-[10px] font-mono text-zinc-500">
                  {chapter.milestoneYear}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Cinematic Chapter Stage Display */}
        <div className="cinematic-glass rounded-2xl border border-white/[0.12] p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle watermark in background */}
          <div className="absolute -bottom-10 -right-8 text-[120px] sm:text-[180px] font-black font-mono text-white/[0.02] select-none pointer-events-none">
            {currentChapter.chapterNumber}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Chapter Meta & Milestone Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span>Act {currentChapter.chapterNumber}</span>
                    <span className="text-zinc-600">·</span>
                    <span>{currentChapter.tagline}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    {currentChapter.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.03] px-3.5 py-2 rounded-lg border border-white/[0.08] self-start sm:self-auto">
                  <span className="text-zinc-500">Timeline Milestone:</span>
                  <span className="text-amber-300 font-bold">{currentChapter.milestoneYear}</span>
                </div>
              </div>

              {/* Hook Banner */}
              <div className="p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-sm sm:text-base font-medium text-amber-200/90 leading-relaxed italic">
                &ldquo;{currentChapter.hook}&rdquo;
              </div>

              {/* Narrative Core & Philosophy Quote */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 cols: Detailed Narrative */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    The Ground Reality
                  </div>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                    {currentChapter.narrative}
                  </p>

                  {/* Mindset Shift Callout */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
                        Mindset Shift Unlocked
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-300">
                        {currentChapter.mindsetShift}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 cols: Authentic Quote, Skills & Tools */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Highlight Quote Box */}
                  <div className="p-5 rounded-xl bg-black/60 border border-white/[0.08] relative">
                    <Quote className="w-6 h-6 text-amber-400/40 mb-2" />
                    <p className="text-xs sm:text-sm text-zinc-200 italic leading-relaxed mb-3">
                      &ldquo;{currentChapter.highlightQuote}&rdquo;
                    </p>
                    <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                      <span>— Yogendra Majjari</span>
                      <span className="text-amber-400 font-bold">{currentChapter.milestoneYear}</span>
                    </div>
                  </div>

                  {/* Skills Gained in this Stage */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                      Capabilities Forged in the Trenches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentChapter.skillsGained.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded text-zinc-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Channels Mastered */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                      Tools &amp; Channels Mastered
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentChapter.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-xs font-mono bg-amber-400/10 border border-amber-400/30 rounded text-amber-300 font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Jump & Navigation Bar */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-emerald-400 font-semibold">Available for Senior AI &amp; GTM Roles</span>
                  <span className="text-zinc-600">·</span>
                  <span>Hyderabad / Global Remote</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('projects-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Inspect 8 Flagship Systems</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('agent-engine');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/10"
                  >
                    <span>Launch 5-Agent Simulator</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
