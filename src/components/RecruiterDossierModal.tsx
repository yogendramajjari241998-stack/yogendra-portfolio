import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  Check,
  Copy,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Briefcase,
  Award,
  Sparkles,
  Send,
  FileText
} from 'lucide-react';
import { CANDIDATE_PROFILE, RECRUITER_MATCH_CRITERIA } from '../data/portfolioData';

interface RecruiterDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'roles' | 'pdf' | 'contact';
}

export const RecruiterDossierModal: React.FC<RecruiterDossierModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'roles'
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'pdf' | 'contact'>(initialTab);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick message builder state
  const [companyName, setCompanyName] = useState('');
  const [targetRole, setTargetRole] = useState('GTM Engineer');
  const [recruiterMessage, setRecruiterMessage] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Executive Interview / Role Discussion: ${targetRole} ${companyName ? `at ${companyName}` : ''}`);
    const body = encodeURIComponent(
      `Hi Yogendra,\n\nI reviewed your AI Multi-Agent & GTM Systems portfolio and would love to connect regarding our open ${targetRole} opportunity${companyName ? ` at ${companyName}` : ''}.\n\n${recruiterMessage ? `${recruiterMessage}\n\n` : ''}Let us know your availability for a brief call.\n\nBest regards,`
    );
    window.location.href = `mailto:${CANDIDATE_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0f14] border border-white/[0.12] rounded-2xl shadow-2xl z-10 p-6 sm:p-8 text-zinc-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <span>Recruiter Executive Brief</span>
              <span className="text-zinc-600">/</span>
              <span>Top MNC Candidate Dossier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {CANDIDATE_PROFILE.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-1">
              <span>{CANDIDATE_PROFILE.location}</span>
              <span className="text-zinc-600">·</span>
              <span>Available for Immediate Impact</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-mono">Verified Portfolio Assets</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2 my-6 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'roles'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            MNC Role Matching
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'pdf'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive Resume PDF</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-2 px-3 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Outreach</span>
          </button>
        </div>

        {/* Tab 1: MNC Role Matching */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <strong>Recruiter Assessment Note:</strong> Yogendra builds without reliance on large external engineering teams. He connects business objectives directly to autonomous code, combining CRM administration (HubSpot, Salesforce, Zoho) with production Python backends, Claude API prompt design, and Supabase database architecture.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RECRUITER_MATCH_CRITERIA.map(item => (
                <div
                  key={item.role}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-400/10 rounded border border-amber-400/30">
                      {item.matchScore} Match
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-zinc-300">
                    {item.keyStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono text-xs">✓</span>
                        <span className="leading-snug">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Candidate Highlights Strip */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <div>
                <span className="text-zinc-500">Notice Period:</span>{' '}
                <span className="text-amber-400 font-semibold">Immediate / Negotiable</span>
              </div>
              <div>
                <span className="text-zinc-500">Target Locations:</span>{' '}
                <span className="text-white">Hyderabad / Bangalore / Remote (Global)</span>
              </div>
              <div>
                <span className="text-zinc-500">Degree:</span>{' '}
                <span className="text-white">B.Sc. Computer Science (2021)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Resume PDF Embed & Download */}
        {activeTab === 'pdf' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs text-zinc-300">
              <span>Original Verified Candidate Resume (PDF format, 2 pages)</span>
              <div className="flex items-center gap-2">
                <a
                  href={CANDIDATE_PROFILE.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.1] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
                <a
                  href={CANDIDATE_PROFILE.resumePdfPath}
                  download="Yogendra_Majjari_Resume.pdf"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="w-full h-[520px] rounded-xl overflow-hidden border border-white/[0.1] bg-zinc-950">
              <iframe
                src={`${CANDIDATE_PROFILE.resumePdfPath}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Yogendra Majjari Resume"
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Direct Outreach & Fast-Track Scheduler */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> Email
                  </span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {CANDIDATE_PROFILE.email}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {copiedEmail ? 'Copied to clipboard!' : 'Click to copy'}
                </div>
              </div>

              <div
                onClick={handleCopyPhone}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone
                  </span>
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs font-semibold text-white font-mono">
                  {CANDIDATE_PROFILE.phone}
                </div>
                <div className="text-[10px] text-zinc-500">
                  {copiedPhone ? 'Copied to clipboard!' : 'Click to copy phone'}
                </div>
              </div>

              <a
                href={CANDIDATE_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-400/50 transition-all cursor-pointer space-y-1 block"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  /in/yogendramajjari-4a1768270
                </div>
                <div className="text-[10px] text-zinc-500">
                  Open verified profile
                </div>
              </a>
            </div>

            {/* Quick Invitation Drafter */}
            <form onSubmit={handleSendDraft} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Draft Direct Invitation Message (Pre-populates your email client)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Stripe, Microsoft, Meta"
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Target Opportunity
                  </label>
                  <select
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="GTM Engineer">GTM Engineer</option>
                    <option value="AI Automation Specialist">AI Automation Specialist</option>
                    <option value="RevOps Lead / Architect">RevOps Lead / Architect</option>
                    <option value="CRM Systems Manager">CRM Systems Manager</option>
                    <option value="Senior Engineering Lead">Senior Engineering Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Optional Note / Team Context
                </label>
                <textarea
                  rows={2}
                  value={recruiterMessage}
                  onChange={e => setRecruiterMessage(e.target.value)}
                  placeholder="e.g. We are building out our enterprise revenue systems & autonomous GTM operations team."
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Direct Email to Yogendra</span>
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Candidate Email: yogendra.majjari241998@gmail.com</span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
