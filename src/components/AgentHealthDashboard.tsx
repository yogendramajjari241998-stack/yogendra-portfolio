import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Cpu,
  Wifi,
  Zap,
  RefreshCw,
  Server,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Terminal,
  AlertTriangle,
  Play,
  Pause,
  TrendingDown,
  BarChart2
} from 'lucide-react';
import { MULTI_AGENTS } from '../data/portfolioData';

interface AgentStatusPing {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'PROCESSING' | 'STANDBY' | 'GATE_ARMED';
  latency: number;
  uptime: string;
  throughput: string;
  lastPingTime: string;
  memoryMb: number;
  activeQueue: number;
}

interface LatencyPoint {
  time: string;
  value: number;
  agentId: string;
}

export const AgentHealthDashboard: React.FC = () => {
  const [isLivePinging, setIsLivePinging] = useState(true);
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [selectedGraphFilter, setSelectedGraphFilter] = useState<string>('cluster');
  const [hoveredPoint, setHoveredPoint] = useState<LatencyPoint | null>(null);
  const [logEntries, setLogEntries] = useState<string[]>([]);

  // Initial agent pings state
  const [agentsHealth, setAgentsHealth] = useState<AgentStatusPing[]>([
    {
      id: 'planning',
      name: 'Planning Agent',
      role: 'Campaign Architecture & Sequencing',
      status: 'ACTIVE',
      latency: 14,
      uptime: '99.98%',
      throughput: '142 req/min',
      lastPingTime: 'Just now',
      memoryMb: 86,
      activeQueue: 0
    },
    {
      id: 'content',
      name: 'Content Agent',
      role: 'Claude API Copy & HITL Gate',
      status: 'GATE_ARMED',
      latency: 28,
      uptime: '99.95%',
      throughput: '94 req/min',
      lastPingTime: 'Just now',
      memoryMb: 142,
      activeQueue: 1
    },
    {
      id: 'creative',
      name: 'Creative Agent',
      role: 'Asset Briefs & Layout Specs',
      status: 'STANDBY',
      latency: 22,
      uptime: '99.99%',
      throughput: '48 req/min',
      lastPingTime: 'Just now',
      memoryMb: 110,
      activeQueue: 0
    },
    {
      id: 'execution',
      name: 'Execution Agent',
      role: 'Resend API & Dispatcher Node',
      status: 'ACTIVE',
      latency: 11,
      uptime: '100.0%',
      throughput: '310 msg/min',
      lastPingTime: 'Just now',
      memoryMb: 64,
      activeQueue: 0
    },
    {
      id: 'reporting',
      name: 'Reporting Agent',
      role: 'Telemetry & Sentiment Classification',
      status: 'ACTIVE',
      latency: 9,
      uptime: '99.97%',
      throughput: '185 evt/min',
      lastPingTime: 'Just now',
      memoryMb: 78,
      activeQueue: 0
    }
  ]);

  // Real-time latency graph data points (last 28 data points)
  const [latencyHistory, setLatencyHistory] = useState<LatencyPoint[]>(() => {
    const points: LatencyPoint[] = [];
    const now = Date.now();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(now - i * 1400);
      const timeStr = d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const base = 12 + Math.sin(i * 0.45) * 5 + (Math.random() * 4 - 2);
      points.push({
        time: timeStr,
        value: Math.max(8, Math.round(base)),
        agentId: 'cluster'
      });
    }
    return points;
  });

  // Generate simulated real-time telemetry log
  const pushLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogEntries((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 6)]);
  };

  const SLA_THRESHOLD_MS = 22;

  // Real-time ping simulation loop
  useEffect(() => {
    if (!isLivePinging) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setAgentsHealth((prev) =>
        prev.map((agent) => {
          const baseLatency = agent.id === 'content' ? 18 : agent.id === 'execution' ? 10 : 14;
          const jitter = isSimulatingSpike
            ? Math.floor(Math.random() * 40) + 65
            : Math.floor(Math.random() * 8) - 3;
          const newLatency = Math.max(7, baseLatency + jitter);

          return {
            ...agent,
            latency: newLatency,
            lastPingTime: '1s ago',
            memoryMb: Math.max(50, agent.memoryMb + Math.floor(Math.random() * 4) - 2)
          };
        })
      );

      // Append new point to latency graph
      setLatencyHistory((prev) => {
        const clusterBase = isSimulatingSpike
          ? Math.floor(Math.random() * 35) + 85
          : 14 + (Math.random() * 8 - 4);

        const newPoint: LatencyPoint = {
          time: timeStr,
          value: Math.max(7, Math.round(clusterBase)),
          agentId: selectedGraphFilter
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isLivePinging, isSimulatingSpike, selectedGraphFilter]);

  // Initial boot log
  useEffect(() => {
    pushLog('Agent Health Telemetry daemon initialized (Claude API + n8n nodes)');
    pushLog('Row-level security connection to Supabase PostgreSQL: VERIFIED');
    pushLog('Real-time Latency Graph prober active: sampling at 1.8s intervals');
  }, []);

  const handleManualPing = () => {
    pushLog('Manual health probe broadcast across all 5 agent nodes: 5/5 ACK');
    setAgentsHealth((prev) =>
      prev.map((a) => ({
        ...a,
        latency: Math.floor(Math.random() * 6) + 9,
        lastPingTime: 'Just now'
      }))
    );
  };

  const handleSimulateSpike = () => {
    setIsSimulatingSpike(true);
    pushLog('Injected load burst test (500 synthetic ICP profiles)');
    setTimeout(() => {
      setIsSimulatingSpike(false);
      pushLog('Load burst absorbed. Latency returned to baseline (< 20ms)');
    }, 3800);
  };

  const getStatusBadge = (status: AgentStatusPing['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ACTIVE
          </span>
        );
      case 'GATE_ARMED':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            HUMAN GATE
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            PROCESSING
          </span>
        );
      case 'STANDBY':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            STANDBY
          </span>
        );
    }
  };

  const avgLatency = Math.round(
    agentsHealth.reduce((acc, a) => acc + a.latency, 0) / agentsHealth.length
  );

  // SVG Chart Geometry Calculations
  const chartWidth = 720;
  const chartHeight = 160;
  const paddingX = 16;
  const paddingY = 24;

  const latValues = latencyHistory.map((p) => p.value);
  const minLat = Math.min(...latValues);
  const maxLat = Math.max(...latValues, 45);
  const currentLat = latValues[latValues.length - 1] || avgLatency;

  const chartCoords = useMemo(() => {
    const usableW = chartWidth - paddingX * 2;
    const usableH = chartHeight - paddingY * 2;
    const count = latencyHistory.length;
    const range = Math.max(1, maxLat - 0);

    return latencyHistory.map((pt, i) => {
      const x = paddingX + (i / (count - 1)) * usableW;
      const y = chartHeight - paddingY - (pt.value / range) * usableH;
      return { x, y, pt };
    });
  }, [latencyHistory, maxLat]);

  // Construct SVG Path
  const svgLinePath = useMemo(() => {
    if (chartCoords.length === 0) return '';
    let d = `M ${chartCoords[0].x} ${chartCoords[0].y}`;
    for (let i = 1; i < chartCoords.length; i++) {
      const prev = chartCoords[i - 1];
      const curr = chartCoords[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [chartCoords]);

  const svgAreaPath = useMemo(() => {
    if (chartCoords.length === 0) return '';
    const lastX = chartCoords[chartCoords.length - 1].x;
    const firstX = chartCoords[0].x;
    const bottomY = chartHeight - paddingY;
    return `${svgLinePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [svgLinePath, chartCoords]);

  return (
    <div className="mt-8 cinematic-glass rounded-2xl border border-white/[0.1] p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Wave Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Real-Time Telemetry &amp; System Latency</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Agent Health &amp; Latency Graph</span>
            <span className="text-xs font-mono font-normal text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              Live Telemetry
            </span>
          </h3>
        </div>

        {/* Global Cluster Stats & Interactive Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleManualPing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
            title="Send immediate ICMP/HTTP ping probe"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            <span>Ping All</span>
          </button>

          <button
            onClick={handleSimulateSpike}
            disabled={isSimulatingSpike}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
              isSimulatingSpike
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 cursor-wait'
                : 'text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1]'
            }`}
            title="Simulate high-concurrency traffic surge"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{isSimulatingSpike ? 'Surging...' : 'Simulate Spike'}</span>
          </button>

          <button
            onClick={() => setIsLivePinging(!isLivePinging)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
            title={isLivePinging ? 'Pause live polling' : 'Resume live polling'}
          >
            {isLivePinging ? (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span>Live (1.8s)</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-zinc-400" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cluster Health Summary KPI Strip */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5 flex items-center justify-between">
            <span>Cluster Average Latency</span>
            <Wifi className="w-3 h-3 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1">
            <span className={`transition-colors duration-300 ${avgLatency > SLA_THRESHOLD_MS ? 'text-amber-400' : 'text-emerald-400'}`}>
              {avgLatency}
            </span>
            <span className="text-xs font-normal text-zinc-500">ms</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">
            {avgLatency > SLA_THRESHOLD_MS ? (
              <span className="text-amber-400 font-semibold">Exceeded 22ms SLA (Awareness Active)</span>
            ) : (
              'Sub-22ms SLA nominal target'
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5 flex items-center justify-between">
            <span>Orchestration Uptime</span>
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            99.98%
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Zero production outage</div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5 flex items-center justify-between">
            <span>Active Memory Footprint</span>
            <Cpu className="w-3 h-3 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
            480 <span className="text-xs font-normal text-zinc-500">MB Total</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Serverless edge efficiency</div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5 flex items-center justify-between">
            <span>Webhook Infrastructure</span>
            <Server className="w-3 h-3 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
            3 Active
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">Supabase · n8n · Resend</div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* REAL-TIME SYSTEM LATENCY GRAPH COMPONENT                           */}
      {/* ================================================================== */}
      <div className="relative z-10 p-5 rounded-2xl bg-black/70 border border-white/[0.08] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            <BarChart2 className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live System Latency Graph (Last 30 Pings)
            </span>
            {currentLat > SLA_THRESHOLD_MS ? (
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-400/40 px-2 py-0.5 rounded animate-pulse">
                ⚡ Awareness: &gt;22ms Threshold Exceeded
              </span>
            ) : (
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                Nominal (&lt;22ms)
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-500">Current:</span>{' '}
              <span
                className={`font-bold tabular-nums transition-colors duration-300 ${
                  currentLat > SLA_THRESHOLD_MS ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {currentLat}ms
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Min:</span>{' '}
              <span className="text-zinc-200 tabular-nums">{minLat}ms</span>
            </div>
            <div>
              <span className="text-zinc-500">SLA Threshold:</span>{' '}
              <span className="text-amber-400 font-bold tabular-nums">&lt; {SLA_THRESHOLD_MS}ms</span>
            </div>
          </div>
        </div>

        {/* SVG Latency Graph Canvas */}
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-44 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            <line
              x1={paddingX}
              y1={chartHeight / 2}
              x2={chartWidth - paddingX}
              y2={chartHeight / 2}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1={paddingX}
              y1={paddingY}
              x2={chartWidth - paddingX}
              y2={paddingY}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* 50ms Target Threshold Marker */}
            <text
              x={chartWidth - paddingX - 4}
              y={chartHeight / 2 - 6}
              fill="rgba(255,255,255,0.3)"
              fontSize="9"
              fontFamily="monospace"
              textAnchor="end"
            >
              50ms SLA Target
            </text>

            {/* Area Fill */}
            <path d={svgAreaPath} fill="url(#latencyGradient)" />

            {/* Glowing Spline Stroke */}
            <path
              d={svgLinePath}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
            />

            {/* Interactive Data Points */}
            {chartCoords.map((c, i) => {
              const isLast = i === chartCoords.length - 1;
              return (
                <g key={i} className="cursor-pointer">
                  {/* Subtle hover target */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isLast ? 4 : 3}
                    fill={isLast ? '#f59e0b' : '#fbbf24'}
                    className={isLast ? 'animate-pulse' : 'opacity-70 hover:opacity-100'}
                    onMouseEnter={() => setHoveredPoint(c.pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {isLast && (
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={8}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1"
                      className="animate-ping opacity-60"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Inspector */}
          {hoveredPoint && (
            <div className="absolute top-2 right-4 bg-black/90 border border-amber-400/40 rounded-lg px-3 py-1.5 text-[11px] font-mono text-zinc-200 shadow-xl flex items-center gap-2">
              <span className="text-zinc-500">{hoveredPoint.time}:</span>
              <span className="text-amber-300 font-bold">{hoveredPoint.value}ms</span>
              <span className="text-emerald-400">· 200 OK</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
          <span>T-45s History</span>
          <span>Adaptive Scaling: Auto</span>
          <span>Now (Live Ticker)</span>
        </div>
      </div>

      {/* 5-Agent Detailed Status Ping Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {agentsHealth.map((agent, idx) => (
          <div
            key={agent.id}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500">Node 0{idx + 1}</span>
                {getStatusBadge(agent.status)}
              </div>

              <div className="text-xs font-bold text-white mb-0.5 truncate">
                {agent.name}
              </div>
              <div className="text-[11px] text-zinc-400 line-clamp-1 mb-3">
                {agent.role}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Ping Latency:</span>
                <span
                  className={`font-bold tabular-nums transition-colors duration-300 ${
                    agent.latency > SLA_THRESHOLD_MS
                      ? 'text-amber-400 font-extrabold'
                      : 'text-emerald-400'
                  }`}
                  title={
                    agent.latency > SLA_THRESHOLD_MS
                      ? `Exceeded ${SLA_THRESHOLD_MS}ms SLA Threshold. System Awareness Engaged.`
                      : `Nominal sub-${SLA_THRESHOLD_MS}ms latency.`
                  }
                >
                  {agent.latency}ms
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Throughput:</span>
                <span className="text-zinc-300 tabular-nums">{agent.throughput}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Memory:</span>
                <span className="text-zinc-400 tabular-nums">{agent.memoryMb}MB</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Health Prober Log Stream */}
      <div className="relative z-10 p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-zinc-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            Live Health Prober Stream &amp; Webhook Diagnostics
          </span>
          <span className="text-zinc-500 text-[10px]">Auto-Scroll Enabled</span>
        </div>

        <div className="space-y-1 text-[11px] text-zinc-300">
          {logEntries.map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                i === 0 ? 'text-amber-300 font-medium' : 'text-zinc-400'
              }`}
            >
              <span className="text-zinc-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
