import React, { useState } from 'react';
import { Scale, Search, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { STATUTORY_SOURCES, JURISDICTIONS } from '../data/statutoryDatabase';

export const SourcesRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');

  const filteredSources = STATUTORY_SOURCES.filter((source) => {
    const matchesJurisdiction =
      selectedJurisdiction === 'all' ||
      source.jurisdiction.toLowerCase() === selectedJurisdiction.toLowerCase();

    const matchesSearch =
      source.regulationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.provision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.verifiedExcerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesJurisdiction && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#477A58] mb-1">
          <Scale className="h-4 w-4" />
          <span>Statutory Knowledge Base & Evidence Index</span>
        </div>
        <h1 className="text-3xl font-bold text-[#26352D] tracking-tight">
          Authoritative Regulatory Sources
        </h1>
        <p className="text-sm text-[#68736A] mt-1 max-w-2xl">
          JurisLens grounds all compliance evaluations in verified statutory records from official Asian regulatory authorities and statutes online databases.
        </p>
      </div>

      {/* Jurisdiction Status Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {JURISDICTIONS.map((j) => (
          <div
            key={j.id}
            onClick={() => setSelectedJurisdiction(selectedJurisdiction === j.id ? 'all' : j.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedJurisdiction === j.id
                ? 'bg-[#E5EFE5] border-[#477A58] text-[#26352D] ring-1 ring-[#477A58]'
                : 'bg-[#FFFEFA] border-[#DFDACD] text-[#68736A] hover:bg-[#F1EEE4] hover:border-[#C9C2B3]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#F1EEE4] text-[#26352D] border border-[#DFDACD]">
                {j.code}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  j.status === 'verified'
                    ? 'bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20'
                    : 'bg-[#F1EEE4] text-[#68736A] border border-[#DFDACD]'
                }`}
              >
                {j.status === 'verified' ? 'Verified Dataset' : 'Preview Dataset'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#26352D]">{j.name}</h3>
            <p className="text-[11px] text-[#68736A] mt-1 line-clamp-2">{j.coverageDescription}</p>
            <div className="mt-3 pt-2 border-t border-[#DFDACD] text-[10px] flex items-center justify-between text-[#858A80]">
              <span className="truncate max-w-[130px]">{j.authority}</span>
              <span className="font-mono text-[#477A58] font-semibold">{j.activeRegulationsCount} provisions</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FFFEFA] border border-[#DFDACD]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#858A80]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search regulations by keyword, provision, or authority..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-xs text-[#26352D] placeholder-[#858A80]/70 focus:outline-none focus:border-[#477A58]"
          />
        </div>

        {/* Jurisdiction Quick Tabs */}
        <div className="flex items-center gap-1 bg-[#F1EEE4] p-0.5 rounded-lg border border-[#DFDACD] overflow-x-auto">
          {['all', 'Singapore', 'Japan', 'India', 'Vietnam'].map((j) => (
            <button
              key={j}
              onClick={() => setSelectedJurisdiction(j)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedJurisdiction === j
                  ? 'bg-[#FFFEFA] text-[#26352D] font-semibold shadow-2xs'
                  : 'text-[#68736A] hover:text-[#26352D]'
              }`}
            >
              {j === 'all' ? 'All Jurisdictions' : j}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-5 sm:p-6 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#F1EEE4] text-[#26352D] border border-[#DFDACD]">
                    {source.jurisdiction}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      source.jurisdiction === 'Singapore'
                        ? 'bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20'
                        : 'bg-[#F1EEE4] text-[#68736A]'
                    }`}
                  >
                    {source.jurisdiction === 'Singapore' ? 'Verified Source' : 'Preview Dataset'}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#858A80]">{source.id}</span>
              </div>

              {/* Provision Title & Parent Act */}
              <h2 className="text-base font-bold text-[#26352D] leading-snug">{source.provision}</h2>
              <p className="text-xs text-[#68736A] mt-1 font-medium">{source.regulationTitle}</p>

              {/* Verified Statutory Excerpt */}
              <div className="mt-3 p-3 rounded-xl bg-[#F7F5EE] border-l-3 border-[#477A58] text-xs text-[#68736A] italic leading-relaxed">
                "{source.verifiedExcerpt}"
              </div>
            </div>

            {/* Footer metadata & Official Link */}
            <div className="pt-3 border-t border-[#DFDACD] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#858A80] text-[11px]">
                <Calendar className="h-3.5 w-3.5 text-[#858A80]" />
                <span>Effective: {source.effectiveDate}</span>
              </div>

              <a
                href={source.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#477A58] hover:text-[#386849] font-semibold transition-colors"
                title="View official statutory text on government legislation portal"
              >
                <span>Official Source</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-12 rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-8 text-xs text-[#858A80]">
          No statutory provisions match your search query.
        </div>
      )}
    </div>
  );
};
