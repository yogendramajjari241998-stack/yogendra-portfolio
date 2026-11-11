export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Agents' | 'Custom CRM' | 'Data & BI' | 'RevOps & Growth' | 'Web Systems';
  timeline: string;
  impactMetric: string;
  impactLabel: string;
  problem: string;
  architecture: string;
  solution: string;
  stack: string[];
  features: string[];
  quoteOrHighlight: string;
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: string;
  description: string;
  inputs: string[];
  outputs: string[];
  claudePromptDesign: string;
  tech: string[];
  status: 'orchestrated' | 'human_in_loop' | 'autonomous';
}

export interface StoryChapter {
  id: number;
  chapterNumber: string;
  tagline: string;
  title: string;
  hook: string;
  narrative: string;
  highlightQuote: string;
  milestoneYear: string;
  skillsGained: string[];
  toolsUsed: string[];
  mindsetShift: string;
}

export const CANDIDATE_PROFILE = {
  name: 'Yogendra Majjari',
  title: 'GTM Engineer | AI Automation Specialist | RevOps | CRM | MarTech',
  tagline: 'From raw database extraction to autonomous multi-agent revenue infrastructure at zero SaaS bloat.',
  summary:
    'Started my career in 2022 as a small village boy with big dreams 😉 and a laptop. Began in the trenches of raw database extraction, self-learned market trends analysis, and conquered the cold outbound trenches across phone, WhatsApp (Wati/Gupshup), and email (Woodpecker/Mailchimp/Resend). Then I asked: "Is marketing only this?" and mastered content writing, visual carousels, ads, SEO, and building full websites from scratch. As volume scaled and work became grueling, I automated the entire beast—because I lived the drill, knew every roadblock, and mastered every input/output with my own hands. Built custom CRMs, 5-agent AI pipelines, and 24/7 web scrapers. Here I am: battle-tested, grounded, and open for the next big challenge.',
  location: 'Hyderabad, India',
  phone: '+91 9885664187',
  email: 'yogendra.majjari241998@gmail.com',
  linkedin: 'https://linkedin.com/in/yogendramajjari-4a1768270',
  linkedinDisplay: 'linkedin.com/in/yogendramajjari-4a1768270',
  portfolioUrl: 'https://yogendra-interactive-portfolio.vercel.app',
  portfolioDisplay: 'yogendra-interactive-portfolio.vercel.app',
  resumePdfPath: '/assets/aistudio/Yogendramajjari_Senior_AI_Resume_c135be01.pdf',
  openRoles: [
    'GTM Engineer',
    'AI Automation Specialist',
    'RevOps Architect',
    'CRM Systems Manager',
    'MarTech / Marketing Ops Lead'
  ],
  education: {
    degree: 'B.Sc. Computer Science',
    institution: 'NEFTU',
    year: '2021'
  }
};

