import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Crosshair,
  CheckSquare,
  Square,
  Scale,
} from 'lucide-react';
import { ComplianceFinding, ComplianceReport, SeverityLevel } from '../types/compliance';

interface FindingsPanelProps {
  report: ComplianceReport;
  selectedFindingId: string | null;
  onSelectFinding: (findingId: string) => void;
  onToggleReviewed: (findingId: string) => void;
  onOpenBriefModal?: () => void;
}

export const FindingsPanel: React.FC<FindingsPanelProps> = ({
  report,
  selectedFindingId,
  onSelectFinding,
  onToggleReviewed,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFindings = report.findings.filter((f) => {
    if (filterSeverity === 'all') return true;
    return f.severity === filterSeverity;
  });

  const getRiskBadge = (severity: SeverityLevel) => {
    if (severity === 'high') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F8E6E8] text-[#B53D4A] border border-[#B53D4A]/20">
          <AlertCircle className="h-3 w-3" />
          <span>Potential Issue</span>
        </span>
      );
    }
    if (severity === 'medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FBF0D2] text-[#8A6417] border border-[#8A6417]/20">
          <AlertTriangle className="h-3 w-3" />
          <span>Needs Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20">
        <CheckCircle2 className="h-3 w-3" />
        <span>No Issue Detected</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFEFA] border border-[#DFDACD] rounded-2xl overflow-hidden shadow-xs">
      {/* Header: Concise Counts & Risk Filter Pills */}
      <div className="p-3.5 sm:p-4 border-b border-[#DFDACD] bg-[#FFFEFA] shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#26352D] tracking-tight">Compliance Findings</h2>
            <p className="text-[11px] text-[#68736A]">
              {report.findings.length} inspected items for {report.jurisdiction}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-[#B53D4A] bg-[#F8E6E8] px-2 py-0.5 rounded border border-[#B53D4A]/20">
              {report.summary.highSeverityCount} High Risk
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#F1EEE4] p-1 rounded-lg border border-[#DFDACD] overflow-x-auto">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              filterSeverity === 'all'
                ? 'bg-[#FFFEFA] text-[#26352D] font-semibold shadow-2xs'
                : 'text-[#68736A] hover:text-[#26352D]'
            }`}
          >
            All ({report.findings.length})
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              filterSeverity === 'high'
                ? 'bg-[#F8E6E8] text-[#B53D4A] font-semibold'
                : 'text-[#68736A] hover:text-[#26352D]'
            }`}
          >
            Potential Issues ({report.summary.highSeverityCount})
          </button>
          <button
            onClick={() => setFilterSeverity('medium')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              filterSeverity === 'medium'
                ? 'bg-[#FBF0D2] text-[#8A6417] font-semibold'
                : 'text-[#68736A] hover:text-[#26352D]'
            }`}
          >
            Needs Review ({report.summary.mediumSeverityCount})
          </button>
          <button
            onClick={() => setFilterSeverity('informational')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
              filterSeverity === 'informational'
                ? 'bg-[#E5F3E8] text-[#28734A] font-semibold'
                : 'text-[#68736A] hover:text-[#26352D]'
            }`}
          >
            No Issues ({report.summary.infoCount})
          </button>
        </div>
      </div>

      {/* Findings List: Simplified into 3 concise points */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
        {filteredFindings.map((finding) => {
          const isSelected = selectedFindingId === finding.id;

          return (
            <div
              key={finding.id}
              onClick={() => onSelectFinding(finding.id)}
              className={`rounded-xl border transition-all p-3.5 space-y-3 cursor-pointer ${
                isSelected
                  ? 'border-[#477A58] bg-[#E5EFE5]/25 ring-1 ring-[#477A58]/30 shadow-xs'
                  : 'border-[#DFDACD] bg-[#FFFEFA] hover:bg-[#F1EEE4]/40 hover:border-[#C9C2B3]'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#26352D] bg-[#F1EEE4] px-1.5 py-0.5 rounded border border-[#DFDACD]">
                    {finding.id}
                  </span>
                  {getRiskBadge(finding.severity)}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFinding(finding.id);
                    }}
                    className="p-1 rounded text-[#68736A] hover:text-[#477A58] hover:bg-[#F1EEE4] transition-colors"
                    title="Focus on Canvas"
                  >
                    <Crosshair className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleReviewed(finding.id);
                    }}
                    className={`p-1 rounded transition-colors ${
                      finding.reviewed
                        ? 'text-[#28734A] bg-[#E5F3E8]'
                        : 'text-[#858A80] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                    }`}
                    title={finding.reviewed ? 'Marked as reviewed' : 'Mark as reviewed'}
                  >
                    {finding.reviewed ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-semibold text-[#26352D] leading-snug">
                {finding.title}
              </h3>

              {/* Point 1: Observed Issue (OCR quote) */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68736A]">
                  1. Observed Issue
                </span>
                <div className="p-2.5 rounded-lg bg-[#F7F5EE] border border-[#DFDACD] font-mono text-xs text-[#26352D] leading-relaxed">
                  "{finding.observation}"
                </div>
              </div>

              {/* Point 2: Statute Citation (Hyperlink to source) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68736A]">
                    2. Statute Citation
                  </span>
                  {finding.source.sourceUrl && (
                    <a
                      href={finding.source.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] text-[#477A58] hover:text-[#386849] hover:underline font-medium"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
                <div className="p-2.5 rounded-lg bg-[#F1EEE4] border border-[#DFDACD] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#26352D]">
                    <Scale className="h-3.5 w-3.5 text-[#477A58] shrink-0" />
                    <span className="truncate">{finding.source.provision}</span>
                    <span className="text-[#858A80] text-[10px]">· {finding.source.authority}</span>
                  </div>
                  <p className="text-[11px] text-[#68736A] italic border-l-2 border-[#477A58] pl-2 leading-relaxed">
                    "{finding.source.verifiedExcerpt}"
                  </p>
                </div>
              </div>

              {/* Point 3: Recommended Fix (Copyable compliant copy) */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68736A]">
                  3. Recommended Fix
                </span>
                <div className="p-2.5 rounded-lg bg-[#E5EFE5]/40 border border-[#C9C2B3] text-xs space-y-2">
                  <p className="text-[#26352D] leading-relaxed">{finding.recommendation}</p>

                  {finding.suggestedWording && (
                    <div className="pt-2 border-t border-[#DFDACD]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#477A58] font-semibold uppercase tracking-wider">
                          Compliant Copy:
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyText(finding.suggestedWording!, finding.id);
                          }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-[#26352D] transition-colors shadow-2xs"
                        >
                          {copiedId === finding.id ? (
                            <>
                              <Check className="h-3 w-3 text-[#28734A]" />
                              <span className="text-[#28734A]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 text-[#477A58]" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-[#FFFEFA] p-2 rounded font-mono text-[11px] text-[#26352D] border border-[#DFDACD] select-all">
                        {finding.suggestedWording}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredFindings.length === 0 && (
          <div className="text-center py-10 text-[#858A80] text-xs">
            No findings match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};
