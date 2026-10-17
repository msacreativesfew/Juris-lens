import React, { useState } from 'react';
import {
  History,
  Search,
  ArrowRight,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { ComplianceReport } from '../types/compliance';

interface ScanHistoryViewProps {
  history: ComplianceReport[];
  onSelectReport: (report: ComplianceReport) => void;
  onNewScan: () => void;
}

export const ScanHistoryView: React.FC<ScanHistoryViewProps> = ({
  history,
  onSelectReport,
  onNewScan,
}) => {
  const [filterMarket, setFilterMarket] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHistory = history.filter((item) => {
    const matchesMarket =
      filterMarket === 'all' || item.jurisdiction.toLowerCase() === filterMarket.toLowerCase();
    const matchesSearch =
      item.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMarket && matchesSearch;
  });

  const getStatusBadge = (status: ComplianceReport['summary']['overallStatus']) => {
    if (status === 'remediation_required') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#F8E6E8] text-[#B53D4A] border border-[#B53D4A]/20">
          <AlertCircle className="h-3 w-3" />
          <span>Remediation required</span>
        </span>
      );
    }
    if (status === 'requires_review') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#FBF0D2] text-[#8A6417] border border-[#8A6417]/20">
          <AlertTriangle className="h-3 w-3" />
          <span>Needs review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20">
        <CheckCircle2 className="h-3 w-3" />
        <span>No issue in region</span>
      </span>
    );
  };

  const getIsoCode = (jurisdiction: string) => {
    switch (jurisdiction) {
      case 'Singapore':
        return 'SG';
      case 'Japan':
        return 'JP';
      case 'India':
        return 'IN';
      case 'Vietnam':
        return 'VN';
      default:
        return 'INT';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#477A58] mb-1">
            <History className="h-4 w-4" />
            <span>Audit History & Case Records</span>
          </div>
          <h1 className="text-3xl font-bold text-[#26352D] tracking-tight">Compliance Scan History</h1>
          <p className="text-sm text-[#68736A] mt-1 max-w-2xl">
            Review previous packaging analyses, compare regional market findings, and resume inspection sessions.
          </p>
        </div>

        <button
          onClick={onNewScan}
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#477A58] hover:bg-[#386849] text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98]"
        >
          <span>Run New Scan</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#FFFEFA] border border-[#DFDACD] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#858A80]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by asset name, market, or finding summary..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-xs text-[#26352D] placeholder-[#858A80]/70 focus:outline-none focus:border-[#477A58]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#F1EEE4] p-0.5 rounded-lg border border-[#DFDACD]">
          {['all', 'Singapore', 'India', 'Japan'].map((m) => (
            <button
              key={m}
              onClick={() => setFilterMarket(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filterMarket === m
                  ? 'bg-[#FFFEFA] text-[#26352D] font-semibold shadow-2xs'
                  : 'text-[#68736A] hover:text-[#26352D]'
              }`}
            >
              {m === 'all' ? 'All Markets' : m}
            </button>
          ))}
        </div>
      </div>

      {/* History Table / Records List */}
      <div className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] overflow-hidden shadow-xs divide-y divide-[#DFDACD]">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectReport(item)}
            className="p-4 sm:p-5 hover:bg-[#F1EEE4]/50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left: Asset details & Market */}
            <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
              <span className="font-mono font-bold text-xs px-2 py-1 rounded bg-[#F1EEE4] text-[#26352D] border border-[#DFDACD] shrink-0">
                {getIsoCode(item.jurisdiction)}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-[#26352D] truncate">{item.assetName}</h3>
                  <span className="text-xs text-[#858A80]">·</span>
                  <span className="text-xs text-[#68736A]">{item.jurisdiction}</span>
                </div>
                <p className="text-xs text-[#68736A] mt-0.5 line-clamp-1">{item.summary.executiveSummary}</p>
              </div>
            </div>

            {/* Middle: Severity counts */}
            <div className="flex items-center gap-2 shrink-0">
              {item.summary.highSeverityCount > 0 && (
                <span className="text-[11px] font-semibold text-[#B53D4A] bg-[#F8E6E8] px-2 py-0.5 rounded border border-[#B53D4A]/20">
                  {item.summary.highSeverityCount} Issues
                </span>
              )}
              {item.summary.mediumSeverityCount > 0 && (
                <span className="text-[11px] font-semibold text-[#8A6417] bg-[#FBF0D2] px-2 py-0.5 rounded border border-[#8A6417]/20">
                  {item.summary.mediumSeverityCount} Advisories
                </span>
              )}
              {item.summary.infoCount > 0 && (
                <span className="text-[11px] font-semibold text-[#28734A] bg-[#E5F3E8] px-2 py-0.5 rounded border border-[#28734A]/20">
                  {item.summary.infoCount} Compliant
                </span>
              )}
            </div>

            {/* Right: Status badge & Reopen action */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              {getStatusBadge(item.summary.overallStatus)}

              <div className="flex items-center gap-1 text-xs font-semibold text-[#477A58] pl-2 border-l border-[#DFDACD]">
                <span>Inspect</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="p-12 text-center text-xs text-[#858A80]">
            No scan records match your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
