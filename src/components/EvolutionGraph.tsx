import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  TrendingUp,
  Share2,
  Sparkles,
  Info,
  Maximize2,
  Zap,
  Activity,
  Layers,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface SkillSeries {
  id: string;
  label: string;
  color: string;
  description: string;
  culmination: string;
  data: { year: number; level: number }[];
}

interface CorrelationLink {
  sourceYear: number;
  sourceSkill: string;
  targetYear: number;
  targetSkill: string;
  correlationLabel: string;
  mechanic: string;
  impact: string;
}

interface MilestonePin {
  year: number;
  title: string;
  subtitle: string;
  category: string;
  tools: string[];
}

const SKILL_SERIES: SkillSeries[] = [
  {
    id: 'dataExtraction',
    label: '01. Raw Data Extraction & Hygiene',
    color: '#f59e0b', // Amber
    description: 'Manual directory mining, raw CSV cleansing, public registry parsing, data normalization.',
    culmination: 'Paved the way for 24/7 autonomous scraping pipelines with zero human data-entry bottlenecks.',
    data: [
      { year: 2022, level: 75 },
      { year: 2023, level: 90 },
      { year: 2024, level: 98 },
      { year: 2025, level: 100 },
      { year: 2026, level: 100 }
    ]
  },
  {
    id: 'marketResearch',
    label: '02. Market Trends & Competitive Intel',
    color: '#38bdf8', // Sky Blue
    description: 'Industry benchmark analysis, buying signal detection, competitor mapping, ICP parameterization.',
    culmination: 'Supplied the reasoning models for autonomous accounts scoring and shortfall identification.',
    data: [
      { year: 2022, level: 65 },
      { year: 2023, level: 82 },
      { year: 2024, level: 92 },
      { year: 2025, level: 96 },
      { year: 2026, level: 98 }
    ]
  },
  {
    id: 'multichannelOutbound',
    label: '03. Multichannel Outbound & Acquisition',
    color: '#34d399', // Emerald
    description: 'Cold calling, cold email sequencing, WhatsApp communications (Wati/Gupshup), deliverability/warmup.',
    culmination: 'Turned into deterministic prompt rules and execution webhooks for outbound agent dispatchers.',
    data: [
      { year: 2022, level: 40 },
      { year: 2023, level: 85 },
      { year: 2024, level: 94 },
      { year: 2025, level: 97 },
      { year: 2026, level: 98 }
    ]
  },
  {
    id: 'creativeAndWeb',
    label: '04. Creative Stack, SEO & Web Development',
    color: '#a78bfa', // Purple
    description: 'High-converting copywriting, visual carousels, performance ads, organic SEO, coding full websites.',
    culmination: 'Automated into the Creative Agent generating structured SVG templates and dynamic brief payloads.',
    data: [
      { year: 2022, level: 25 },
      { year: 2023, level: 80 },
      { year: 2024, level: 88 },
      { year: 2025, level: 92 },
      { year: 2026, level: 95 }
    ]
  },
  {
    id: 'gtmStrategy',
    label: '05. GTM Strategy & Revenue Architecture',
    color: '#f43f5e', // Rose
    description: 'Full-funnel RevOps, enterprise deal structuring, sales qualification handoffs, pipeline forecasting.',
    culmination: 'Direct blueprint for the 5-agent lifecycle and unified customer tracking schema.',
    data: [
      { year: 2022, level: 15 },
      { year: 2023, level: 65 },
      { year: 2024, level: 88 },
      { year: 2025, level: 95 },
      { year: 2026, level: 98 }
    ]
  },
  {
    id: 'aiAutomation',
    label: '06. Autonomous AI & Custom CRM Systems',
    color: '#ec4899', // Fuchsia / Pink
    description: 'Custom Supabase CRMs with row-level security, n8n orchestration, Claude API agents, zero-SaaS cost.',
    culmination: 'The synthesis of all prior ground-truth experiences into autonomous, scalable revenue machinery.',
    data: [
      { year: 2022, level: 10 },
      { year: 2023, level: 35 },
      { year: 2024, level: 78 },
      { year: 2025, level: 96 },
      { year: 2026, level: 100 }
    ]
  }
];

