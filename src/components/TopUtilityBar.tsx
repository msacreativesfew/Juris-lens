import React from 'react';
import {
  Menu,
  ChevronRight,
  Download,
  Plus,
} from 'lucide-react';
import { ComplianceReport } from '../types/compliance';

interface TopUtilityBarProps {
  activeTab: string;
  currentReport: ComplianceReport | null;
  onNewScan: () => void;
  onExportBrief?: () => void;
  onToggleMobileSidebar: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  activeTab,
  currentReport,
  onNewScan,
  onExportBrief,
  onToggleMobileSidebar,
}) => {
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'scan':
        return 'New Scan';
      case 'results':
        return currentReport ? `Inspection / ${currentReport.assetName}` : 'Inspection Workspace';
      case 'history':
        return 'Scan History';
      case 'sources':
        return 'Regulatory Sources';
      case 'methodology':
        return 'Methodology';
      case 'settings':
        return 'Diagnostics';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="h-14 border-b border-[#DFDACD] bg-[#FFFEFA] px-4 sm:px-6 flex items-center justify-between text-xs z-20 shrink-0">
      {/* Left: Mobile Toggle & Essential Breadcrumb Trail */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-1.5 -ml-1.5 rounded-lg text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors shrink-0"
          title="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[#68736A] min-w-0">
          <span className="font-semibold text-[#26352D] shrink-0">JurisLens</span>
          <ChevronRight className="h-3.5 w-3.5 text-[#C9C2B3] shrink-0" />
          <span className="text-[#68736A] font-medium truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs md:max-w-md">
            {getBreadcrumb()}
          </span>
        </nav>
      </div>

      {/* Right: Jurisdiction Indicator & Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Clean Jurisdiction Indicator */}
        {currentReport && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1EEE4] border border-[#DFDACD] text-[11px] text-[#26352D]">
            <span className="font-medium">{currentReport.jurisdiction}</span>
            <span
              className={`text-[9px] font-semibold px-1 py-0.2 rounded ${
                currentReport.jurisdiction === 'Singapore'
                  ? 'bg-[#E5F3E8] text-[#28734A]'
                  : 'bg-[#FBF0D2] text-[#8A6417]'
              }`}
            >
              {currentReport.jurisdiction === 'Singapore' ? 'SFA' : 'Preview'}
            </span>
          </div>
        )}

        {/* Export Brief (when available in inspection context) */}
        {activeTab === 'results' && onExportBrief && (
          <button
            onClick={onExportBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-[#26352D] font-medium text-xs transition-colors shadow-2xs"
            title="Export Compliance Audit Brief"
          >
            <Download className="h-3.5 w-3.5 text-[#477A58]" />
            <span className="hidden xs:inline">Export Brief</span>
          </button>
        )}

        {/* Primary Action Button: New Scan */}
        <button
          onClick={onNewScan}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#477A58] hover:bg-[#386849] text-white font-medium text-xs transition-colors shadow-2xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Scan</span>
        </button>
      </div>
    </header>
  );
};
