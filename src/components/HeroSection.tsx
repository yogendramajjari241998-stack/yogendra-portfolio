import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Database, Zap, Layers, Sparkles, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { CANDIDATE_PROFILE, CORE_METRICS } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenRecruiterDossier: () => void;
  onExploreAgents: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRecruiterDossier,
  onExploreAgents
}) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'crm' | 'pipeline'>('agents');

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Split-screen 2-column hero container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mb-16">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed clean metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
                <span>Hyderabad, India</span>
                <span className="text-zinc-600">/</span>
                <span>4+ Years Production Systems</span>
                <span className="text-zinc-600">/</span>
                <span className="text-amber-400 font-semibold">Zero-SaaS-Bloat Mindset</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
                Autonomous AI Agents &amp; Enterprise Revenue Systems Engineered for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
                  Massive Operating Leverage
                </span>
              </h1>

              {/* Lead Body Copy */}
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 max-w-2xl font-light">
                Started as a small village boy with big dreams 😉 doing raw database extraction. Conquered the cold outbound trenches across phone, WhatsApp (Wati/Gupshup), and email (Woodpecker/Resend). Then mastered full-funnel creative, SEO, websites from scratch, and GTM strategy. Because I lived every manual drill with my own hands, I automated the entire beast into autonomous AI agent pipelines and custom zero-bloat CRMs.
              </p>

              {/* Target Roles (Clean unboxed inline list) */}
              <div className="mb-8 pt-4 border-t border-white/[0.08]">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  Target Roles for Top MNC Teams
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-zinc-300">
                  {CANDIDATE_PROFILE.openRoles.map((role, idx) => (
                    <React.Fragment key={role}>
                      <span className="text-zinc-200 hover:text-amber-300 transition-colors">{role}</span>
                      {idx < CANDIDATE_PROFILE.openRoles.length - 1 && (
                        <span className="text-zinc-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('who-am-i');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-xl transition-all cursor-pointer"
              >
                <span>Who Am I? (The Journey)</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onExploreAgents}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-400/10 group"
              >
                <span>Inspect Multi-Agent Engine</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenRecruiterDossier}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] rounded-xl transition-all cursor-pointer"
              >
                <span>Recruiter Evaluation</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Resolution Cinematic Interactive Graphic Container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full cinematic-glass rounded-2xl p-6 flex flex-col justify-between border border-white/[0.1] relative overflow-hidden group">
              {/* Subtle grid backdrop inside card */}
              <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

              {/* Header inside graphic card */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <span className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider">
                    Live System Architecture
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">Autonomous Core</span>
              </div>

              {/* Interactive Segmented Switcher */}
              <div className="relative z-10 grid grid-cols-3 gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg mb-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('agents')}
                  className={`py-1.5 px-2 rounded-md transition-colors cursor-pointer text-center ${
                    activeTab === 'agents'
                      ? 'bg-amber-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  5 Agents
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`py-1.5 px-2 rounded-md transition-colors cursor-pointer text-center ${
                    activeTab === 'crm'
                      ? 'bg-amber-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Custom CRM
                </button>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`py-1.5 px-2 rounded-md transition-colors cursor-pointer text-center ${
                    activeTab === 'pipeline'
                      ? 'bg-amber-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ₹100Cr Pipeline
                </button>
              </div>

              {/* Dynamic visual preview based on active tab */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                {activeTab === 'agents' && (
                  <motion.div
                    key="tab-agents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5" />
                          Multi-Agent Campaign Pipeline
                        </span>
                        <span className="text-zinc-500">Claude API + n8n</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 pt-1">
                        {['Plan', 'Copy', 'Creative', 'Execute', 'Report'].map((step, i) => (
                          <div
                            key={step}
                            className={`p-1.5 text-center rounded border ${
                              i === 1
                                ? 'border-amber-400/40 bg-amber-400/10 text-amber-300 font-medium'
                                : 'border-white/[0.08] bg-white/[0.02] text-zinc-400'
                            } text-[10px] font-mono`}
                          >
                            <div className="text-[9px] text-zinc-500">0{i + 1}</div>
                            <div className="truncate">{step}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-zinc-400 pt-1 flex items-center justify-between border-t border-white/[0.05]">
                        <span>Human Approval Gate at 02 (Content)</span>
                        <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] font-mono text-[11px] text-zinc-300 space-y-1">
                      <div className="text-zinc-500 text-[10px]">// Claude 3.7 Output Telemetry</div>
                      <div className="text-amber-300 truncate">
                        &gt; 5-touch sequence synthesized for Enterprise CPCB tier
                      </div>
                      <div className="text-zinc-400 text-[10px]">
                        Latency: 1.4s · Resend dispatch: queued · Zero SaaS seat costs
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'crm' && (
                  <motion.div
                    key="tab-crm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" />
                          Supabase Relational CRM
                        </span>
                        <span className="text-emerald-400 font-mono text-[10px]">RLS Enforced</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-mono text-zinc-300">
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/[0.04]">
                          <span className="text-zinc-400">leads_accounts_rel</span>
                          <span className="text-amber-300">12,400+ indexed</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/[0.04]">
                          <span className="text-zinc-400">pipeline_stages</span>
                          <span className="text-zinc-300">Raw → Qual → Closure</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/[0.04]">
                          <span className="text-zinc-400">recurring_saas_bill</span>
                          <span className="text-emerald-400 font-bold">$0.00 / mo</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'pipeline' && (
                  <motion.div
                    key="tab-pipeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Growth Machine Engine
                        </span>
                        <span className="text-zinc-400 font-mono text-[10px]">1,000+ leads/wk</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono">
                        <div className="p-2 rounded bg-black/40 border border-white/[0.05]">
                          <div className="text-xl font-bold text-amber-400 tabular-nums">₹100Cr</div>
                          <div className="text-[10px] text-zinc-400">Pipeline Built</div>
                        </div>
                        <div className="p-2 rounded bg-black/40 border border-white/[0.05]">
                          <div className="text-xl font-bold text-emerald-400 tabular-nums">+40%</div>
                          <div className="text-[10px] text-zinc-400">Outbound Meetings</div>
                        </div>
                      </div>
                      <div className="text-[11px] text-zinc-400 text-center pt-1">
                        Sourced via Apollo + SalesNav + Custom 24/7 Scraping
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px]">System Owner: Yogendra Majjari</span>
                <span className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                  Ready for Production
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column key metrics strip below the split */}
        <div className="w-full pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className="p-6 cinematic-glass rounded-xl border border-white/[0.06] hover:border-white/[0.14] transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight mb-1 text-amber-400">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-zinc-400 leading-snug">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