export const WHO_AM_I_STORY: StoryChapter[] = [
  {
    id: 1,
    chapterNumber: '01',
    tagline: 'Origins & Ground-Level Grit',
    title: 'A Small Village Boy with Big Dreams 😉',
    hook: 'No silver spoons or fancy shortcuts. Just an insatiable hunger to build something extraordinary from scratch.',
    narrative:
      'I started my career in 2022 as a small village boy with big dreams 😉 and a laptop. My tech journey began in the trenches of raw database extraction. I spent months manually mining public directories, scraping raw company registries, cleaning corrupted CSV files, and understanding data at its most unglamorous, foundational level. That instilled in me deep patience and a visceral respect for data integrity.',
    highlightQuote:
      'Before you can instruct AI agents to automate data, you must have touched raw, messy data with your own hands.',
    milestoneYear: '2022',
    skillsGained: [
      'Raw Database Extraction',
      'Data Cleansing & Normalization',
      'Registry Scraping',
      'Data Mining Patterns',
      'Spreadsheet Architecture'
    ],
    toolsUsed: ['Excel', 'Google Sheets', 'Web Scraping Scripts', 'Public Enterprise Registries'],
    mindsetShift: 'Data is not just rows and columns; it is the raw fuel for every enterprise decision.'
  },
  {
    id: 2,
    chapterNumber: '02',
    tagline: 'Looking Beyond the Rows',
    title: 'Market Trends Analysis & Research',
    hook: 'I could not just stare at thousands of company records without asking: Who are these people, and what makes them buy?',
    narrative:
      'Staring at raw extracted tables sparked a relentless curiosity: What market forces drive these businesses? Why do certain companies buy while others churn? Working as a Market Research Analyst in 2022, I immersed myself in market trends analysis, competitor benchmarking, and buyer intent research. I began decoding industry patterns, supply chain shifts, and executive pain points, transforming static lists into commercial intelligence.',
    highlightQuote:
      'Data without market context is just static noise. Context is what turns numbers into commercial leverage.',
    milestoneYear: '2022',
    skillsGained: [
      'Market Trends Analysis',
      'Competitive Benchmarking',
      'Industry Research',
      'ICP Parameterization',
      'Buyer Signal Detection'
    ],
    toolsUsed: ['Market Intelligence Databases', 'Industry Reports', 'Google Analytics', 'Looker Studio'],
    mindsetShift: 'Understanding the market dynamics is the difference between cold spam and strategic outreach.'
  },
  {
    id: 3,
    chapterNumber: '03',
    tagline: 'The Outbound Frontline',
    title: 'Lead Generation & Multichannel Acquisition',
    hook: 'Learning the toughest craft in business: picking up the phone, drafting cold emails, and opening doors.',
    narrative:
      'Armed with market insights, I stepped directly onto the frontline: customer acquisition and lead generation. I lived the grit: making cold calls, engineering high-deliverability cold email sequences, and mastering conversational WhatsApp outreach at scale. I learned how to craft subject lines that get opened, write hooks that get answered, and coordinate cadences across phone, WhatsApp, and email.',
    highlightQuote:
      'Every cold call objection was a masterclass in buyer psychology, active listening, and pitch refinement.',
    milestoneYear: '2022 – 2023',
    skillsGained: [
      'Lead Generation & Prospecting',
      'High-Deliverability Cold Email',
      'Cold Calling & Objection Handling',
      'Conversational WhatsApp Outbound',
      'Inbox Warmup & SPF/DKIM'
    ],
    toolsUsed: ['Wati', 'Gupshup', 'Woodpecker', 'Mailchimp', 'Resend API', 'Microsoft 365 / Outlook'],
    mindsetShift: 'Multichannel is not spraying messages everywhere; it is orchestrating touchpoints where buyers actually live.'
  },
  {
    id: 4,
    chapterNumber: '04',
    tagline: 'Breaking the Silo',
    title: '"Is Marketing Only This?" The Full Creative Stack',
    hook: 'Looking at repetitive outbound silos, I asked myself: Why stop here? There is an entire creative universe to conquer.',
    narrative:
      'I paused and asked: "Is marketing only cold calls and emails? There is so much more to achieve." Refusing to stay boxed in, I rolled up my sleeves and mastered the full creative and digital stack. I learned high-converting copywriting, designed high-impact carousels and ad visuals that stopped the scroll, ran performance ad campaigns, mastered organic SEO, and taught myself to build complete websites from scratch.',
    highlightQuote:
      'To build great automated systems, you must be able to write the copy, design the creative, and code the page yourself.',
    milestoneYear: '2023',
    skillsGained: [
      'High-Converting Content Writing',
      'Carousel & Visual Graphic Design',
      'Performance Paid Ads',
      'Organic & Technical SEO',
      'Full Websites from Scratch'
    ],
    toolsUsed: ['Figma', 'Canva', 'HTML / CSS / JavaScript / React', 'Google Search Console', 'Meta Ads Manager'],
    mindsetShift: 'When you master the creative, the copy, and the code, you can build entire digital flywheels independently.'
  },
  {
    id: 5,
    chapterNumber: '05',
    tagline: 'Connecting the Dots to Revenue',
    title: 'Business Development & GTM Strategy Planning',
    hook: 'Transitioning from individual contributor to full-funnel revenue architect.',
    narrative:
      'With full-funnel execution skills under my belt, I moved into Business Development and Go-To-Market (GTM) strategy planning. I mapped enterprise buyer journeys, structured tiered account clusters, designed sales qualification handoffs, and aligned marketing operations directly to pipeline revenue. But as volume surged across accounts, manual human coordination became an unbearable bottleneck.',
    highlightQuote:
      'Strategy without operational mechanics is a hallucination. Revenue happens in the plumbing.',
    milestoneYear: '2023 – 2024',
    skillsGained: [
      'GTM Strategic Planning',
      'Enterprise Business Development',
      'Revenue Operations (RevOps)',
      'Deal Structuring & ICP Tiers',
      'Pipeline Forecasting'
    ],
    toolsUsed: ['GTM Frameworks', 'HubSpot / Zoho', 'BI Dashboards', 'Sales Cadence Architecture'],
    mindsetShift: 'True scale requires removing human fatigue from repeatable mechanics while preserving human judgment for high-stakes decisions.'
  },
  {
    id: 6,
    chapterNumber: '06',
    tagline: 'The Automation Awakening',
    title: 'I Knew the Drill, So I Automated It: Custom CRMs & AI Agents',
    hook: 'I did not automate from an ivory tower. I automated because I knew every roadblock, manual fatigue point, input, and output.',
    narrative:
      'When operations scaled and the manual drill became grueling, automation was not abstract—it was obvious. Why? Because I had lived every step with my own hands. I knew every manual roadblock, every corrupted registry entry, every rate limit, and every human friction point. That made it easy to automate. I engineered custom Supabase CRMs with row-level security that eliminated costly SaaS subscriptions, built 24/7 web scraping engines, and architected a 5-agent multi-channel AI campaign system orchestrated via n8n and Claude API. I built them one by one, brick by brick, achieving production reliability at zero software cost.',
    highlightQuote:
      'The best automation engineers are those who did the manual drill so many times they can see every failure mode in their sleep.',
    milestoneYear: '2024 – Present',
    skillsGained: [
      'Autonomous Multi-Agent Orchestration',
      'Custom CRM Engineering',
      'Zero-SaaS-Cost Architecture',
      'Prompt Architecture (Claude API)',
      'Event-Driven Webhook Pipelines'
    ],
    toolsUsed: ['n8n Orchestration', 'Claude API (3.7 Sonnet)', 'Supabase PostgreSQL', 'Python / FastAPI', 'Resend API', 'Docker'],
    mindsetShift: 'Automate the repetitive drills with deterministic precision so humans can focus on high-stakes strategy.'
  },
  {
    id: 7,
    chapterNumber: '07',
    tagline: 'The Next Frontier',
    title: 'Here I Am — Open for the Next Big Challenge',
    hook: 'From raw data extraction in a humble village to orchestrating autonomous enterprise AI agents.',
    narrative:
      'Today, I stand at the intersection of ground-level hustle and advanced AI systems engineering. I do not fear dirty data, complex distributed webhooks, or ambitious revenue targets—I have conquered them from the foundation up. I build intelligent systems that generate tangible revenue, eliminate bloat, and run 24/7. Here I am: battle-tested, grounded, and open for the next big challenge with visionary MNC teams.',
    highlightQuote:
      'Battle-tested from the ground up. Ready to engineer the next generation of autonomous AI and GTM infrastructure.',
    milestoneYear: '2026 & Beyond',
    skillsGained: [
      'Enterprise AI Engineering',
      'High-Scale RevOps',
      'Cross-Functional Leadership',
      'Zero-Cost System Architecture'
    ],
    toolsUsed: ['Next.js / React', 'Supabase / PostgreSQL', 'Claude API / LLM Orchestration', 'Cloud Native Edge'],
    mindsetShift: 'The journey is just beginning. Bring on the hardest challenges.'
  }
];

