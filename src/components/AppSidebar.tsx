import React from 'react';
import {
  LayoutDashboard,
  ScanSearch,
  FileSearch,
  History,
  Scale,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';

interface AppSidebarProps {
  activeTab: 'overview' | 'scan' | 'results' | 'history' | 'sources' | 'methodology' | 'settings';
  setActiveTab: (tab: 'overview' | 'scan' | 'results' | 'history' | 'sources' | 'methodology' | 'settings') => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  hasActiveReport: boolean;
  geminiConfigured: boolean;
  onExploreDemo: () => void;
  historyCount: number;
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  hasActiveReport,
  geminiConfigured,
  onExploreDemo,
  historyCount,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'overview' as const,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'scan' as const,
      label: 'New Scan',
      icon: ScanSearch,
      highlight: true,
    },
    {
      id: 'results' as const,
      label: 'Inspection Workspace',
      icon: FileSearch,
      badge: hasActiveReport ? 'Active' : undefined,
    },
    {
      id: 'history' as const,
      label: 'Scan History',
      icon: History,
      count: historyCount,
    },
    {
      id: 'sources' as const,
      label: 'Regulatory Sources',
      icon: Scale,
      count: 9,
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-[#DFDACD] bg-[#FFFEFA] text-[#26352D] transition-all duration-200 z-30 shrink-0 h-full ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between px-3.5 border-b border-[#DFDACD] shrink-0">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-[#477A58] text-white hover:bg-[#386849] transition-colors focus:outline-none"
            title="Expand sidebar"
          >
            <ShieldCheck className="h-5 w-5" />
          </button>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 text-left group focus:outline-none min-w-0"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#477A58] text-white shadow-2xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="truncate min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold tracking-tight text-[#26352D] group-hover:text-[#477A58] transition-colors">
                    JurisLens
                  </span>
                  <span className="text-[9px] font-mono font-medium text-[#477A58] bg-[#E5EFE5] px-1 py-0.2 rounded border border-[#C9C2B3]">
                    JAPAC
                  </span>
                </div>
              </div>
            </button>

            {onCloseMobile ? (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-md text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors md:hidden"
                title="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded-md text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4] transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Main Direct Navigation Links */}
      <div
        className={`flex-1 overflow-y-auto ${
          isCollapsed ? 'flex flex-col items-center py-3 px-2 gap-1.5' : 'p-2 space-y-1'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (isCollapsed) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors relative focus:outline-none ${
                  isActive
                    ? 'bg-[#E5EFE5] text-[#477A58] border border-[#C9C2B3]'
                    : item.highlight
                    ? 'bg-[#477A58] text-white hover:bg-[#386849]'
                    : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4" />
                {item.badge && !item.highlight && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#28734A]" />
                )}
              </button>
            );
          }

          if (item.highlight) {
            return (
              <div key={item.id} className="pt-0.5 pb-1">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#477A58] text-white shadow-2xs'
                      : 'bg-[#E5EFE5] text-[#26352D] hover:bg-[#d8e8d8] border border-[#C9C2B3]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#477A58]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-70">⌘N</span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#E5EFE5] text-[#26352D] font-semibold border border-[#C9C2B3]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#477A58]' : 'text-[#68736A]'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge && (
                  <span className="text-[10px] font-medium text-[#28734A] bg-[#E5F3E8] px-1.5 py-0.2 rounded border border-[#28734A]/20">
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && (
                  <span className="text-[10px] font-mono text-[#858A80]">
                    {item.count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Compact Actions & Diagnostics */}
      <div className="p-2 border-t border-[#DFDACD] bg-[#F7F5EE]/60 space-y-1 shrink-0">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onExploreDemo}
              className="h-9 w-9 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-[#477A58] flex items-center justify-center transition-colors"
              title="Load Demo Case"
            >
              <Sparkles className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsCollapsed(false)}
              className="h-9 w-9 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-[#68736A] flex items-center justify-center transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onExploreDemo}
              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-xs font-medium text-[#26352D] transition-colors shadow-2xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#477A58]" />
              <span>Load Demo Case</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#E5EFE5] text-[#26352D]'
                  : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
              }`}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Diagnostics</span>
              </div>
              <span
                className={`h-2 w-2 rounded-full ${
                  geminiConfigured ? 'bg-[#28734A]' : 'bg-[#8A6417]'
                }`}
                title={geminiConfigured ? 'Gemini Live' : 'Demo Mode'}
              />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
