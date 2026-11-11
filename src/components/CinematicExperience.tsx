import React, { useEffect, useRef } from 'react';
import { ProjectItem, PORTFOLIO_PROJECTS, CANDIDATE_PROFILE, CORE_METRICS } from '../data/portfolioData';
import { WhoAmIJourney } from './WhoAmIJourney';
import { AgentSimulator } from './AgentSimulator';
import { ProjectGrid } from './ProjectGrid';
import { SkillsMatrix } from './SkillsMatrix';
import { ExperienceTimeline } from './ExperienceTimeline';
import {
  FileText,
  Download,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// Import all cinematic stylesheets
import '../cinematic/styles/app.css';
import '../cinematic/styles/universe.css';
import '../cinematic/styles/chrono.css';
import '../cinematic/styles/projects.css';
import '../cinematic/styles/finale.css';

interface CinematicExperienceProps {
  onOpenProject: (project: ProjectItem) => void;
  onOpenRecruiterDossier: (tab?: 'roles' | 'pdf' | 'contact') => void;
  onOpenSimulator: () => void;
}

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({
  onOpenProject,
  onOpenRecruiterDossier,
  onOpenSimulator
}) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Dynamically boot the cinematic WebGL engine
    import('../cinematic/main.js')
      .then(() => {
        // Wire project card clicks in Scene 4
        const deck = document.getElementById('galleryDeck');
        if (deck) {
          deck.addEventListener('click', (e) => {
            const cardEl = (e.target as HTMLElement).closest('.g-card') as HTMLElement;
            if (cardEl && cardEl.dataset.i) {
              const index = parseInt(cardEl.dataset.i, 10);
              const project = PORTFOLIO_PROJECTS[index % PORTFOLIO_PROJECTS.length];
              if (project) {
                onOpenProject(project);
              }
            }
          });
        }

        // Wire smooth navigation links
        document.querySelectorAll('[data-nav]').forEach((el) => {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            const text = (el.textContent || '').trim().toLowerCase();
            if (text.includes('systems') || text.includes('work') || text.includes('project')) {
              document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('journey') || text.includes('time')) {
              document.getElementById('chrono')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('universe') || text.includes('tools')) {
              document.getElementById('universe')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('agents') || text.includes('simulator')) {
              document.getElementById('agent-engine')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('experience')) {
              document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('contact')) {
              onOpenRecruiterDossier('contact');
            } else if (text.includes('home')) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });
        });
      })
      .catch((err) => {
        console.error('[cinematic] initialization failed:', err);
      });
  }, [onOpenProject, onOpenRecruiterDossier]);

  return (
    <div className="relative text-white selection:bg-[#ff2a2b]/30 selection:text-[#ededed] bg-black">
      {/* ==================================================================== */}
      {/* SCENE 1: THE OPENING (Pure Typographic Majesty: YOGENDRA)            */}
      {/* ==================================================================== */}
      <div className="stage-wrap" id="stageWrap">
        <canvas id="stage" aria-label="Yogendra Majjari — Cinematic Systems Portfolio"></canvas>

        {/* Top Header Navigation */}
        <header className="hdr" id="hdr">
          <svg className="hdr__rule" id="hdrRule" aria-hidden="true" preserveAspectRatio="none">
            <polyline
              id="hdrRulePath"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <a className="hdr__mark" href="#" aria-label="Yogendra Majjari, home">
            <span className="mark-word">YOGENDRA</span>
          </a>

          <span className="hdr__div" aria-hidden="true"></span>

          <p className="hdr__roles">
            <span>GTM Engineer</span>
            <span>AI Automation</span>
            <span>RevOps</span>
          </p>

          <nav className="hdr__nav" aria-label="Primary">
            <ul>
              <li><a href="#" className="is-active" data-nav>Home</a></li>
              <li><a href="#executive-summary" data-nav>Overview</a></li>
              <li><a href="#universe" data-nav>AI Universe</a></li>
              <li><a href="#chrono" data-nav>Journey</a></li>
              <li><a href="#gallery" data-nav>3D Gallery</a></li>
              <li><a href="#agent-engine" data-nav>5 Agents</a></li>
              <li><a href="#projects-section" data-nav>Systems</a></li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenRecruiterDossier('roles')}
                  className="text-amber-400 font-bold hover:text-white transition-colors cursor-pointer"
                >
                  Recruiter Dossier
                </button>
              </li>
            </ul>
          </nav>

          <div className="hdr__meta">
            <a
              href={CANDIDATE_PROFILE.resumePdfPath}
              download="Yogendra_Majjari_Resume.pdf"
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>Resume PDF</span>
            </a>
            <span className="hdr__pips" aria-hidden="true"><i></i><i></i><i></i></span>
          </div>

          <button className="hdr__burger" id="burger" aria-expanded="false" aria-controls="hdrNavMobile">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span className="sr-only">Menu</span>
          </button>
        </header>

        {/* Hero Overlay Furniture */}
        <div className="furniture" aria-hidden="true">
          <p className="welcome" id="welcome">
            <b className="welcome__dots">•••</b>
            <span className="welcome__text">Welcome to my systems</span>
            <b className="welcome__dots">•••</b>
          </p>

          <p className="chip chip--artist" id="chipArtist">
            <span>•AI Automation Specialist•</span>
          </p>

          <p className="chip chip--legend" id="chipLegend">
            <span>•GTM &amp; RevOps Architect•</span>
          </p>

          <div className="arrows arrows--l" id="arrowsL"></div>
          <div className="arrows arrows--r" id="arrowsR"></div>
          <div className="grid-dots grid-dots--br" id="dotsBR"></div>
        </div>

        {/* Mobile Nav Menu */}
        <nav className="menu" id="menu" aria-label="Primary, expanded" hidden>
          <ul>
            <li><a href="#" className="is-active" data-nav>Home</a></li>
            <li><a href="#executive-summary" data-nav>Overview</a></li>
            <li><a href="#universe" data-nav>AI Universe</a></li>
            <li><a href="#chrono" data-nav>Journey</a></li>
            <li><a href="#gallery" data-nav>3D Gallery</a></li>
            <li><a href="#agent-engine" data-nav>5 Agents &amp; Health</a></li>
            <li><a href="#projects-section" data-nav>Systems &amp; Work</a></li>
            <li>
              <button
                type="button"
                onClick={() => onOpenRecruiterDossier('roles')}
                className="text-amber-400 font-bold"
              >
                Recruiter Dossier &amp; Role Match
              </button>
            </li>
            <li>
              <a
                href={CANDIDATE_PROFILE.resumePdfPath}
                download="Yogendra_Majjari_Resume.pdf"
                className="text-white"
              >
                Download Resume PDF
              </a>
            </li>
          </ul>
          <p className="menu__tag">••• Welcome to my systems •••</p>
        </nav>

        {/* Initial Loader / Boot Screen */}
        <div className="boot" id="boot">
          <div className="boot__bar"><i id="bootFill"></i></div>
          <button className="boot__enter" id="bootEnter" hidden>
            <span>Enter Portfolio</span>
          </button>
        </div>

        <noscript>
          <div className="fallback">
            <p>YOGENDRA</p>
            <small>This opening is an animated experience. Please enable JavaScript.</small>
          </div>
        </noscript>
      </div>

      {/* ==================================================================== */}
      {/* FLOWING SCENES & RICH RESUME CONTENT                                  */}
      {/* ==================================================================== */}
      <main className="flow relative z-10">
        {/* Spacer for fixed hero scroll height */}
        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1.4: WHO AM I? — AUTHENTIC CINEMATIC ODYSSEY (7 CHAPTERS) */}
        {/* ------------------------------------------------------------------ */}
        <WhoAmIJourney
          onExploreSystems={() => {
            const el = document.getElementById('projects-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRecruiterDossier={() => onOpenRecruiterDossier('roles')}
        />

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1.5: CANDIDATE EXECUTIVE PROFILE & PROVEN KEY ACHIEVEMENTS  */}
        {/* ------------------------------------------------------------------ */}
        <section id="executive-summary" className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black border-t border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                  <span>Yogendra Majjari</span>
                  <span className="text-zinc-600">/</span>
                  <span>Senior GTM &amp; AI Systems Engineer</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-emerald-400">Hyderabad, India</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                  Building Autonomous AI Agents &amp; Revenue Infrastructure with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
                    Zero SaaS Bloat
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
                  {CANDIDATE_PROFILE.summary}
                </p>

                {/* Target roles unboxed inline list */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500">Open To:</span>
                  {CANDIDATE_PROFILE.openRoles.map((role, idx) => (
                    <React.Fragment key={role}>
                      <span className="text-zinc-200">{role}</span>
                      {idx < CANDIDATE_PROFILE.openRoles.length - 1 && (
                        <span className="text-zinc-600">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Direct Quick Actions Card */}
              <div className="lg:col-span-4 cinematic-glass rounded-2xl p-6 border border-white/[0.1] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.08]">
                  <span className="text-white font-bold">Direct Contact</span>
                  <span className="text-emerald-400">Available Immediately</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2.5 text-zinc-300">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{CANDIDATE_PROFILE.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{CANDIDATE_PROFILE.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-300 truncate">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{CANDIDATE_PROFILE.email}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={CANDIDATE_PROFILE.resumePdfPath}
                    download="Yogendra_Majjari_Resume.pdf"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Verified Resume PDF</span>
                  </a>

                  <button
                    onClick={() => onOpenRecruiterDossier('roles')}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recruiter Evaluation &amp; Match Matrix</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Core Quantitative Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
              {CORE_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="p-6 cinematic-glass rounded-xl border border-white/[0.08] hover:border-amber-400/40 transition-all"
                >
                  <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums tracking-tight mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-zinc-400 leading-snug">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SCENE 2: THE AI & CREATIVE UNIVERSE (Orbiting Tools & Central Figure) */}
        {/* ------------------------------------------------------------------ */}
        <section className="universe" id="universe" aria-labelledby="uniTitle">
          <header className="universe__title" id="uniTitle">
            <p className="universe__over">Scene 02</p>
            <h2 className="universe__name">The Creative<br />Universe</h2>
            <p className="universe__sub">Claude API · n8n · Supabase · Python · Resend · 24/7 Scraping</p>
          </header>

          <ul className="sr-only">
            <li>Claude API</li>
            <li>n8n</li>
            <li>Python</li>
            <li>Supabase</li>
            <li>PostgreSQL</li>
            <li>Resend</li>
            <li>HubSpot</li>
            <li>Salesforce</li>
            <li>Apollo</li>
            <li>React</li>
            <li>Figma</li>
          </ul>

          <video
            id="uniFilm"
            muted
            playsInline
            loop
            preload="metadata"
            poster="/public/media/universe.jpg"
            aria-hidden="true"
          >
            <source src="/public/media/universe.mp4" type="video/mp4" />
          </video>

          <div className="universe__veil" id="uniVeil" aria-hidden="true"></div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SCENE 3: A JOURNEY THROUGH TIME (3D Arc Clock & Interactive Cards)  */}
        {/* ------------------------------------------------------------------ */}
        <section className="chrono" id="chrono" aria-labelledby="chronoTitle">
          <div className="chrono__pin">
            <canvas id="chronoStage" aria-hidden="true"></canvas>

            <h2 className="chrono__title" id="chronoTitle">
              <span>A</span><span>Journey</span><span>Through</span><span>Time</span>
            </h2>

            <p className="chrono__rail" aria-hidden="true">
              <i></i>
              <span>Algorithms</span>
              <span>Market Intel</span>
              <span>Pipelines</span>
              <span>Custom CRM</span>
              <span>₹100Cr Machine</span>
              <i></i>
            </p>

            <p className="chrono__hint" aria-hidden="true">
              Move cursor<br />to travel<br />through time<i></i>
            </p>

            <p className="chrono__note chrono__note--bl" aria-hidden="true">
              Computer Science<br />to Autonomous AI<br />Engineering
            </p>

            <p className="chrono__note chrono__note--br" aria-hidden="true">
              ₹100Cr Pipeline<br />built on ₹20K<br />annual tools<i></i>
            </p>

            <div className="chrono__deck" id="chronoDeck"></div>

            <canvas id="chronoFront" aria-hidden="true"></canvas>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SCENE 4: 3D CURVED AMPHITHEATER GALLERY OF PROJECTS                 */}
        {/* ------------------------------------------------------------------ */}
        <section className="gallery" id="gallery" aria-labelledby="galleryTitle">
          <div className="gallery__pin">
            <canvas id="galleryStage" aria-hidden="true"></canvas>

            <div className="gallery__world">
              <div className="gallery__deck" id="galleryDeck"></div>
              {/* Figure removed as requested - pure card graphics */}
            </div>

            <h2 className="g-label g-label--projects" id="galleryTitle">Projects</h2>

            <p className="g-label g-label--ideas" aria-hidden="true">
              Multi-Agent<br />Autonomous Flows<br />Custom CRM<br /><b>₹100Cr Value</b>
            </p>

            <p className="g-label g-label--scroll" aria-hidden="true">
              Click Card<br />to Inspect<br />Architecture
            </p>

            <p className="g-label g-label--real" aria-hidden="true">
              Zero SaaS Cost<br />5 Connected<br />Agents
            </p>

            <p className="g-label g-label--tomorrow" aria-hidden="true">
              Engineering<br />Operating<br />Leverage
            </p>

            <span className="g-label g-label--num" id="galleryNum" aria-hidden="true">01</span>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* FULL 5-AGENT CAMPAIGN SIMULATOR & REAL-TIME AGENT HEALTH TELEMETRY */}
        {/* ------------------------------------------------------------------ */}
        <div id="agent-engine" className="bg-black py-4">
          <AgentSimulator />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FULL 8 FLAGSHIP SYSTEMS & BI PLATFORMS BENTO GRID                  */}
        {/* ------------------------------------------------------------------ */}
        <div id="projects-section" className="bg-[#07080a]">
          <ProjectGrid onSelectProject={onOpenProject} />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TECHNICAL COMPETENCIES & ROLE-ALIGNED EXPERTISE MATRIX             */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-black">
          <SkillsMatrix />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* PROFESSIONAL WORK EXPERIENCE, LEADERSHIP & ACADEMIC CORE           */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-[#07080a]">
          <ExperienceTimeline />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DIRECT EMBEDDED RESUME PDF VIEWER SECTION FOR TOP MNC RECRUITERS   */}
        {/* ------------------------------------------------------------------ */}
        <section id="resume-pdf" className="py-20 bg-black border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span>Verified Candidate Document</span>
                  <span className="text-zinc-600">/</span>
                  <span>Direct PDF Inspection</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Original Senior AI &amp; GTM Resume
                </h2>
                <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                  Authentic 2-page candidate credentials, verified tool certifications, and performance record.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={CANDIDATE_PROFILE.resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
                <a
                  href={CANDIDATE_PROFILE.resumePdfPath}
                  download="Yogendra_Majjari_Resume.pdf"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-md shadow-amber-400/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            <div className="w-full h-[620px] rounded-2xl overflow-hidden border border-white/[0.12] bg-zinc-950 shadow-2xl">
              <iframe
                src={`${CANDIDATE_PROFILE.resumePdfPath}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Yogendra Majjari Verified Resume"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================================== */}
      {/* SCENE 5 / 6: EDITORIAL FINALE & DIRECT RECRUITER ACTIONS             */}
      {/* ==================================================================== */}
      <footer className="fin" id="fin" aria-label="Closing">
        <div className="fin__pin">
          <h2 className="sr-only">Yogendra Majjari</h2>

          <div className="fin__stage1" id="finStage1">
            <canvas id="finBack" aria-hidden="true"></canvas>
            <canvas id="finMan" aria-hidden="true"></canvas>

            <p className="f-cap f-cap--tl" aria-hidden="true">
              Claude API<br />Supabase RLS<br />n8n Pipelines<br />Real Revenue Impact
            </p>

            <blockquote className="f-cap f-cap--quote">
              &ldquo;Zero<br />SaaS Bloat.<br />True Operating<br />Leverage.&rdquo;
            </blockquote>

            <p className="f-cap f-cap--blw" aria-hidden="true">
              An<br />Engineer&rsquo;s<br />World
            </p>

            <p className="f-cap f-cap--tr" aria-hidden="true">
              High ROI<br />Autonomous Pipelines<br />MNC Scale
            </p>

            <p className="f-cap f-cap--br" aria-hidden="true">
              Plan<br />Build<br />Automate<br />Scale
            </p>
          </div>

          <div className="fin__dim" id="finDim" aria-hidden="true"></div>

          <figure className="fin__frame2" id="finFrame2" aria-hidden="true" hidden>
            <img id="finFrame2Img" alt="" draggable={false} decoding="async" />
          </figure>

          {/* Bottom Bar with Direct Actions */}
          <div className="fin__bar">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenRecruiterDossier('contact')}
                className="text-amber-400 font-bold uppercase tracking-wider text-xs hover:text-white transition-colors cursor-pointer"
              >
                Direct Contact
              </button>
              <button
                type="button"
                onClick={() => onOpenRecruiterDossier('roles')}
                className="text-zinc-300 hover:text-amber-400 text-xs transition-colors cursor-pointer"
              >
                MNC Role Evaluation
              </button>
              <button
                type="button"
                onClick={onOpenSimulator}
                className="text-zinc-300 hover:text-amber-400 text-xs transition-colors cursor-pointer font-mono"
              >
                Test 5-Agent Simulator
              </button>
            </div>

            <nav className="fin__soc" aria-label="Social">
              <a
                href={CANDIDATE_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${CANDIDATE_PROFILE.email}`}
              >
                Email
              </a>
              <a
                href={CANDIDATE_PROFILE.resumePdfPath}
                download="Yogendra_Majjari_Resume.pdf"
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Download Resume PDF
              </a>
            </nav>

            <small className="fin__c">
              &copy; {new Date().getFullYear()} Yogendra Majjari &mdash; Hyderabad, India
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};