export const CORE_METRICS = [
  {
    value: '₹100Cr',
    label: 'Pipeline Value Generated',
    context: 'Built on ₹20K annual tool budget (5x-50x enterprise ROI)'
  },
  {
    value: '5 Agents',
    label: 'Autonomous Campaign System',
    context: 'End-to-end lifecycle with human-in-the-loop approval'
  },
  {
    value: '1,000+',
    label: 'Weekly Verified Leads',
    context: 'Automated scraping, cleaning & CRM upload (+40% outbound meetings)'
  },
  {
    value: '60%',
    label: 'Manual Effort Eliminated',
    context: 'Automated lead gen & email dispatch via n8n & Resend API'
  }
];

export const MULTI_AGENTS: AgentNode[] = [
  {
    id: 'planning',
    name: '01. Planning Agent',
    role: 'Campaign Strategy & Channel Mix',
    icon: 'Compass',
    description: 'Generates multi-channel campaign architectures (email, newsletter, ads, WhatsApp, cold calling) with hyper-targeted account lists, cadences, and sequencing.',
    inputs: ['Target ICP parameters', 'Historical conversion data', 'Product / Offering docs'],
    outputs: ['Multi-touch sequencing plan', 'Channel distribution mix', 'Target account cluster'],
    claudePromptDesign: 'System instructions parameterizing ICP tiers, buying signals, and conversion probabilities into scheduled cadence timelines.',
    tech: ['Claude API (3.7 Sonnet)', 'Python', 'n8n', 'Supabase'],
    status: 'autonomous'
  },
  {
    id: 'content',
    name: '02. Content Agent',
    role: 'Contextual Copy & Message Personalization',
    icon: 'FileText',
    description: 'Drafts tailored messaging, value propositions, and dynamic copy for each channel, strictly routing drafts to the Content Manager for human review.',
    inputs: ['Account intelligence signals', 'Pain points from BI scraping', 'Tone guidelines'],
    outputs: ['Email cold outreach copy', 'Follow-up cadences', 'WhatsApp / SMS templates'],
    claudePromptDesign: 'Few-shot prompt templates enforcing zero generic fluff, tight value metrics, and anti-spam deliverability standards.',
    tech: ['Claude API', 'n8n Webhooks', 'Google Docs API'],
    status: 'human_in_loop'
  },
  {
    id: 'creative',
    name: '03. Creative Agent',
    role: 'Visual Asset & Creative Brief Generation',
    icon: 'Palette',
    description: 'Produces campaign creatives, infographic layouts, and visual mockups tailored to the ICP and vertical messaging.',
    inputs: ['Campaign themes', 'Brand guidelines', 'Channel specs (Web, Email, Social)'],
    outputs: ['Visual asset templates', 'Hero image specs', 'Interactive layout assets'],
    claudePromptDesign: 'Automated prompt construction for asset rendering and structured SVG / visual element definitions.',
    tech: ['Claude API', 'Figma API', 'Python PIL'],
    status: 'autonomous'
  },
  {
    id: 'execution',
    name: '04. Execution Agent',
    role: 'Multi-Channel Dispatch & API Orchestration',
    icon: 'Send',
    description: 'Coordinates automated delivery across verified channels, managing rate limits, warmup curves, and Resend developer-first API dispatch.',
    inputs: ['Approved copy from Content Agent', 'Verified contact email list', 'Delivery window'],
    outputs: ['Live dispatched email queue', 'Webhook event listeners', 'Message delivery receipts'],
    claudePromptDesign: 'Deterministic payload transformation and retry policy monitoring with failover triggers.',
    tech: ['Resend API', 'n8n Webhook Node', 'Supabase Edge Functions'],
    status: 'autonomous'
  },
  {
    id: 'reporting',
    name: '05. Reporting Agent',
    role: 'Real-time Telemetry & Pipeline Intelligence',
    icon: 'BarChart3',
    description: 'Synthesizes open/click events, replies, meeting bookings, and pipeline velocity into real-time management alerts and executive dashboards.',
    inputs: ['GA4 events', 'Resend delivery webhooks', 'Supabase CRM lead stages'],
    outputs: ['Live Slack/Email escalation digest', 'Conversion drop-off analysis', 'CAC & ROI scorecards'],
    claudePromptDesign: 'Sentiment classification on incoming replies (Interested, Not Now, Unsubscribe) to instantly alert sales.',
    tech: ['Looker Studio', 'GA4 API', 'Claude Sentiment Parser', 'n8n'],
    status: 'autonomous'
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'multi-agent-system',
    title: 'Multi-Agent Campaign Automation System',
    subtitle: '5 Connected AI Agents Covering the Full Campaign Lifecycle at Zero Software Cost',
    category: 'AI Agents',
    timeline: '2024 – Present',
    impactMetric: '100% Autonomous',
    impactLabel: 'Full Lifecycle Pipeline',
    problem:
      'Traditional marketing campaigns required fragmented tools, manual copy drafting across 4 teams, high subscription costs, and human bottlenecks that delayed outbound velocity.',
    solution:
      'Architected 5 connected autonomous agents (Planning, Content, Creative, Execution, Reporting) orchestrated via n8n and Claude API with human-in-the-loop checkpoints for quality governance.',
    architecture:
      'n8n workflow engine coordinates data flow between Supabase PostgreSQL, Claude API for generative reasoning, Resend for email execution, and automated webhook listeners for real-time telemetry.',
    stack: ['Claude API', 'Python', 'n8n Orchestration', 'Supabase', 'Resend API', 'PostgreSQL'],
    features: [
      'Multi-channel sequencing (email, newsletter, cold calling, WhatsApp)',
      'Human-in-the-loop approval gate routing copy to Content Managers before dispatch',
      'Dynamic account-level pain point synthesis using scraped signals',
      'Automated sentiment classification on incoming lead replies',
      'Zero monthly software license overhead by orchestrating open APIs'
    ],
    quoteOrHighlight: 'Replaced a fragmented 5-tool enterprise stack with a single cohesive agent pipeline with zero software license fees.',
    codeSnippet: {
      language: 'python',
      title: 'agent_orchestrator.py (Execution & Approval Gate)',
      code: `async def route_campaign_step(lead_id: str, campaign_id: str):
    # Step 1: Synthesize account intelligence
    intelligence = await fetch_supabase_lead_intel(lead_id)
    
    # Step 2: Content Agent prompts Claude API
    draft_copy = await claude_client.messages.create(
        model="claude-3-7-sonnet-20250219",
        system="You are the Senior GTM Outreach Copywriter. Zero fluff, 100% value-led.",
        messages=[{"role": "user", "content": build_copy_prompt(intelligence)}]
    )
    
    # Step 3: Human Approval Checkpoint
    approval_ticket = await trigger_approval_webhook(lead_id, draft_copy.content[0].text)
    if not approval_ticket.is_approved:
        return {"status": "held_for_review", "ticket_id": approval_ticket.id}
        
    # Step 4: Execution Agent dispatches through Resend
    dispatch_res = await resend_api.send_email({
        "to": intelligence["email"],
        "subject": draft_copy.subject,
        "html": draft_copy.html_body
    })
    return {"status": "dispatched", "message_id": dispatch_res["id"]}`
    }
  },
  {
    id: 'supabase-custom-crm',
    title: 'Proprietary Supabase Enterprise CRM',
    subtitle: 'Zero-Cost CRM Architecture with Relational Modeling & Row-Level Security',
    category: 'Custom CRM',
    timeline: '2024',
    impactMetric: '100% Cost Cut',
    impactLabel: 'Replaced Costly Paid SaaS',
    problem:
      'Commercial CRMs (Salesforce, HubSpot tier-upgrades) incurred prohibitive annual per-seat licensing, lacked custom multi-stage pipeline customization, and made live webhook sync cumbersome.',
    solution:
      'Engineered an enterprise-grade custom CRM on Supabase PostgreSQL with custom relational schemas, Row-Level Security (RLS) policies, and bidirectional n8n webhooks for live lead sync.',
    architecture:
      'PostgreSQL schema with normalized tables (leads, accounts, pipeline_stages, interactions, audit_logs), indexed foreign keys, RLS policies for role-based data partitioning, and real-time triggers.',
    stack: ['Supabase', 'PostgreSQL', 'Row-Level Security (RLS)', 'n8n', 'REST Webhooks', 'Vercel'],
    features: [
      'Relational architecture mapping leads to multiple buying committee members',
      'Row-Level Security ensuring strict access boundaries across sales reps',
      'Real-time change listeners feeding automated lead qualification workflows',
      'Automated daily snapshot backups and point-in-time state recovery',
      'Seamless bi-directional synchronization with external mailers and scrapers'
    ],
    quoteOrHighlight: 'Eliminated thousands of dollars in third-party SaaS seats while gaining complete data sovereignty and sub-100ms API response times.',
    codeSnippet: {
      language: 'sql',
      title: 'supabase_schema_rls.sql',
      code: `-- Relational Schema & Row Level Security Definition
CREATE TABLE public.crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    domain TEXT UNIQUE NOT NULL,
    annual_revenue_bracket TEXT,
    epr_readiness_score INT CHECK (epr_readiness_score BETWEEN 0 AND 100),
    pipeline_stage TEXT DEFAULT 'raw_unqualified',
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Strict RLS Policy: Reps see their assigned accounts, Admins see global
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reps view assigned leads" ON public.crm_leads
    FOR SELECT TO authenticated
    USING (owner_id = auth.uid() OR auth.jwt() ->> 'role' = 'revops_admin');`
    }
  },
  {
    id: 'recykal-atlas',
    title: 'Recykal Atlas Geospatial Platform',
    subtitle: 'Geographic Intelligence Engine Calculating Waste & Device Density within Defined Radii',
    category: 'Data & BI',
    timeline: '2024',
    impactMetric: '24/7 Monitored',
    impactLabel: 'CPCB & State Portals',
    problem:
      'Business development teams lacked visibility into regional waste generation hotspots, municipal disposal density, and state-level compliance discrepancies across India.',
    solution:
      'Built a geospatial data platform that links statutory portals (CPCB, SPCB, state solid-waste portals) with regional population models to calculate material volumes within any geographic radius.',
    architecture:
      'Python geospatial engine querying state waste registries, calculating centroid distances, and rendering interactive density overlays with AI-synthesized regional compliance metrics.',
    stack: ['Python', 'PostGIS', 'CPCB/SPCB Data Integrations', 'Claude API', 'React', 'Mapbox/GeoJSON'],
    features: [
      'Interactive radius selection (5km, 25km, 100km) computing cumulative material outputs',
      'Automated integration with CPCB (Central Pollution Control Board) registries',
      'Dynamic device and industrial scrap concentration index',
      'AI-powered executive summaries identifying underserviced industrial zones',
      'Exportable regional dossiers for sales discovery calls'
    ],
    quoteOrHighlight: 'Empowered field teams to walk into enterprise pitches with exact regional waste output data verified against government registries.'
  },
  {
    id: 're-extractor-bi',
    title: 'Re-Extractor Business Intelligence Engine',
    subtitle: 'Google-Maps-Style Discovery Engine with AI Classification & Multi-Channel Enrichment',
    category: 'Data & BI',
    timeline: '2024',
    impactMetric: '1,000+ / Wk',
    impactLabel: 'Enriched Entity Profiles',
    problem:
      'Manual account research required opening dozens of browser tabs per prospect to verify physical address, digital presence, social footprints, and corporate registration.',
    solution:
      'Developed Re-Extractor: a consolidated BI tool returning exact addresses, GPS coordinates, verified domain, social media channels, ratings, images, and AI-enriched business categories in one query.',
    architecture:
      'Asynchronous web crawler engine feeding raw unstructured text and metadata into Claude API for entity extraction, contact normalization, and confidence scoring.',
    stack: ['Python', 'Claude API', 'Headless Scrapers', 'REST APIs', 'Supabase'],
    features: [
      'High-speed multi-threaded address and coordinate resolution',
      'Social footprint validation (LinkedIn, X, YouTube, Instagram) in under 2 seconds',
      'AI synthesis categorizing corporate capability, secondary services, and footprint size',
      'Automated deduplication against existing CRM databases via fuzzy domain matching',
      'One-click direct synchronization to outbound campaign queues'
    ],
    quoteOrHighlight: 'Saves 20+ hours weekly per SDR by transforming fragmented web data into unified, decision-maker-ready account cards.'
  },
  {
    id: 'growth-machine-pipeline',
    title: 'The ₹100Cr Revenue Growth Machine',
    subtitle: 'High-ROI Outbound Pipeline Engine Delivering 1,000+ Clean Leads Weekly',
    category: 'RevOps & Growth',
    timeline: '2024 – Present',
    impactMetric: '₹100Cr',
    impactLabel: 'Pipeline Value Generated',
    problem:
      'Outbound SDR motions were bottlenecked by inaccurate contact databases, manual lead uploads, high bounce rates, and slow response to prospect signals.',
    solution:
      'Engineered a high-velocity automated pipeline integrating Apollo, ZoomInfo, Lusha, and Sales Navigator into an automated cleaning, phone verification, and CRM ingestion pipeline.',
    architecture:
      'Automated ingestion queue running email hygiene validation (MX record probe, SMTP ping, throwaway filter), CRM deduplication, decision-maker hierarchy mapping, and instant SDR assignment.',
    stack: ['Apollo API', 'Sales Navigator', 'Lusha', 'ZoomInfo', 'n8n', 'Python', 'Supabase'],
    features: [
      '1,000+ verified, validated leads uploaded into active pipeline every week',
      '+40% increase in outbound meeting bookings within first 60 days of rollout',
      'Built a ₹100Cr enterprise pipeline with only ₹20K in annual software expenditure (50,000x ROI)',
      'Sub-5 minute lead routing based on geography, industry vertical, and target deal size',
      'Automated daily executive reporting highlighting pipeline coverage and velocity'
    ],
    quoteOrHighlight: 'Demonstrated how lean engineering and smart automation can out-produce bloated marketing software budgets.'
  },
  {
    id: 'auction-tender-monitor',
    title: '24/7 Auction Alert & Tender Monitor',
    subtitle: 'Continuous Gated Portal Crawling Replacing Paid Aggregation Subscriptions',
    category: 'Data & BI',
    timeline: '2024',
    impactMetric: '24/7 Live',
    impactLabel: 'Continuous Portal Monitoring',
    problem:
      'High-value tenders and auctions across EPR, scrap marketplace, ITAD, and alternative fuels (AFR) were scattered across dozens of state portals with unpredictable update schedules.',
    solution:
      'Architected a 24/7 headless monitoring bot that consolidates public and gated auction listings into a singular real-time alert feed, replacing high-cost commercial aggregation services.',
    architecture:
      'Automated cron-based headless scraping cluster running against authenticated and public portals, parsing PDF circulars, extracting bid criteria with Claude API, and firing instant webhook alerts.',
    stack: ['Python', 'Headless Browser Automation', 'Claude API PDF Extraction', 'Webhooks', 'Telegram / Email Alerts'],
    features: [
      'Consolidates public tender portals and private auction platforms into one feed',
      'Automated PDF tender parsing: extract earnest money deposit (EMD), deadlines, and quantity specs',
      'Zero latency alerts sent directly to commercial bidding leads via email and webhooks',
      'Historical bid price tracker mapping clearing rates and winning tender amounts',
      '100% internal uptime with self-healing scraper selectors'
    ],
    quoteOrHighlight: 'Replaced a paid enterprise aggregation platform while delivering tender alerts 2 hours faster than legacy competitors.'
  },
  {
    id: 'epr-readiness-score',
    title: 'EPR Readiness Assessment Scoring Engine',
    subtitle: 'Algorithmic Compliance Staging with Automated Risk & Outreach Generation',
    category: 'RevOps & Growth',
    timeline: '2024',
    impactMetric: '0 to 100',
    impactLabel: 'Algorithmic Risk Index',
    problem:
      'Enterprise prospects lacked awareness of statutory Extended Producer Responsibility (EPR) shortfalls, making traditional cold sales outreach low-conversion and unfocused.',
    solution:
      'Built an interactive assessment model calculating a company’s EPR compliance score, diagnosing statutory risks, shortfalls against state targets, and generating hyper-tailored outreach pitches.',
    architecture:
      'Rule-based and AI-augmented scoring engine mapping registered production volume against annual statutory fulfillment targets, outputting a detailed risk rating (Low, Medium, Critical).',
    stack: ['TypeScript', 'Claude API', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    features: [
      'Objective 100-point index evaluating statutory compliance risk',
      'Identified CPCB-registered companies with severe EPR shortfalls for targeted pre-sales outreach',
      'Automated pitch deck generation summarizing specific liability figures for board-level review',
      'Direct pipeline lift with outbound reply rates jumping 3x on personalized risk reports',
      'Integration into sales cadences as an authoritative top-of-funnel lead magnet'
    ],
    quoteOrHighlight: 'Transformed cold pitches into authoritative regulatory consultations, tripling enterprise response rates.'
  },
  {
    id: 'vertical-web-systems',
    title: 'Three Production Vertical Web Platforms',
    subtitle: 'Rapid-Ship Web Platforms for EPR, Recommerce, and Scrap Marketplace',
    category: 'Web Systems',
    timeline: '2024',
    impactMetric: '8 Days',
    impactLabel: 'E-commerce Frontend Shipped',
    problem:
      'Launching new business units required rapid digital storefronts and compliance portals without waiting months for traditional external agency design and engineering cycles.',
    solution:
      'Single-handedly architected and deployed three distinct live production platforms on Vercel: an EPR portal, a Recommerce hub, and a Scrap Marketplace, plus a full e-commerce front end in 8 days.',
    architecture:
      'Modern Jamstack architectures combining React, Next.js / Vite, Tailwind CSS, Supabase backend, and Figma component system with high Lighthouse performance scores.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Figma', 'Supabase'],
    features: [
      'Three dedicated vertical platforms deployed and serving active transactions',
      'Full e-commerce front end delivered from scratch in just 8 days',
      'Clean modular UI component architecture following modern zero-pill aesthetics',
      'Integrated contact capture, lead forms, and instant CRM synchronization',
      'Sub-second page load times with 98+ Lighthouse scores across mobile and desktop'
    ],
    quoteOrHighlight: 'Proves the capability to execute end-to-end: from database schema and backend automation to consumer-grade, pixel-perfect frontend interfaces.'
  }
];