const CORRELATION_LINKS: CorrelationLink[] = [
  {
    sourceYear: 2022,
    sourceSkill: 'dataExtraction',
    targetYear: 2024,
    targetSkill: 'aiAutomation',
    correlationLabel: 'Data Extraction → 24/7 Scraping Engines',
    mechanic: 'Manual directory cleaning drills taught edge-case parsing, directly enabling robust automated scraping architectures.',
    impact: 'Replaced manual prospecting with continuous automated lead ingestion (1,000+ accounts/wk).'
  },
  {
    sourceYear: 2022,
    sourceSkill: 'marketResearch',
    targetYear: 2025,
    targetSkill: 'aiAutomation',
    correlationLabel: 'Market Intel → Planning Agent Reasoning',
    mechanic: 'Competitor benchmarking and buyer signals formed the exact system prompts powering Claude 3.7 ICP scoring.',
    impact: 'Targeted high-probability enterprises (₹4.2 Cr scrap accounts) with automated shortfall calculations.'
  },
  {
    sourceYear: 2022,
    sourceSkill: 'multichannelOutbound',
    targetYear: 2025,
    targetSkill: 'aiAutomation',
    correlationLabel: 'Cold Calling/Email → Content & Execution Agents',
    mechanic: 'Live objection handling and deliverability mastery (Wati, Gupshup, Woodpecker) converted into high-converting prompt templates and resilient Resend webhooks.',
    impact: '74% meeting booking probability with zero spam flag risk.'
  },
  {
    sourceYear: 2023,
    sourceSkill: 'creativeAndWeb',
    targetYear: 2025,
    targetSkill: 'aiAutomation',
    correlationLabel: 'Creative Stack & Websites → Creative Agent Generator',
    mechanic: 'Building websites and visual carousels from scratch enabled parameterized SVG / layout asset brief generation without designer bottlenecks.',
    impact: 'Zero graphic designer headcount needed for multi-channel creative variants.'
  },
  {
    sourceYear: 2023,
    sourceSkill: 'gtmStrategy',
    targetYear: 2024,
    targetSkill: 'aiAutomation',
    correlationLabel: 'Manual CRM Friction → Custom Zero-SaaS CRM',
    mechanic: 'Living the operational nightmare of fragmented, expensive commercial CRMs directly shaped the schema for the custom Supabase CRM.',
    impact: '100% elimination of paid SaaS seat licenses with enterprise-grade row-level security.'
  }
];

const MILESTONE_PINS: MilestonePin[] = [
  {
    year: 2022,
    title: 'Career Launch: Data Mining & Outbound',
    subtitle: 'Small Village Boy & Silicon India',
    category: 'Foundations',
    tools: ['Excel', 'Public Registries', 'Wati', 'Gupshup']
  },
  {
    year: 2023,
    title: '"Is Marketing Only This?" Full Stack',
    subtitle: 'Carousels, Ads, SEO & Web Dev',
    category: 'Full Stack',
    tools: ['Figma', 'React/HTML', 'Resend', 'Woodpecker']
  },
  {
    year: 2024,
    title: 'Custom Supabase CRM & GTM Operations',
    subtitle: 'Recykal Systems & Zero SaaS Bloat',
    category: 'Systems Eng',
    tools: ['Supabase', 'PostgreSQL', 'n8n', 'Python']
  },
  {
    year: 2025,
    title: '5-Agent Campaign Automation System',
    subtitle: '₹100Cr Pipeline Generated',
    category: 'AI Agents',
    tools: ['Claude 3.7 API', 'n8n Webhooks', 'Docker']
  },
  {
    year: 2026,
    title: 'Enterprise AI & GTM Scale',
    subtitle: 'Open for Tier-1 MNC Challenges',
    category: 'Next Horizon',
    tools: ['Cloud Native', 'Distributed AI', 'RevOps']
  }
];

