import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Cloud,
  CheckCircle2,
  Workflow,
  Scale,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';

export const MethodologyArchitecture: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'vertex' | 'bigquery' | 'cloudrun'>('vertex');

  const stageDetails = {
    vertex: {
      title: 'Vertex AI Gemini 3.8 Flash',
      subtitle: 'Multimodal Visual Extraction & Regulatory Spatial Reasoning',
      techBadge: 'Live Implementation Active',
      description:
        'Processes raw packaging photography and PDF documents directly. Analyzes spatial layouts, extracts nutritional tables, reads bilingual declarations, and predicts normalized bounding coordinates [ymin, xmin, ymax, xmax] for every detected element.',
      specs: [
        'Model: gemini-3.8-flash via @google/genai TypeScript SDK',
        'Direct inline image base64 rasterization with zero image quality degradation',
        'Normalized bounding box predictions between 0.0 and 1.0',
        'Strict JSON Schema enforcement with zero hallucinated provision numbers',
      ],
    },
    bigquery: {
      title: 'BigQuery Vector Search & Knowledge Store',
      subtitle: 'Statutory Embeddings & Structured Regulatory Provisions',
      techBadge: 'Indexed Vector Dataset',
      description:
        'Maintains semantic representations of regional statutory provisions alongside structured metadata (issuing authority, provision number, effective date, and AGC statutory URL). Retrieves exact regulatory requirements corresponding to extracted product features.',
      specs: [
        'Indexed authoritative corpus: Singapore Food Regulations Cap 283, Rg 1',
        'Nutri-Grade Beverage Framework (Amended Dec 2023)',
        'Cosine vector similarity paired with exact jurisdiction filters',
        'Extensible schema for Japan (CAA), India (FSSAI), and Vietnam (VFA)',
      ],
    },
    cloudrun: {
      title: 'Google Cloud Run Orchestration',
      subtitle: 'Secure Containerized Backend & Vite Full-Stack API Gateway',
      techBadge: 'Server-Side Architecture',
      description:
        'Coordinates the full-stack pipeline on port 3000. Shields Google Cloud credentials from client browsers, validates uploaded file payloads, normalizes SVG coordinates, and delivers sub-second precomputed demonstration datasets.',
      specs: [
        'Secure Node.js / Express backend with Vite SSR middlewares',
        'Zero API key leakage: Gemini API called strictly server-side',
        'Robust multi-stage progress tracking and graceful credential alerts',
        'Stateless container execution with automated autoscaling on Cloud Run',
      ],
    },
  };

  const current = stageDetails[activeStage];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#477A58] mb-1">
          <Workflow className="h-4 w-4" />
          <span>Google Cloud AI Architecture & Methodology</span>
        </div>
        <h1 className="text-3xl font-bold text-[#26352D] tracking-tight">
          How JurisLens Works
        </h1>
        <p className="text-sm text-[#68736A] mt-1 max-w-2xl">
          A source-grounded multimodal visual intelligence pipeline designed for cross-border enterprise compliance across JAPAC.
        </p>
      </div>

      {/* Interactive 3-Stage Pipeline Diagram */}
      <section className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-base font-bold text-[#26352D]">Interactive Google Cloud System Flow</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Node 1: Vertex AI */}
          <button
            onClick={() => setActiveStage('vertex')}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeStage === 'vertex'
                ? 'bg-[#E5EFE5] border-[#477A58] ring-1 ring-[#477A58]'
                : 'bg-[#F7F5EE] border-[#DFDACD] hover:bg-[#F1EEE4]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-[#477A58]">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-[#477A58] font-semibold uppercase">Stage 01</span>
            </div>
            <h3 className="text-base font-bold text-[#26352D]">Vertex AI Gemini</h3>
            <p className="text-xs text-[#68736A] mt-1">Multimodal visual extraction & normalized spatial bounding</p>
          </button>

          {/* Node 2: BigQuery */}
          <button
            onClick={() => setActiveStage('bigquery')}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeStage === 'bigquery'
                ? 'bg-[#E5EFE5] border-[#477A58] ring-1 ring-[#477A58]'
                : 'bg-[#F7F5EE] border-[#DFDACD] hover:bg-[#F1EEE4]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-[#346C92]">
                <Database className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-[#346C92] font-semibold uppercase">Stage 02</span>
            </div>
            <h3 className="text-base font-bold text-[#26352D]">Statutory Knowledge Store</h3>
            <p className="text-xs text-[#68736A] mt-1">Vector retrieval against official Asian regulations</p>
          </button>

          {/* Node 3: Cloud Run */}
          <button
            onClick={() => setActiveStage('cloudrun')}
            className={`p-5 rounded-xl border text-left transition-all ${
              activeStage === 'cloudrun'
                ? 'bg-[#E5EFE5] border-[#477A58] ring-1 ring-[#477A58]'
                : 'bg-[#F7F5EE] border-[#DFDACD] hover:bg-[#F1EEE4]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#FFFEFA] border border-[#DFDACD] text-[#477A58]">
                <Cloud className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-[#477A58] font-semibold uppercase">Stage 03</span>
            </div>
            <h3 className="text-base font-bold text-[#26352D]">Cloud Run Full-Stack</h3>
            <p className="text-xs text-[#68736A] mt-1">Coordinate synchronization, audit brief export, and caching</p>
          </button>
        </div>

        {/* Selected Stage Deep Dive */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#F7F5EE] border border-[#DFDACD] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFDACD] pb-3">
            <div>
              <span className="text-xs font-mono font-semibold text-[#477A58] uppercase tracking-wider block">
                Architecture Deep Dive
              </span>
              <h3 className="text-lg font-bold text-[#26352D] mt-0.5">{current.title}</h3>
              <p className="text-xs text-[#68736A]">{current.subtitle}</p>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E5F3E8] text-[#28734A] border border-[#28734A]/20 self-start sm:self-center">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{current.techBadge}</span>
            </span>
          </div>

          <p className="text-sm text-[#26352D] leading-relaxed">{current.description}</p>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-[#26352D] uppercase tracking-wider block">
              Technical Specifications & Safeguards:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {current.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFEFA] border border-[#DFDACD] text-xs text-[#68736A]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#28734A] shrink-0 mt-0.5" />
                  <span className="text-[#26352D] leading-snug">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Principles */}
      <section className="rounded-2xl bg-[#FFFEFA] border border-[#DFDACD] p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#26352D] tracking-tight">Compliance Methodology & Principles</h2>
          <p className="text-xs sm:text-sm text-[#68736A] mt-1">
            How JurisLens delivers reliable, evidence-grounded compliance intelligence without fabricated statistics or misleading claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#26352D]">
              <ShieldCheck className="h-4 w-4 text-[#477A58]" />
              <span>Evidence Before Claims</span>
            </div>
            <p className="text-xs text-[#68736A] leading-relaxed">
              Every finding explicitly separates visible observations in the physical artwork, the potential regulatory risk, and the exact verified legal provision citation.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#26352D]">
              <Scale className="h-4 w-4 text-[#477A58]" />
              <span>Verified Legal Citations</span>
            </div>
            <p className="text-xs text-[#68736A] leading-relaxed">
              Legal requirements are linked to official Singapore Statutes Online and regional gazette URLs. No fabricated provisions, synthetic dates, or imaginary regulations.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#F7F5EE] border border-[#DFDACD]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#26352D]">
              <FileCheck2 className="h-4 w-4 text-[#477A58]" />
              <span>Region-Scoped Verdicts</span>
            </div>
            <p className="text-xs text-[#68736A] leading-relaxed">
              JurisLens identifies issues within the inspected image region only. It never claims full packaging certification or replaces registered Singapore legal counsel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