export const TECHNICAL_SKILLS_MATRIX = [
  {
    category: 'AI & Agent Architecture',
    skills: [
      { name: 'Claude API (3.5 / 3.7)', level: 'Advanced Production' },
      { name: 'Multi-Agent Orchestration', level: 'Architect' },
      { name: 'Human-in-the-Loop Approval', level: 'Enterprise Standard' },
      { name: 'Prompt & System Instruction Design', level: 'Expert' },
      { name: 'n8n Workflow Automation', level: 'Expert' },
      { name: 'Python Backends & Scraping', level: 'Production' },
      { name: 'Webhook & Event-Driven Flows', level: 'Advanced' }
    ]
  },
  {
    category: 'CRM & RevOps Engineering',
    skills: [
      { name: 'Custom Supabase CRM Architecture', level: 'Architect' },
      { name: 'HubSpot Administration & Workflows', level: 'Expert' },
      { name: 'Salesforce & Zoho Administration', level: 'Proficient' },
      { name: '3-Stage Pipeline Reporting', level: 'Enterprise Lead' },
      { name: 'Lead Lifecycle & Routing Engines', level: 'Production' },
      { name: 'Data Hygiene & Deduplication', level: 'Advanced' }
    ]
  },
  {
    category: 'Data, Backend & Intelligence',
    skills: [
      { name: 'Supabase & PostgreSQL Modeling', level: 'Production' },
      { name: 'Row-Level Security (RLS)', level: 'Production' },
      { name: '24/7 Headless Web Crawlers', level: 'Expert' },
      { name: 'Apollo & ZoomInfo Integration', level: 'Expert' },
      { name: 'Sales Navigator & Lusha Scrapers', level: 'Advanced' },
      { name: 'Looker Studio & GA4 Telemetry', level: 'Advanced' }
    ]
  },
  {
    category: 'Modern Front-End & Deployment',
    skills: [
      { name: 'React 19 & TypeScript', level: 'Production' },
      { name: 'Tailwind CSS v4 & Motion', level: 'Production' },
      { name: 'Figma UI/UX Prototyping', level: 'Advanced' },
      { name: 'Vercel Jamstack Deployment', level: 'Production' },
      { name: 'Google Apps Script Automation', level: 'Expert' },
      { name: 'Resend Developer Email API', level: 'Expert' }
    ]
  }
];

