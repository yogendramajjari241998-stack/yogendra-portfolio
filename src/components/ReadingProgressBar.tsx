import React, { useState, useEffect } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('Opening');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
      setIsScrolled(currentScroll > 120);

      // Section identification based on scroll offsets
      const sections = [
        { id: 'stageWrap', label: '01. Opening' },
        { id: 'hero', label: '01. Executive Overview' },
        { id: 'who-am-i', label: '02. Who Am I? (The Journey)' },
        { id: 'executive-summary', label: '03. Executive Profile' },
        { id: 'universe', label: '04. AI Universe' },
        { id: 'chrono', label: '04. Journey 2022-2026' },
        { id: 'gallery', label: '05. 3D Systems Gallery' },
        { id: 'agent-engine', label: '06. 5-Agent Pipeline & Health' },
        { id: 'projects-section', label: '07. Flagship Systems' },
        { id: 'tech-matrix', label: '08. Competencies Matrix' },
        { id: 'experience', label: '09. Experience & Leadership' },
        { id: 'resume-pdf', label: '10. Original Resume PDF' },
        { id: 'fin', label: '11. Finale & Dossier' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* 3px High-Resolution Gradient Progress Line */}
      <div className="h-[3px] w-full bg-white/[0.05] relative overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-[#de1b1c] transition-all duration-150 ease-out relative shadow-[0_0_12px_rgba(255,170,50,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Leading Pip Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] -mr-1" />
        </div>
      </div>

      {/* Subtle Unboxed Reading Indicator Badge */}
      <div
        className={`absolute top-3 left-6 transition-all duration-300 font-mono text-[10px] text-zinc-400 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08] flex items-center gap-2 shadow-lg ${
          isScrolled ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <span className="text-amber-400 font-semibold">{activeSection}</span>
        <span className="text-zinc-600" aria-hidden="true">·</span>
        <span className="text-zinc-300 tabular-nums font-bold">{Math.round(scrollProgress)}%</span>
      </div>
    </div>
  );
};
