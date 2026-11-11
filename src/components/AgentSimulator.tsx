import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  FileText,
  Palette,
  Send,
  BarChart3,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Terminal,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Cpu,
  Radio,
  ArrowRightLeft,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MULTI_AGENTS, AgentNode } from '../data/portfolioData';
import { AgentHealthDashboard } from './AgentHealthDashboard';

const SAMPLE_PROSPECTS = [
  {
    name: 'Tata Steel — Industrial Scrap & ITAD Division',
    tier: 'Tier 1 Enterprise (CPCB Registered)',
    shortfall: 'Needs compliance certification across 4 state regional units',
    estimatedValue: '₹4.2 Cr'
  },
  {
    name: 'Foxconn Manufacturing India — Asset Disposal',
    tier: 'Electronics OEM',
    shortfall: 'ITAD recycling shortfall: 420 Metric Tons/yr',
    estimatedValue: '₹2.8 Cr'
  },
  {
    name: 'Mahindra Logistics — Reverse Supply Chain',
    tier: 'Logistics & Warehouse Fleet',
    shortfall: 'EPR plastic packaging target unmet by 18%',
    estimatedValue: '₹1.9 Cr'
  }
];

// Baseline latency per agent node (ms)
const BASELINE_LATENCIES: Record<string, number> = {
  planning: 12,
  content: 16,
  creative: 14,
  execution: 10,
  reporting: 8
};

// Simulated threshold for system awareness demonstration (22ms)
const SIMULATED_THRESHOLD_MS = 22;