export const EvolutionGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'progression' | 'correlations'>('progression');
  const [hoveredPoint, setHoveredPoint] = useState<{
    skill: SkillSeries;
    year: number;
    level: number;
    milestone?: MilestonePin;
  } | null>(null);
  const [selectedCorrelation, setSelectedCorrelation] = useState<CorrelationLink | null>(null);

  // Render D3 Graph
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 920;
    const height = 400;
    const margin = { top: 35, right: 35, bottom: 55, left: 55 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Gradient definitions
    const defs = svg.append('defs');

    // Linear gradients for each skill area
    SKILL_SERIES.forEach((skill) => {
      const gradient = defs
        .append('linearGradient')
        .attr('id', `area-grad-${skill.id}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', skill.color)
        .attr('stop-opacity', 0.28);

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', skill.color)
        .attr('stop-opacity', 0.0);
    });

    // Scales
    const years = [2022, 2023, 2024, 2025, 2026];
    const xScale = d3
      .scaleLinear()
      .domain([2022, 2026])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    // Gridlines (Y-axis)
    const yTicks = [0, 25, 50, 75, 100];
    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'rgba(255,255,255,0.06)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', (d) => (d === 0 || d === 100 ? 'none' : '4 4'));

    // Gridlines (X-axis)
    g.append('g')
      .attr('class', 'x-grid')
      .selectAll('line')
      .data(years)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'rgba(255,255,255,0.04)')
      .attr('stroke-dasharray', '3 3');

    // Axes
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(years)
      .tickFormat((d) => `${d}`);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(yTicks)
      .tickFormat((d) => `${d}%`);

    const xAxisG = g
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    xAxisG.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)');
    xAxisG
      .selectAll('text')
      .attr('fill', '#a1a1aa')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '11px')
      .attr('dy', '14px');

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)');
    yAxisG
      .selectAll('text')
      .attr('fill', '#71717a')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '10px');

    // Line and Area Generators
    const lineGenerator = d3
      .line<{ year: number; level: number }>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.level))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3
      .area<{ year: number; level: number }>()
      .x((d) => xScale(d.year))
      .y0(innerHeight)
      .y1((d) => yScale(d.level))
      .curve(d3.curveMonotoneX);

    // Filtered Series
    const seriesToRender =
      activeFilter === 'all'
        ? SKILL_SERIES
        : SKILL_SERIES.filter((s) => s.id === activeFilter);

    // Draw Areas & Lines
    seriesToRender.forEach((skill) => {
      const isHighlighted = activeFilter === 'all' || activeFilter === skill.id;

      // Area fill
      g.append('path')
        .datum(skill.data)
        .attr('d', areaGenerator)
        .attr('fill', `url(#area-grad-${skill.id})`)
        .attr('opacity', isHighlighted ? 1 : 0.15)
        .style('transition', 'all 0.3s ease');

      // Glowing Path stroke
      g.append('path')
        .datum(skill.data)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', skill.color)
        .attr('stroke-width', isHighlighted ? 2.6 : 1.2)
        .attr('opacity', isHighlighted ? 0.95 : 0.25)
        .style('filter', isHighlighted ? `drop-shadow(0 0 6px ${skill.color}88)` : 'none')
        .style('transition', 'all 0.3s ease');

      // Data Points
      g.selectAll(`.dot-${skill.id}`)
        .data(skill.data)
        .enter()
        .append('circle')
        .attr('class', `dot-${skill.id}`)
        .attr('cx', (d) => xScale(d.year))
        .attr('cy', (d) => yScale(d.level))
        .attr('r', isHighlighted ? 4.5 : 2.5)
        .attr('fill', skill.color)
        .attr('stroke', '#090a0f')
        .attr('stroke-width', 2)
        .attr('cursor', 'pointer')
        .style('transition', 'r 0.2s ease')
        .on('mouseenter', function (event, d) {
          d3.select(this).attr('r', 7).attr('stroke', '#ffffff');
          const milestone = MILESTONE_PINS.find((m) => m.year === d.year);
          setHoveredPoint({
            skill,
            year: d.year,
            level: d.level,
            milestone
          });
        })
        .on('mouseleave', function () {
          d3.select(this).attr('r', isHighlighted ? 4.5 : 2.5).attr('stroke', '#090a0f');
          setHoveredPoint(null);
        });
    });

    // ========================================================================
    // CORRELATION ARCS (Visible in 'correlations' mode or when hovered)
    // ========================================================================
    if (viewMode === 'correlations') {
      const arcGroup = g.append('g').attr('class', 'correlation-arcs');

      CORRELATION_LINKS.forEach((link, idx) => {
        const sourceSkillObj = SKILL_SERIES.find((s) => s.id === link.sourceSkill);
        const targetSkillObj = SKILL_SERIES.find((s) => s.id === link.targetSkill);

        if (!sourceSkillObj || !targetSkillObj) return;

        const sourcePt = sourceSkillObj.data.find((d) => d.year === link.sourceYear);
        const targetPt = targetSkillObj.data.find((d) => d.year === link.targetYear);

        if (!sourcePt || !targetPt) return;

        const x1 = xScale(link.sourceYear);
        const y1 = yScale(sourcePt.level);
        const x2 = xScale(link.targetYear);
        const y2 = yScale(targetPt.level);

        // Cubic Bezier curve bridging precursor skill to automation culmination
        const dx = x2 - x1;
        const cx1 = x1 + dx * 0.35;
        const cy1 = Math.min(y1, y2) - 35 - idx * 12;
        const cx2 = x1 + dx * 0.75;
        const cy2 = cy1;

        const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
        const isSelected = selectedCorrelation?.correlationLabel === link.correlationLabel;

        arcGroup
          .append('path')
          .attr('d', pathData)
          .attr('fill', 'none')
          .attr('stroke', isSelected ? '#fbbf24' : '#f59e0b')
          .attr('stroke-width', isSelected ? 2.8 : 1.8)
          .attr('stroke-dasharray', isSelected ? 'none' : '5 4')
          .attr('opacity', isSelected ? 1 : 0.6)
          .attr('cursor', 'pointer')
          .style('filter', isSelected ? 'drop-shadow(0 0 8px rgba(251,191,36,0.8))' : 'none')
          .on('mouseenter', () => setSelectedCorrelation(link))
          .on('click', () => setSelectedCorrelation(link));

        // Midpoint glowing anchor icon/pill
        arcGroup
          .append('circle')
          .attr('cx', (x1 + x2) / 2)
          .attr('cy', (cy1 + cy2) / 2)
          .attr('r', isSelected ? 5.5 : 4)
          .attr('fill', isSelected ? '#fbbf24' : '#10b981')
          .attr('stroke', '#000')
          .attr('stroke-width', 1.5)
          .attr('cursor', 'pointer')
          .on('mouseenter', () => setSelectedCorrelation(link));
      });
    }

    // Milestone Pin Dots along X-axis
    const milestoneG = g.append('g').attr('class', 'milestones');
    MILESTONE_PINS.forEach((m) => {
      const mx = xScale(m.year);
      milestoneG
        .append('line')
        .attr('x1', mx)
        .attr('x2', mx)
        .attr('y1', innerHeight)
        .attr('y2', innerHeight + 6)
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 2);
    });

  }, [activeFilter, viewMode, selectedCorrelation]);

  return (
    <div className="my-12 cinematic-glass rounded-2xl border border-white/[0.1] p-6 lg:p-8 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Header with Mode Switches */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive D3.js Visualization</span>
            <span className="text-zinc-600">/</span>
            <span>Skill Mastery &amp; Synergy Mapping</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Skill Evolution &amp; Correlation Graph</span>
            <span className="text-xs font-mono font-normal text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              2022 – 2026
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-light">
            Interactive progression curves showing how early ground-level data extraction directly correlated with building multi-agent AI and zero-SaaS GTM automation.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 bg-black/60 rounded-xl border border-white/[0.08] flex items-center gap-1">
            <button
              onClick={() => setViewMode('progression')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                viewMode === 'progression'
                  ? 'bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Progression Curves</span>
            </button>

            <button
              onClick={() => setViewMode('correlations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                viewMode === 'correlations'
                  ? 'bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Correlation Arcs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6 relative z-10">
        <span className="text-[11px] font-mono text-zinc-500 mr-1.5">Filter Domain:</span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-white text-zinc-950 font-bold shadow-sm'
              : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          All 6 Disciplines
        </button>

        {SKILL_SERIES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveFilter(s.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
              activeFilter === s.id
                ? 'bg-white/[0.12] text-white font-bold border-white/[0.25] shadow-sm'
                : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border-white/[0.05]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span>{s.label.split('.')[1].trim()}</span>
          </button>
        ))}
      </div>

      {/* D3 SVG Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[380px] bg-black/50 rounded-xl border border-white/[0.08] p-2 overflow-hidden"
      >
        <svg ref={svgRef} className="w-full h-full select-none" />

        {/* Hover Point Interactive Card */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 z-20 max-w-xs p-3.5 rounded-xl bg-black/90 border border-white/[0.15] shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between font-mono pb-1.5 border-b border-white/[0.08]">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: hoveredPoint.skill.color }}
                />
                {hoveredPoint.skill.label.split('.')[1].trim()}
              </span>
              <span className="text-amber-400 font-bold tabular-nums">
                {hoveredPoint.year}
              </span>
            </div>
            <div className="text-zinc-300 flex items-center justify-between font-mono text-[11px]">
              <span className="text-zinc-500">Mastery Level:</span>
              <span className="text-emerald-400 font-bold tabular-nums">{hoveredPoint.level}%</span>
            </div>
            {hoveredPoint.milestone && (
              <div className="pt-1 text-[11px] text-zinc-400">
                <span className="text-zinc-500">Milestone:</span>{' '}
                <span className="text-zinc-200 font-medium">{hoveredPoint.milestone.title}</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {hoveredPoint.milestone.tools.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.2 rounded bg-white/[0.06] font-mono text-[9px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Correlation Callout Drawer */}
      {viewMode === 'correlations' && (
        <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] relative z-10">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill Synergy Insights (Click Arcs in Graph to Inspect)</span>
            </span>
            <span className="text-zinc-500 text-[11px]">5 Validated Cross-Discipline Correlations</span>
          </div>

          {selectedCorrelation ? (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <span>{selectedCorrelation.correlationLabel}</span>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                  {selectedCorrelation.sourceYear} ➔ {selectedCorrelation.targetYear}
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed font-light">
                {selectedCorrelation.mechanic}
              </p>
              <div className="p-2.5 rounded-lg bg-black/50 border border-white/[0.06] text-amber-300 font-mono text-[11px] flex items-center gap-2">
                <span className="text-zinc-500 font-bold">Measured ROI Impact:</span>
                <span>{selectedCorrelation.impact}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CORRELATION_LINKS.slice(0, 3).map((link) => (
                <button
                  key={link.correlationLabel}
                  onClick={() => setSelectedCorrelation(link)}
                  className="p-3 text-left rounded-lg bg-black/40 border border-white/[0.06] hover:border-amber-400/40 transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors mb-1 truncate">
                    {link.correlationLabel}
                  </div>
                  <div className="text-[11px] text-zinc-400 line-clamp-2 font-light">
                    {link.mechanic}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Summary Legend */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
        {SKILL_SERIES.map((s) => (
          <div key={s.id} className="p-2.5 rounded-lg bg-black/30 border border-white/[0.04]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="font-bold text-zinc-200 truncate">{s.label.split('.')[1]}</span>
            </div>
            <div className="text-[10px] text-zinc-500 line-clamp-2 font-sans font-light">
              {s.culmination}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
