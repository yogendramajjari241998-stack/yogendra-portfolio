import React from 'react';
import { ArrowUp, Mail, Phone, Linkedin, FileText } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
  onOpenRecruiterDossier: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResume,
  onOpenRecruiterDossier
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand & Pitch */}
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              {CANDIDATE_PROFILE.name}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              GTM Engineer &amp; AI Automation Systems Specialist · Hyderabad, India
            </div>
          </div>

          {/* Quick Links & Actions */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-medium">
            <button
              onClick={onOpenResume}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <button
              onClick={onOpenRecruiterDossier}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Recruiter Dossier
            </button>
            <a
              href={CANDIDATE_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${CANDIDATE_PROFILE.email}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{CANDIDATE_PROFILE.email}</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
          <div>
            &copy; {new Date().getFullYear()} Yogendra Majjari. All systems engineered for production scale.
          </div>
          <div>
            Zero-SaaS-Bloat · High Operating Leverage
          </div>
        </div>
      </div>
    </footer>
  );
};
