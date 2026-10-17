import React, { useState, useEffect, useCallback } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { TopUtilityBar } from './components/TopUtilityBar';
import { LandingOverview } from './components/LandingOverview';
import { ScanUploadStudio } from './components/ScanUploadStudio';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { FindingsPanel } from './components/FindingsPanel';
import { ScanHistoryView } from './components/ScanHistoryView';
import { SourcesRegistry } from './components/SourcesRegistry';
import { MethodologyArchitecture } from './components/MethodologyArchitecture';
import { SettingsModal } from './components/SettingsModal';
import { ExecutiveBriefModal } from './components/ExecutiveBriefModal';
import { FLAGSHIP_DEMO_REPORT } from './data/flagshipDemo';
import { SCAN_HISTORY } from './data/scanHistory';
import { ComplianceReport } from './types/compliance';
import { Check, Download, ArrowLeft, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'scan' | 'results' | 'history' | 'sources' | 'methodology' | 'settings'
  >('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const [currentReport, setCurrentReport] = useState<ComplianceReport>(FLAGSHIP_DEMO_REPORT);
  const [scanHistory, setScanHistory] = useState<ComplianceReport[]>(SCAN_HISTORY);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>('JL-001');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [geminiConfigured, setGeminiConfigured] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch API Health & Gemini key status
  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data && typeof data.geminiConfigured === 'boolean') {
        setGeminiConfigured(data.geminiConfigured);
      }
    } catch (err) {
      console.warn('Backend health check skipped or in client-only mode:', err);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  // Global Keyboard Shortcuts (⌘N / Ctrl+N for New Scan)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setActiveTab('scan');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoadDemo = () => {
    setCurrentReport(FLAGSHIP_DEMO_REPORT);
    setSelectedFindingId('JL-001');
    setActiveTab('results');
    triggerToast('Loaded flagship ZenBrew 330ml Singapore compliance demo case.');
  };

  const handleScanComplete = (newReport: ComplianceReport) => {
    setCurrentReport(newReport);
    setScanHistory((prev) => [newReport, ...prev.filter((r) => r.id !== newReport.id)]);
    setSelectedFindingId(newReport.findings[0]?.id || null);
    setActiveTab('results');
    triggerToast(`Analysis complete! Identified ${newReport.findings.length} findings.`);
  };

  const handleSelectHistoryReport = (report: ComplianceReport) => {
    setCurrentReport(report);
    setSelectedFindingId(report.findings[0]?.id || null);
    setActiveTab('results');
    triggerToast(`Opened audit record for ${report.assetName}.`);
  };

  const handleToggleReviewed = (findingId: string) => {
    setCurrentReport((prev) => {
      const updatedFindings = prev.findings.map((f) => {
        if (f.id === findingId) {
          const nextState = !f.reviewed;
          triggerToast(nextState ? `Marked ${f.id} as reviewed` : `Unmarked ${f.id}`);
          return { ...f, reviewed: nextState };
        }
        return f;
      });
      return { ...prev, findings: updatedFindings };
    });
  };

  return (
    <div className="min-h-screen flex bg-[#F7F5EE] text-[#26352D] selection:bg-[#E5EFE5] selection:text-[#26352D]">
      {/* Desktop Persistent Left Sidebar */}
      <div className="hidden md:flex shrink-0">
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'settings') {
              setIsSettingsOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          hasActiveReport={Boolean(currentReport)}
          geminiConfigured={geminiConfigured}
          onExploreDemo={handleLoadDemo}
          historyCount={scanHistory.length}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#26352D]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] bg-[#FFFEFA] h-full shadow-2xl border-r border-[#DFDACD]">
            <AppSidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setIsMobileSidebarOpen(false);
                if (tab === 'settings') {
                  setIsSettingsOpen(true);
                } else {
                  setActiveTab(tab);
                }
              }}
              isCollapsed={false}
              setIsCollapsed={() => {}}
              hasActiveReport={Boolean(currentReport)}
              geminiConfigured={geminiConfigured}
              onExploreDemo={() => {
                setIsMobileSidebarOpen(false);
                handleLoadDemo();
              }}
              historyCount={scanHistory.length}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Utility Bar */}
        <TopUtilityBar
          activeTab={activeTab}
          currentReport={currentReport}
          onNewScan={() => setActiveTab('scan')}
          onExportBrief={() => setIsBriefModalOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Viewport Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* View 1: Overview */}
          {activeTab === 'overview' && (
            <LandingOverview
              onAnalyzeClick={() => setActiveTab('scan')}
              onExploreDemo={handleLoadDemo}
              onViewSources={() => setActiveTab('sources')}
              onViewArchitecture={() => setActiveTab('methodology')}
              onSelectReport={handleSelectHistoryReport}
            />
          )}

          {/* View 2: New Scan Studio */}
          {activeTab === 'scan' && (
            <ScanUploadStudio
              onScanComplete={handleScanComplete}
              onLoadFlagshipDemo={handleLoadDemo}
              geminiConfigured={geminiConfigured}
            />
          )}

          {/* View 3: Signature Inspection Workspace */}
          {activeTab === 'results' && currentReport && (
            <div className="flex flex-col p-3 sm:p-4 space-y-3 max-w-[1520px] mx-auto w-full h-[calc(100vh-3.5rem)] overflow-hidden">
              {/* Workspace Sub-Header: Clean & Compact */}
              <div className="flex items-center justify-between pb-2 border-b border-[#DFDACD] shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="p-1 rounded-md text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors shrink-0"
                    title="Return to Overview"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm font-bold text-[#26352D] tracking-tight truncate">
                      {currentReport.assetName}
                    </span>
                    <span className="text-[#DFDACD]">·</span>
                    <span className="text-xs text-[#477A58] font-medium shrink-0">
                      {currentReport.jurisdiction}
                    </span>
                    <span className="text-[#858A80] text-[11px] font-mono hidden sm:inline">
                      ({new Date(currentReport.analyzedAt).toLocaleTimeString()})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('scan')}
                    className="px-2.5 py-1 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-xs font-medium text-[#26352D] transition-colors shadow-2xs"
                  >
                    Scan Another
                  </button>
                  <button
                    onClick={() => setIsBriefModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#477A58] hover:bg-[#386849] text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Audit Brief</span>
                  </button>
                </div>
              </div>

              {/* Two-Column Responsive Workspace Grid: Maximizes space */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Left Column: Interactive Precision Canvas */}
                <div className="lg:col-span-7 h-full flex flex-col min-h-0 overflow-hidden">
                  <InteractiveCanvas
                    report={currentReport}
                    selectedFindingId={selectedFindingId}
                    onSelectFinding={(id) => setSelectedFindingId(id)}
                    showAnnotations={showAnnotations}
                    onToggleAnnotations={() => setShowAnnotations(!showAnnotations)}
                  />
                </div>

                {/* Right Column: Streamlined Findings Panel */}
                <div className="lg:col-span-5 h-full flex flex-col min-h-0 overflow-hidden">
                  <FindingsPanel
                    report={currentReport}
                    selectedFindingId={selectedFindingId}
                    onSelectFinding={(id) => setSelectedFindingId(id)}
                    onToggleReviewed={handleToggleReviewed}
                    onOpenBriefModal={() => setIsBriefModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* View 4: Scan History */}
          {activeTab === 'history' && (
            <ScanHistoryView
              history={scanHistory}
              onSelectReport={handleSelectHistoryReport}
              onNewScan={() => setActiveTab('scan')}
            />
          )}

          {/* View 5: Statutory Knowledge Base */}
          {activeTab === 'sources' && <SourcesRegistry />}

          {/* View 6: Architecture & Methodology */}
          {activeTab === 'methodology' && <MethodologyArchitecture />}
        </div>
      </div>

      {/* Audit Brief Modal */}
      {currentReport && (
        <ExecutiveBriefModal
          report={currentReport}
          isOpen={isBriefModalOpen}
          onClose={() => setIsBriefModalOpen(false)}
        />
      )}

      {/* System Diagnostics & Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        geminiConfigured={geminiConfigured}
        onRefreshHealth={checkHealth}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFEFA] border border-[#DFDACD] text-xs text-[#26352D] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="h-4 w-4 text-[#28734A] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