export const WORK_EXPERIENCE = [
  {
    company: 'Recykal',
    period: '2024 – Present',
    role: 'Senior Executive, Lead Generation & Acquisition',
    concurrentRole: 'Concurrent project role: Full-Stack Automation & Front-End Specialist',
    location: 'Hyderabad, India',
    highlights: [
      'Built a non-social listening bot scraping web and social posts by intent keywords, with daily sentiment dashboards and AI email briefings.',
      'Integrated Apollo, Lusha, ZoomInfo and Sales Navigator into outbound pipelines, saving 20+ hours weekly.',
      'Identified CPCB-registered companies with EPR shortfalls; validated data and mapped decision-makers for pre-sales.',
      'Administered Zoho, HubSpot and MDS CRMs: lead creation workflows, routing rules and real-time dashboards.',
      'Designed the Supabase CRM schema (leads, accounts, pipeline stages); connected n8n via webhooks and REST APIs for alerts, status updates and live lead sync.',
      'Implemented row-level security for multi-user access and clean data; built Figma prototypes and live websites on Vercel.'
    ]
  },
  {
    company: 'Silicon India',
    period: '2022 – 2024',
    role: 'Market Research Analyst',
    concurrentRole: null,
    location: 'India',
    highlights: [
      'Delivered market research, competitor analysis, segmentation and market sizing for product and marketing strategy.',
      'Built and validated B2B contact databases for US-market campaigns; ran large-scale scraping with data hygiene protocols.',
      'Built keyword-driven databases for consumer insights and supported research reporting.'
    ]
  }
];

