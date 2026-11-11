import React, { useState } from 'react';
import { ShieldCheck, FileText, Bot, PhoneCall, Sparkles, ChevronUp, ChevronDown, Check, Copy } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';

interface RecruiterCommandBarProps {
  onOpenRecruiterDossier: (tab?: 'roles' | 'pdf' | 'contact') => void;
  onOpenSimulator: () => void;
}

export const RecruiterCommandBar: React.FC<RecruiterCommandBarProps> = ({
  onOpenRecruiterDossier,
  onOpenSimulator
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${CANDIDATE_PROFILE.name} | ${CANDIDATE_PROFILE.email} | ${CANDIDATE_PROFILE.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm">
      <div className="cinematic-glass rounded-2xl p-3 border border-white/[0.15] shadow-2xl backdrop-blur-xl bg-black/85 text-zinc-200 transition-all">
        {/* Top Header of the HUD */}
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Recruiter Command HUD
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-1.5 py-0.5 bg-emerald-400/10 rounded border border-emerald-400/20">
              Immediate Impact
            </span>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle HUD"
            >
              {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action Body */}
        {!collapsed && (
          <div className="pt-2.5 space-y-2">
            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Candidate: <strong className="text-white">Yogendra Majjari</strong></span>
              <span className="font-mono text-amber-400 font-bold">₹100Cr Pipeline</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => onOpenRecruiterDossier('roles')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold transition-all cursor-pointer shadow-md shadow-amber-400/10 justify-center"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>MNC Match</span>
              </button>

              <button
                onClick={() => onOpenRecruiterDossier('pdf')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium transition-all cursor-pointer justify-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={onOpenSimulator}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 transition-all cursor-pointer justify-center font-mono text-[11px]"
              >
                <Bot className="w-3 h-3 text-amber-400" />
                <span>Test 5-Agents</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 transition-all cursor-pointer justify-center font-mono text-[11px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied Info!' : 'Copy Contact'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