export const AgentSimulator: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentNode>(MULTI_AGENTS[0]);
  const [selectedProspect, setSelectedProspect] = useState(SAMPLE_PROSPECTS[0]);
  const [simStep, setSimStep] = useState<number>(-1); // -1: idle, 0..4: running stages
  const [humanApproved, setHumanApproved] = useState<boolean | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [transitPacket, setTransitPacket] = useState<string | null>(null);

  // Dynamic live latency readouts per agent node
  const [nodeLatencies, setNodeLatencies] = useState<Record<string, number>>(BASELINE_LATENCIES);

  // Jitter and load simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setNodeLatencies((prev) => {
        const updated: Record<string, number> = {};
        for (const [key, base] of Object.entries(BASELINE_LATENCIES)) {
          let current = base;

          // If surge mode is active, elevate above threshold
          if (isSurgeActive) {
            current = base + Math.floor(Math.random() * 16) + 18; // 28ms - 44ms
          }
          // If this agent is currently actively processing a simulated step
          else if (
            (key === 'planning' && simStep === 0) ||
            (key === 'content' && simStep === 1) ||
            (key === 'creative' && simStep === 2) ||
            (key === 'execution' && simStep === 3) ||
            (key === 'reporting' && simStep === 4)
          ) {
            // Processing load temporarily crosses the 22ms threshold
            current = base + Math.floor(Math.random() * 10) + 14; // 24ms - 34ms
          } else {
            // Normal baseline with minor jitter (< 22ms)
            const jitter = Math.floor(Math.random() * 6) - 3;
            current = Math.max(6, base + jitter);
          }

          updated[key] = current;
        }
        return updated;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [simStep, isSurgeActive]);

  // Icon resolver
  const getIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'planning':
        return <Compass className={className} />;
      case 'content':
        return <FileText className={className} />;
      case 'creative':
        return <Palette className={className} />;
      case 'execution':
        return <Send className={className} />;
      case 'reporting':
        return <BarChart3 className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Automated end-to-end simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setHumanApproved(null);
    setSimStep(0);
    setSelectedAgent(MULTI_AGENTS[0]);
    setTransitPacket('Planning Agent generating ICP matrix...');

    // Step 0 -> Step 1 after 1500ms
    setTimeout(() => {
      setSimStep(1);
      setSelectedAgent(MULTI_AGENTS[1]);
      setTransitPacket('Transmitting ICP data to Content Agent (Claude API)...');
    }, 1600);
  };

  // Step-by-step manual handshake advancement
  const handleStepNextHandshake = () => {
    if (simStep === -1) {
      handleStartSimulation();
      return;
    }
    if (simStep === 1 && humanApproved === null) {
      handleApproveContent(true);
      return;
    }
    if (simStep < 4) {
      const nextStep = simStep + 1;
      setSimStep(nextStep);
      setSelectedAgent(MULTI_AGENTS[nextStep]);
      const labels = [
        'Planning Agent analyzing account signals...',
        'Routing to Content Agent with Claude 3.7 prompts...',
        'Approved copy passing to Creative Agent layout generator...',
        'Handing off asset specs to Execution Agent (Resend dispatcher)...',
        'Reporting Agent ingesting real-time webhook telemetry...'
      ];
      setTransitPacket(labels[nextStep]);
      if (nextStep === 4) {
        setIsSimulating(false);
      }
    } else {
      handleReset();
    }
  };

  // Content approval logic
  const handleApproveContent = (approved: boolean) => {
    setHumanApproved(approved);
    if (approved) {
      setTransitPacket('Human Gate Approved. Handing off copy to Creative Agent...');
      setTimeout(() => {
        setSimStep(2);
        setSelectedAgent(MULTI_AGENTS[2]);
        setTransitPacket('Creative Agent formatting asset templates & briefs...');
        setTimeout(() => {
          setSimStep(3);
          setSelectedAgent(MULTI_AGENTS[3]);
          setTransitPacket('Execution Agent queuing Resend API outbound webhooks...');
          setTimeout(() => {
            setSimStep(4);
            setSelectedAgent(MULTI_AGENTS[4]);
            setTransitPacket('Reporting Agent logging deliverability & open rates in Supabase...');
            setIsSimulating(false);
          }, 1600);
        }, 1600);
      }, 1200);
    } else {
      setIsSimulating(false);
      setTransitPacket('Content revision requested by Human Gatekeeper.');
    }
  };

  const handleReset = () => {
    setSimStep(-1);
    setHumanApproved(null);
    setIsSimulating(false);
    setSelectedAgent(MULTI_AGENTS[0]);
    setTransitPacket(null);
  };

  // Temporary Latency Spike trigger to demonstrate system awareness
  const handleTriggerSpike = () => {
    setIsSurgeActive(true);
    setTransitPacket('LOAD SURGE INJECTED: 500 concurrent ICP profiles queued. Latency readouts shifting to amber/yellow.');
    setTimeout(() => {
      setIsSurgeActive(false);
      setTransitPacket('Load surge absorbed by edge cluster. Latencies returning to nominal green.');
    }, 4000);
  };

  return (
    <section id="agent-engine" className="py-20 relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>01. Core Architectural Innovation</span>
              <span className="text-zinc-600">/</span>
              <span>Zero Software Cost</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Multi-Agent Campaign Automation System
            </h2>
            <p className="text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
              Five connected autonomous agents orchestrating the complete campaign lifecycle on n8n, 
              Claude API, Python, and Supabase with strict human-in-the-loop validation and real-time SLA latency awareness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {simStep === -1 ? (
              <button
                onClick={handleStartSimulation}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer shadow-md shadow-amber-400/20 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Live Campaign Run</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-300 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors cursor-pointer border border-white/[0.1]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}

            {/* Interactive Step Handshake Button */}
            <button
              onClick={handleStepNextHandshake}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-white/[0.04] hover:bg-white/[0.09] rounded-lg transition-all cursor-pointer border border-white/[0.12]"
              title="Manually advance payload to the next agent in the sequence"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Next Handshake →</span>
            </button>

            {/* Latency Threshold Test Surge Button */}
            <button
              onClick={handleTriggerSpike}
              disabled={isSurgeActive}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                isSurgeActive
                  ? 'bg-amber-400/25 text-amber-300 border border-amber-400/60 animate-pulse'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 border border-white/[0.08]'
              }`}
              title="Temporarily surge latency past the 22ms threshold to view green -> amber color transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSurgeActive ? 'Surging > 22ms...' : 'Test SLA Surge (>22ms)'}</span>
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* TARGET SCENARIO SELECTOR & SLA SYSTEM AWARENESS BANNER             */}
        {/* ================================================================== */}
        <div className="mb-6 p-4 cinematic-glass rounded-xl border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="font-mono text-amber-400 font-semibold uppercase tracking-wider">Target Scenario:</span>
            <div className="flex flex-wrap items-center gap-2">
              {SAMPLE_PROSPECTS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setSelectedProspect(p);
                    handleReset();
                  }}
                  disabled={isSimulating}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer font-medium ${
                    selectedProspect.name === p.name
                      ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-400/20'
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] border border-white/[0.06]'
                  } ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {p.name.split('—')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* System SLA Awareness Indicator */}
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="text-zinc-500">SLA Threshold:</span>
            <span className="text-zinc-200 font-bold tabular-nums">{SIMULATED_THRESHOLD_MS}ms</span>
            <span className="text-zinc-600">·</span>
            {isSurgeActive ? (
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/15 border border-amber-400/40 px-2 py-0.5 rounded animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                SYSTEM AWARENESS: LATENCY EXCEEDED 22ms (Auto-Mitigating)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ALL NODES WITHIN SLA (&lt; 22ms)
              </span>
            )}
          </div>
        </div>

        {/* ================================================================== */}
        {/* INTER-AGENT INTERACTION ANIMATION: SYNAPTIC PIPELINE & DATA TRANSIT*/}
        {/* ================================================================== */}
        <div className="relative mb-4 p-4 rounded-xl bg-black/60 border border-white/[0.08] overflow-hidden">
          {/* Subtle Ambient Wave Lines */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold uppercase tracking-wider text-white">
                Live Inter-Agent Synaptic Pipeline &amp; Data Handover
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Active Stage:{' '}
              <span className="text-amber-400 font-bold">
                {simStep === -1
                  ? 'System Idle'
                  : `Node 0${simStep + 1} (${MULTI_AGENTS[simStep]?.name.split('.')[1].trim()})`}
              </span>
            </div>
          </div>

          {/* Graphical Pipeline Connector with Traveling Packet Animation */}
          <div className="relative py-2">
            {/* SVG Connecting Track */}
            <div className="hidden sm:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-[#de1b1c] transition-all duration-700 ease-out"
                style={{
                  width:
                    simStep === -1
                      ? '0%'
                      : `${Math.min(100, Math.max(15, (simStep / 4) * 100))}%`
                }}
              />
            </div>

            {/* 5 Agent Step Indicators with Interactive Nodes */}
            <div className="relative z-10 grid grid-cols-5 gap-2 text-center">
              {MULTI_AGENTS.map((agent, idx) => {
                const isActive = simStep === idx;
                const isPassed = simStep > idx;
                const latency = nodeLatencies[agent.id] || BASELINE_LATENCIES[agent.id];
                const isExceeded = latency > SIMULATED_THRESHOLD_MS;

                return (
                  <div key={agent.id} className="flex flex-col items-center">
                    {/* Synaptic Node Orb with Pulse Wave */}
                    <div className="relative">
                      {isActive && (
                        <span className="absolute -inset-1.5 rounded-full bg-amber-400/40 animate-ping opacity-75" />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          isActive
                            ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-110'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                            : 'bg-zinc-900 text-zinc-500 border-white/[0.1]'
                        }`}
                      >
                        {getIcon(agent.id, 'w-4 h-4')}
                      </div>
                    </div>

                    {/* Node Title */}
                    <div className="mt-1.5 text-[11px] font-semibold text-zinc-200 truncate max-w-full">
                      {agent.name.split('.')[1].trim()}
                    </div>

                    {/* Real-Time Latency Readout with Smooth Color Shift */}
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 rounded transition-all duration-300 border tabular-nums ${
                          isExceeded
                            ? 'text-amber-300 bg-amber-500/20 border-amber-400/50 shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-pulse'
                            : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        }`}
                        title={
                          isExceeded
                            ? `Exceeded ${SIMULATED_THRESHOLD_MS}ms SLA Threshold. System Awareness Engaged.`
                            : `Optimal sub-${SIMULATED_THRESHOLD_MS}ms latency.`
                        }
                      >
                        <Zap className="w-2.5 h-2.5" />
                        <span>{latency}ms</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Traveling Data Packet Notification Banner */}
            <AnimatePresence mode="wait">
              {transitPacket && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-4 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs font-mono text-zinc-300"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-zinc-500 text-[11px]">PAYLOAD IN TRANSIT:</span>
                  <span className="text-amber-300 font-medium">{transitPacket}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 5 AGENT FLOWCHART INTERACTIVE NODE CARDS                           */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
          {MULTI_AGENTS.map((agent, index) => {
            const isActive = selectedAgent.id === agent.id;
            const isProcessing = simStep === index;
            const isCompleted = simStep > index;
            const latency = nodeLatencies[agent.id] || BASELINE_LATENCIES[agent.id];
            const isExceeded = latency > SIMULATED_THRESHOLD_MS;

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`relative p-4 rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-zinc-900 border-amber-400/80 shadow-lg shadow-amber-400/10'
                    : 'bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 rounded-t-xl" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-amber-400 text-zinc-950' : 'bg-white/[0.06] text-zinc-300'
                    }`}
                  >
                    {getIcon(agent.id, 'w-4 h-4')}
                  </div>

                  <span className="text-[11px] font-mono text-zinc-500">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-xs font-semibold text-white mb-0.5 truncate">
                  {agent.name.split('.')[1].trim()}
                </div>
                <div className="text-[11px] text-zinc-400 truncate mb-2">
                  {agent.role.split('&')[0]}
                </div>

                {/* Sub-card Latency Readout with color change */}
                <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 text-[10px]">Ping:</span>
                  <span
                    className={`font-bold tabular-nums transition-colors duration-300 ${
                      isExceeded
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {latency}ms
                  </span>
                </div>

                {/* Status indicator */}
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono">
                  {isProcessing ? (
                    <span className="text-amber-400 animate-pulse font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Active Handshake
                    </span>
                  ) : isCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3 h-3" /> Done
                    </span>
                  ) : (
                    <span className="text-zinc-500">
                      {agent.id === 'content' ? 'Human Gate' : 'Autonomous'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* DETAILED INSPECTOR CARD FOR SELECTED AGENT                         */}
        {/* ================================================================== */}
        <div className="cinematic-glass rounded-2xl border border-white/[0.1] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 cols: Specifications & Live Run Preview */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-amber-400 font-semibold">{selectedAgent.name}</span>
                  <span>·</span>
                  <span>{selectedAgent.role}</span>
                  <span>·</span>
                  {/* Live Latency readout in inspector header */}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors duration-300 border tabular-nums ${
                      (nodeLatencies[selectedAgent.id] || BASELINE_LATENCIES[selectedAgent.id]) > SIMULATED_THRESHOLD_MS
                        ? 'text-amber-300 bg-amber-500/20 border-amber-400/40'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}
                  >
                    ⚡ Current Latency: {nodeLatencies[selectedAgent.id] || BASELINE_LATENCIES[selectedAgent.id]}ms
                    {(nodeLatencies[selectedAgent.id] || BASELINE_LATENCIES[selectedAgent.id]) > SIMULATED_THRESHOLD_MS &&
                      ' (Exceeded 22ms Threshold)'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {selectedAgent.description}
                </h3>
              </div>

              {/* Live simulation interaction area: Content Gate */}
              {simStep === 1 && selectedAgent.id === 'content' && humanApproved === null && (
                <div className="p-4 rounded-xl bg-amber-400/[0.06] border border-amber-400/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>HUMAN-IN-THE-LOOP APPROVAL REQUIRED</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Claude API generated an outreach pitch tailored to <strong className="text-white">{selectedProspect.name}</strong> referencing their verified CPCB risk of <span className="text-amber-300 font-mono">{selectedProspect.shortfall}</span>.
                  </p>
                  <div className="p-3 bg-black/50 rounded-lg border border-white/[0.06] text-xs font-mono text-zinc-300 space-y-1">
                    <div className="text-zinc-500 text-[10px]">// Drafted Cold Email Subject</div>
                    <div className="text-amber-300">Subject: CPCB Compliance Audit: {selectedProspect.name.split('—')[0]} Regional Discrepancy</div>
                    <div className="text-zinc-400 text-[11px] pt-1">
                      &quot;Hi Team, our portal analysis flagged a {selectedProspect.shortfall}. We engineered an automated credit audit that clears this gap with zero downtime...&quot;
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleApproveContent(true)}
                      className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve &amp; Route to Creative Agent</span>
                    </button>
                    <button
                      onClick={() => handleApproveContent(false)}
                      className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-white/[0.04] rounded-lg transition-colors cursor-pointer border border-white/[0.08]"
                    >
                      Request Copy Revision
                    </button>
                  </div>
                </div>
              )}

              {/* Execution Finished Summary */}
              {simStep === 4 && (
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>CAMPAIGN PIPELINE SUCCESSFULLY EXECUTED</span>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed">
                    Autonomous dispatch complete for <strong className="text-white">{selectedProspect.name}</strong>. Resend webhook verified delivery; meeting probability scored at 74% with estimated deal impact of <span className="text-amber-400 font-mono font-bold">{selectedProspect.estimatedValue}</span>.
                  </div>
                </div>
              )}

              {/* System Input & Output Vectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Ingested Inputs
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {selectedAgent.inputs.map((inp) => (
                      <li key={inp} className="flex items-start gap-2">
                        <span className="text-amber-400 font-mono text-xs">→</span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Emitted Artifacts
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {selectedAgent.outputs.map((out) => (
                      <li key={out} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono text-xs">✓</span>
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Claude Prompt Design & Tech Stack */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="p-5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-500 pb-3 mb-3 border-b border-white/[0.06]">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    Prompt &amp; Reasoning Architecture
                  </span>
                  <span className="text-[10px] text-zinc-500">Claude API</span>
                </div>
                <div className="text-zinc-300 leading-relaxed text-[11px] whitespace-pre-wrap">
                  {selectedAgent.claudePromptDesign}
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.05] text-[10px] text-zinc-500 flex items-center justify-between">
                  <span>Model: claude-3-7-sonnet-20250219</span>
                  <span>Temp: 0.2</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Integrated Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Agent Health & Telemetry Prober Dashboard */}
        <AgentHealthDashboard />
      </div>
    </section>
  );
};
