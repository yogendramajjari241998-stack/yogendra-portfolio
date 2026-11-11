import React, { useState } from 'react';
import { CinematicExperience } from './components/CinematicExperience';
import { HeroSection } from './components/HeroSection';
import { AgentSimulator } from './components/AgentSimulator';
import { ProjectGrid } from './components/ProjectGrid';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { RecruiterDossierModal } from './components/RecruiterDossierModal';
import { AgentSimulatorModal } from './components/AgentSimulatorModal';
import { RecruiterCommandBar } from './components/RecruiterCommandBar';
import { ProjectItem } from './data/portfolioData';
import { WhoAmIJourney } from './components/WhoAmIJourney';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Sparkles, LayoutGrid } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [recruiterTab, setRecruiterTab] = useState<'roles' | 'pdf' | 'contact'>('roles');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cinematic' | 'executive'>('cinematic');

  const handleOpenRecruiterDossier = (tab: 'roles' | 'pdf' | 'contact' = 'roles') => {
    setRecruiterTab(tab);
    setIsRecruiterModalOpen(true);
  };

  const handleOpenResumePdf = () => {
    setRecruiterTab('pdf');
    setIsRecruiterModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000] text-zinc-100 font-sans selection:bg-[#ff2a2b]/30 selection:text-white">
      {/* Pinned Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Top Floating View Switcher for Recruiters */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 p-1 bg-black/80 backdrop-blur-md rounded-xl border border-white/[0.12] shadow-xl">
        <button
          onClick={() => setViewMode('cinematic')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'cinematic'
              ? 'bg-[#de1b1c] text-white shadow-md shadow-red-500/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cinematic Experience</span>
        </button>

        <button
          onClick={() => setViewMode('executive')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            viewMode === 'executive'
              ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Executive Systems Dossier</span>
        </button>
      </div>

      {/* Main View Mode Render */}
      {viewMode === 'cinematic' ? (
        <CinematicExperience
          onOpenProject={(project) => setSelectedProject(project)}
          onOpenRecruiterDossier={handleOpenRecruiterDossier}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
        />
      ) : (
        <div className="min-h-screen bg-[#07080a] text-zinc-100 flex flex-col font-sans">
          <Navbar
            onOpenResume={handleOpenResumePdf}
            onOpenRecruiterDossier={() => handleOpenRecruiterDossier('roles')}
          />
          <main className="flex-1">
            <HeroSection
              onOpenRecruiterDossier={() => handleOpenRecruiterDossier('roles')}
              onExploreAgents={() => {
                const el = document.getElementById('agent-engine');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <WhoAmIJourney
              onExploreSystems={() => {
                const el = document.getElementById('projects-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenRecruiterDossier={() => handleOpenRecruiterDossier('roles')}
            />
            <AgentSimulator />
            <ProjectGrid onSelectProject={(project) => setSelectedProject(project)} />
            <SkillsMatrix />
            <ExperienceTimeline />
          </main>
          <Footer
            onOpenResume={handleOpenResumePdf}
            onOpenRecruiterDossier={() => handleOpenRecruiterDossier('contact')}
          />
        </div>
      )}

      {/* Persistent Recruiter Command HUD */}
      <RecruiterCommandBar
        onOpenRecruiterDossier={handleOpenRecruiterDossier}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Interactive Project Architecture Deep-Dive Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenRecruiterDossier={() => {
            setSelectedProject(null);
            handleOpenRecruiterDossier('roles');
          }}
        />
      )}

      {/* Dedicated MNC Recruiter Dossier & Verified Resume PDF Modal */}
      <RecruiterDossierModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        initialTab={recruiterTab}
      />

      {/* Live 5-Agent Campaign Pipeline Simulator Modal */}
      <AgentSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
}
