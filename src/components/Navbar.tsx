import React from 'react';
import { ShieldCheck, ScanSearch, Scale, Workflow, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'scan' | 'results' | 'sources' | 'methodology';
  setActiveTab: (tab: 'overview' | 'scan' | 'results' | 'sources' | 'methodology') => void;
  onLoadDemo: () => void;
  geminiConfigured: boolean;
  hasActiveReport: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onLoadDemo,
  geminiConfigured,
  hasActiveReport,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DFDACD] bg-[#FFFEFA]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#477A58] text-white shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#26352D]">JurisLens</span>
                <span className="text-[10px] font-semibold text-[#477A58] bg-[#E5EFE5] px-1.5 py-0.5 rounded border border-[#C9C2B3]">
                  JAPAC
                </span>
              </div>
              <p className="text-[11px] text-[#68736A]">Visual Compliance Intelligence</p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'scan'
                  ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              <ScanSearch className="h-4 w-4 text-[#477A58]" />
              <span>New Scan</span>
            </button>

            {hasActiveReport && (
              <button
                onClick={() => setActiveTab('results')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'results'
                    ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                    : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                }`}
              >
                <span>Inspection Results</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'sources'
                  ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              <Scale className="h-4 w-4 text-[#477A58]" />
              <span>Regulatory Sources</span>
            </button>

            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'methodology'
                  ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              <Workflow className="h-4 w-4 text-[#477A58]" />
              <span>Methodology</span>
            </button>
          </nav>
        </div>

        {/* Right Action & Engine Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1EEE4] border border-[#DFDACD] text-xs font-mono">
            {geminiConfigured ? (
              <span className="flex items-center gap-1 text-[#28734A] font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Gemini Live</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#8A6417] font-medium">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Demo Mode</span>
              </span>
            )}
          </div>

          <button
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#477A58] hover:bg-[#386849] text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
