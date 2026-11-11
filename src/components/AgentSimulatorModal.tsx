import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AgentSimulator } from './AgentSimulator';

interface AgentSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentSimulatorModal: React.FC<AgentSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0c10] border border-white/[0.14] rounded-2xl shadow-2xl z-10 p-4 sm:p-8 text-zinc-200">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Interactive 5-Agent Pipeline Simulator
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Agent Simulator */}
        <AgentSimulator />
      </div>
    </div>
  );
};