export const RECRUITER_MATCH_CRITERIA = [
  {
    role: 'GTM Engineer',
    matchScore: '98%',
    keyStrengths: [
      'Built end-to-end automated scraping, enrichment, and multi-channel outreach engine',
      '5-agent campaign orchestration system eliminating manual marketing friction',
      'Direct ownership of pipeline generation from scrapers to CRM to live booked meetings'
    ]
  },
  {
    role: 'AI Automation Specialist',
    matchScore: '99%',
    keyStrengths: [
      'Production Claude API agent prompts with few-shot reasoning and human-in-the-loop validation',
      'Webhook-driven n8n orchestrations coordinating complex multi-tool pipelines',
      '24/7 autonomous monitoring crawlers replacing expensive third-party data SaaS'
    ]
  },
  {
    role: 'RevOps Architect',
    matchScore: '96%',
    keyStrengths: [
      'Three-stage pipeline reporting (raw, qualified, closure/payment) across marketing, pre-sales, sales',
      'Automated lead routing, stage transition listeners, and real-time data hygiene',
      'Built a ₹100Cr revenue pipeline on a mere ₹20K tool budget'
    ]
  },
  {
    role: 'Custom CRM & Backend Engineer',
    matchScore: '95%',
    keyStrengths: [
      'Designed complete relational PostgreSQL database schema with Row-Level Security on Supabase',
      'Deep administrative mastery across HubSpot, Zoho, and Salesforce',
      'Zero external SaaS licensing dependency with seamless webhook integrations'
    ]
  }
];
