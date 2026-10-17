import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react';
import { SCAN_HISTORY } from '../data/scanHistory';
import { ComplianceReport } from '../types/compliance';

const bottleImageUrl = '/src/assets/images/zenbrew_bottle_label_1791913351086.jpg';

interface LandingOverviewProps {
  onAnalyzeClick: () => void;
  onExploreDemo: () => void;
  onViewSources: () => void;
  onViewArchitecture: () => void;
  onSelectReport: (report: ComplianceReport) => void;
}

export const LandingOverview: React.FC<LandingOverviewProps> = ({
  onAnalyzeClick,
  onExploreDemo,
  onSelectReport,
}) => {
  const [activePreviewAnnotation, setActivePreviewAnnotation] = useState<'red' | 'amber' | 'green'>('red');

  const previewAnnotations = {
    red: {
      id: 'JL-001',
      title: 'Mandatory Nutri-Grade Mark for Sugar Claim',
      severityLabel: 'Potential Issue',
      statusClass: 'bg-[#F8E6E8] text-[#B53D4A] border border-[#B53D4A]/30',
      dotColor: '#B53D4A',
      rule: 'SFA Regulation 184A / Nutri-Grade',
      remedy: 'Affix approved Nutri-Grade Grade B vector label and declare sugar/100ml.',
    },
    amber: {
      id: 'JL-003',
      title: 'Allergen Advisory Typography Height (<1.5mm)',
      severityLabel: 'Needs Review',
      statusClass: 'bg-[#FBF0D2] text-[#8A6417] border border-[#8A6417]/30',
      dotColor: '#8A6417',
      rule: 'SFA Regulation 5(4) Fourth Schedule',
      remedy: 'Format into standalone "ALLERGEN ADVISORY" notice with 1.5mm font height.',
    },
    green: {
      id: 'JL-004',
      title: 'Metric Net Volume Conformance (330ml)',
      severityLabel: 'Compliant in Region',
      statusClass: 'bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/30',
      dotColor: '#28734A',
      rule: 'SFA Regulation 5(1)(c)',
      remedy: 'Net contents declared in metric millilitres (ml) exceeding minimum 3.0mm letter height.',
    },
  };

  const currentAnnotation = previewAnnotations[activePreviewAnnotation];

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Two-Column Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#E5EFE5] border border-[#C9C2B3] text-xs font-semibold tracking-wider text-[#477A58] uppercase">
            <span>JAPAC Regulatory Compliance Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26352D] tracking-tight leading-[1.15]">
            See compliance risks before your product crosses borders.
          </h1>

          <p className="text-sm sm:text-base text-[#68736A] leading-relaxed max-w-xl">
            Inspect packaging artwork, nutrition panels, and trade documents. Identify potential regulatory issues and trace each finding directly to verified statutory evidence.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onAnalyzeClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#477A58] hover:bg-[#386849] text-white font-semibold text-sm shadow-xs transition-all active:scale-[0.98]"
            >
              <span>Analyze an Asset</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onExploreDemo}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFFEFA] hover:bg-[#F1EEE4] border border-[#DFDACD] text-[#26352D] font-semibold text-sm transition-all shadow-2xs active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 text-[#477A58]" />
              <span>Explore Demo Case</span>
            </button>
          </div>
        </div>

        {/* Right Column: Precision Interactive Preview */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-4 sm:p-5 shadow-xs overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DFDACD] text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#28734A]" />
                <span className="font-bold text-[#26352D]">Interactive Inspection Sandbox</span>
                <span className="text-[#68736A]">· Singapore SFA</span>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#477A58]">Sample Preview</span>
            </div>

            {/* Packaging Sandbox Canvas */}
            <div className="relative flex items-center justify-center bg-[#F1EEE4] rounded-xl p-3 border border-[#DFDACD] min-h-[340px]">
              <div className="relative inline-block max-h-[320px] overflow-hidden rounded-lg">
                <img
                  src={bottleImageUrl}
                  alt="Packaged Beverage Compliance Inspection Preview"
                  referrerPolicy="no-referrer"
                  className="max-h-[320px] w-auto object-contain pointer-events-none"
                />

                {/* SVG Precision Bounding Overlays */}
                <svg
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                >
                  {/* Red High Risk: Nutri-Grade sugar claim */}
                  <g onClick={() => setActivePreviewAnnotation('red')} className="cursor-pointer">
                    <rect
                      x="565"
                      y="655"
                      width="70"
                      height="50"
                      rx="4"
                      fill={activePreviewAnnotation === 'red' ? 'rgba(181, 61, 74, 0.35)' : 'rgba(181, 61, 74, 0.15)'}
                      stroke="#B53D4A"
                      strokeWidth={activePreviewAnnotation === 'red' ? '3' : '1.5'}
                    />
                    <circle cx="630" cy="655" r="4.5" fill="#B53D4A" />
                  </g>

                  {/* Amber Review Needed: Allergen declaration */}
                  <g onClick={() => setActivePreviewAnnotation('amber')} className="cursor-pointer">
                    <rect
                      x="380"
                      y="655"
                      width="100"
                      height="70"
                      rx="4"
                      fill={activePreviewAnnotation === 'amber' ? 'rgba(138, 100, 23, 0.35)' : 'rgba(138, 100, 23, 0.15)'}
                      stroke="#8A6417"
                      strokeWidth={activePreviewAnnotation === 'amber' ? '3' : '1.5'}
                      strokeDasharray="4 2"
                    />
                    <circle cx="475" cy="655" r="4.5" fill="#8A6417" />
                  </g>

                  {/* Green Verified: Net quantity 330ml */}
                  <g onClick={() => setActivePreviewAnnotation('green')} className="cursor-pointer">
                    <rect
                      x="570"
                      y="702"
                      width="65"
                      height="30"
                      rx="4"
                      fill={activePreviewAnnotation === 'green' ? 'rgba(40, 115, 74, 0.35)' : 'rgba(40, 115, 74, 0.15)'}
                      stroke="#28734A"
                      strokeWidth={activePreviewAnnotation === 'green' ? '3' : '1.5'}
                    />
                    <circle cx="630" cy="702" r="4.5" fill="#28734A" />
                  </g>
                </svg>
              </div>

              {/* Selected Finding Detail Card */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#FFFEFA]/95 border border-[#DFDACD] backdrop-blur-xs text-xs shadow-md transition-all">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentAnnotation.dotColor }}
                    />
                    <span className="font-bold font-mono text-[#26352D]">{currentAnnotation.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${currentAnnotation.statusClass}`}>
                      {currentAnnotation.severityLabel}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#858A80] font-mono">{currentAnnotation.rule}</span>
                </div>
                <p className="text-[#26352D] font-semibold text-xs truncate">{currentAnnotation.title}</p>
                <p className="text-[#68736A] text-[11px] mt-1 leading-snug">{currentAnnotation.remedy}</p>
              </div>
            </div>

            {/* Quick Annotation Selector Buttons */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-[#DFDACD] text-xs">
              <span className="text-[#858A80] text-[11px]">Select sample finding:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActivePreviewAnnotation('red')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activePreviewAnnotation === 'red'
                      ? 'bg-[#F8E6E8] text-[#B53D4A] border border-[#B53D4A]/40 font-semibold'
                      : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                  }`}
                >
                  Sugar Claim
                </button>
                <button
                  onClick={() => setActivePreviewAnnotation('amber')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activePreviewAnnotation === 'amber'
                      ? 'bg-[#FBF0D2] text-[#8A6417] border border-[#8A6417]/40 font-semibold'
                      : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                  }`}
                >
                  Allergens
                </button>
                <button
                  onClick={() => setActivePreviewAnnotation('green')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activePreviewAnnotation === 'green'
                      ? 'bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/40 font-semibold'
                      : 'text-[#68736A] hover:text-[#26352D] hover:bg-[#F1EEE4]'
                  }`}
                >
                  Net Volume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border Market Coverage Grid */}
      <section className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#477A58] mb-0.5">
              <Compass className="h-3.5 w-3.5" />
              <span>Target Consumer Markets</span>
            </div>
            <h2 className="text-xl font-bold text-[#26352D] tracking-tight">
              Cross-Border Regulatory Coverage
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#FFFEFA] text-[#26352D] border border-[#DFDACD]">
                SG
              </span>
              <span className="text-[10px] font-semibold text-[#28734A] bg-[#E5F3E8] px-1.5 py-0.2 rounded border border-[#28734A]/20">
                Verified SFA
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#26352D]">Singapore</h3>
              <p className="text-[11px] text-[#68736A] mt-1 leading-relaxed">
                Sale of Food Act, mandatory Nutri-Grade marks for sugar claims, and local importer address requirements.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#FFFEFA] text-[#26352D] border border-[#DFDACD]">
                JP
              </span>
              <span className="text-[10px] font-semibold text-[#68736A] bg-[#F1EEE4] px-1.5 py-0.2 rounded border border-[#DFDACD]">
                CAA Preview
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#26352D]">Japan</h3>
              <p className="text-[11px] text-[#68736A] mt-1 leading-relaxed">
                Consumer Affairs Agency Food Labeling Act, 8 mandatory allergens (walnut added), and standard typography.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#FFFEFA] text-[#26352D] border border-[#DFDACD]">
                IN
              </span>
              <span className="text-[10px] font-semibold text-[#68736A] bg-[#F1EEE4] px-1.5 py-0.2 rounded border border-[#DFDACD]">
                FSSAI Preview
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#26352D]">India</h3>
              <p className="text-[11px] text-[#68736A] mt-1 leading-relaxed">
                FSSAI Labelling Regulations 2020, Veg/Non-Veg green/brown dot logo symbols, and 14-digit license imprint.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#FFFEFA] text-[#26352D] border border-[#DFDACD]">
                VN
              </span>
              <span className="text-[10px] font-semibold text-[#68736A] bg-[#F1EEE4] px-1.5 py-0.2 rounded border border-[#DFDACD]">
                VFA Preview
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#26352D]">Vietnam</h3>
              <p className="text-[11px] text-[#68736A] mt-1 leading-relaxed">
                Decree 43/2017/ND-CP secondary auxiliary Vietnamese label mandates for imported commercial goods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Cases */}
      <section className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#26352D]">Sample Inspection Cases</h3>
          <p className="text-xs text-[#68736A] mt-0.5">Explore authentic pre-analyzed cross-border packaging assessments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {SCAN_HISTORY.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectReport(item)}
              className="p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] hover:border-[#C9C2B3] hover:bg-[#F1EEE4] cursor-pointer transition-all space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-[#FFFEFA] text-[#26352D] border border-[#DFDACD]">
                  {item.jurisdiction === 'Singapore' ? 'SG' : item.jurisdiction === 'India' ? 'IN' : 'JP'}
                </span>
                <span className="text-[11px] font-semibold text-[#B53D4A] bg-[#F8E6E8] px-2 py-0.5 rounded border border-[#B53D4A]/20">
                  {item.summary.highSeverityCount} Potential Issues
                </span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#26352D] truncate group-hover:text-[#477A58] transition-colors">
                  {item.assetName}
                </h4>
                <p className="text-xs text-[#68736A] mt-1 line-clamp-2 leading-relaxed">
                  {item.summary.executiveSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-[#DFDACD] flex items-center justify-between text-xs text-[#477A58] font-semibold">
                <span>Inspect Case</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
