import React, { useState } from 'react';
import { Download, FileText, Menu, X, ArrowUpRight, Check, Copy } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenRecruiterDossier: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenRecruiterDossier
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>{CANDIDATE_PROFILE.name}</span>
          <span className="text-xs font-mono text-zinc-500 font-normal">/ Systems</span>
        </a>

        {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#agent-engine"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Multi-Agent Engine
          </a>
          <a
            href="#projects"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Systems Portfolio
          </a>
          <a
            href="#tech-matrix"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Tech Matrix
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Experience
          </a>
          <button
            onClick={onOpenRecruiterDossier}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer text-zinc-300 font-semibold"
          >
            Recruiter Dossier
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-amber-400/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="p-2 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg flex items-center gap-1"
            title="View Resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0e12] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
            <a
              href="#agent-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 transition-colors"
            >
              Multi-Agent Engine
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 transition-colors"
            >
              Systems Portfolio
            </a>
            <a
              href="#tech-matrix"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 transition-colors"
            >
              Tech Matrix
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-400 transition-colors"
            >
              Experience
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterDossier();
              }}
              className="text-left text-amber-400 font-semibold cursor-pointer"
            >
              Recruiter Dossier & MNC Matching
            </button>
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-amber-400 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Open Resume PDF</span>
            </button>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-zinc-300 border border-white/[0.1] rounded-lg hover:bg-white/[0.05]"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy yogendra.majjari241998@gmail.com'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
