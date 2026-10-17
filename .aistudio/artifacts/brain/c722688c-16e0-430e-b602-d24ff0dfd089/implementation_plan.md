# JurisLens - Visual Regulatory Compliance Intelligence Workspace

JurisLens is a visual compliance intelligence platform for cross-border consumer brands and retail exporters entering Asian markets. It transforms physical packaging labels, PDFs, and product documents into source-grounded visual compliance reports featuring synchronized SVG coordinate overlays, verified statutory references (Singapore Food Agency & Singapore Statutes Online), and actionable remediation guidance.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and user experience decisions have been established based on your requirements and confirmed answers:
> 
> - **Flagship Demonstration Asset**: Bottled organic beverage ("ZenBrew Organic Sparkling Botanicals") featuring real Singapore prepacked food labeling challenges: Nutri-Grade sugar claim labeling compliance, undeclared sesame/allergen advisory format, net volume metric typography, and Singapore importer name/address display requirements.
> - **Live Scan Execution Mode**: Custom scans require active Google Cloud / Gemini API credentials. When credentials are not configured, the interface presents a clear, actionable configuration warning with setup guidance instead of fabricating or simulating analysis. The precomputed flagship demonstration remains accessible with one click at any time.
> - **Workspace Orientation**: Side-by-side split canvas (1440px desktop optimized) pairing a zoomable, pan-enabled SVG coordinate overlay with an interactive, categorized statutory findings inspection drawer.

---

## 1. Overview & Core Concept

- **Core Proposition**: *"See the risk. Find the rule. Fix it before you launch."*
- **Primary Audience**: Small-to-medium retail brands, cross-border food and beverage exporters, logistics brokers, and commercial compliance officers expanding into Singapore and JAPAC markets.
- **Problem Solved**: Cross-border consumer product compliance currently requires expensive, weeks-long legal reviews. Regulatory rejection at border customs (due to minor font sizing, missing importer declarations, or non-compliant nutrition/allergen claims) results in costly shipment impoundment and delayed go-to-market.
- **Hackathon Theme**: *Retail & Commerce: Intelligent Customer and Business Experiences*, with secondary alignment to *Enterprise Productivity & Future of Work*.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Discovery & Exploration (Overview / Landing)**:
   - Asymmetric two-column hero with enterprise typography, clear value proposition, and an interactive label preview with 3 clickable SVG annotations (High Issue, Review Needed, Verified Extraction).
   - Instant 1-click CTA: `Explore Live Demo` jumps directly to the populated workspace; `Analyze an Asset` opens the scan workspace.
2. **Scan Setup & Asset Ingestion (New Scan)**:
   - Drag-and-drop zone supporting PNG, JPEG, and PDF documents with file inspection, size validation, and page selection for multi-page assets.
   - Market selector: Singapore (verified SFA dataset active), with Japan (CAA/MHLW preview), India (FSSAI preview), and Vietnam (VFA preview) tagged with clear verification status.
   - Asset type selection: Food packaging & prepacked labels (active), business documents (active), facility layouts (marked roadmap).
   - "Load Flagship Sample Case" button for immediate zero-friction evaluation.
3. **Interactive Inspection Canvas (Analysis Results)**:
   - High-resolution packaging canvas with pan, zoom (50% to 300%), fit-to-view, and coordinate grid overlay.
   - Scalable vector annotations (SVG) matching exact normalized bounding boxes (`[ymin, xmin, ymax, xmax]`) with distinct semantic state treatments:
     - Rose (`#F43F5E`): High-risk statutory non-compliance.
     - Amber (`#FBBF24`): Review required / ambiguous visual evidence.
     - Emerald (`#10B981`): Verified extracted baseline requirement.
   - Synchronized bidirectional focus: Clicking an SVG box highlights the finding card in the right drawer; clicking a finding card pans/highlights the respective bounding box.
4. **Authoritative Evidence & Remediation Drawer**:
   - Severity badges, observed visual text, regulatory concern explanation, verified statute citation (e.g. *Singapore Sale of Food Act 1973, Food Regulations Part IV*), official government source URL, verified legal excerpt, and ready-to-copy compliant wording.
   - Separation of visual extraction confidence vs. legal assessment confidence.
   - Remediation checklist with "Mark Reviewed", "Copy Compliant Text", and "Export Full Audit Brief".
5. **Regulatory Sources Directory & Knowledge Base**:
   - Searchable, filterable repository of indexed statutory provisions (SFA Food Regulations, Singapore Statutes Online, Codex Alimentarius cross-references) with issuance dates, authoritative URLs, and verification hashes.
6. **Architecture & Methodology Transparency**:
   - Interactive 3-stage Google Cloud pipeline visualization (Gemini Multimodal Reasoning -> BigQuery Vector Retrieval -> Cloud Run Orchestration) detailing data flow, latency boundaries, and verified system constraints.

### Visual Identity & Theme

- **Design System Inspiration**: Linear's precision, Stripe's typographic craft, Apple's restrained depth, and professional legal intelligence consoles. Zero frivolous pill clutter, zero fake scoreboards, zero AI glow slop.
- **Color Palette**:
  - Main Workspace Canvas: `#090A0F`
  - Elevated Container Surfaces: `#11141C`
  - Secondary Inspection Panels: `#171B26`
  - Hairline Borders: `#282D3A`
  - Primary Text: `#F5F7FB`
  - Secondary Muted Text: `#A0A8B8`
  - Accent / Focus: Electric Sky (`#38BDF8`) & Indigo (`#818CF8`)
  - Status Indicators: Verified (`#10B981`), Needs Review (`#FBBF24`), High Risk (`#F43F5E`)
- **Typography**:
  - Display & Headlines: `Plus Jakarta Sans` / modern geometric sans.
  - Body & Form Controls: `DM Sans` / clean neo-grotesque.
  - Legal Provisions, Coordinates & Timestamps: `JetBrains Mono` with `tabular-nums`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Explicit Bounding Box Math with Normalized Coordinates**
  - *Chosen Approach*: Store visual coordinates as normalized percentages `[ymin, xmin, ymax, xmax]` ($0.0$ to $1.0$). SVG overlay renders viewBox matched to the natural dimensions of the uploaded image.
  - *Why*: Eliminates coordinate drift across window resizing, mobile responsiveness, and zoom/pan actions.
- **Decision 2: Authoritative Grounding vs. Open Hallucination**
  - *Chosen Approach*: Pre-indexed Singapore Food Regulations dataset (Sale of Food Act Chapter 283, Food Regulations 1973 Reg 5, Reg 6, Reg 7, Reg 8, Seventh Schedule for allergens, and Nutrition Labeling / Nutri-Grade Guidelines 2023). Gemini references these exact source IDs. If an observed issue has no verified statutory match, it is flagged as *"Requires Manual Regulatory Counsel"* rather than inventing citations.
  - *Why*: Essential for enterprise credibility in regulated compliance software.
- **Decision 3: Server-Side Gemini Execution via Express API**
  - *Chosen Approach*: Use Express backend integration with `@google/genai` on server side. Client dispatches image base64/form data to `/api/analyze`, keeping API keys strictly server-side and validating responses against a strict TypeScript schema.

---

## 4. Technical Architecture & Data Strategy

### Architecture & System Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        JurisLens Client (React 19)                     │
│                                                                        │
│  ┌───────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ Navigation & Routing  │  │ Interactive Inspection Workspace     │  │
│  │ · Overview / Landing  │  │ ┌──────────────────┬───────────────┐ │  │
│  │ · New Scan Studio     │  │ │ SVG Canvas Box   │ Findings List │ │  │
│  │ · Scan History        │  │ │ Pan / Zoom / Box │ Legal Sources │ │  │
│  │ · Regulatory Sources  │  │ │ Normalized Rect  │ Copy Solution │ │  │
│  │ · Architecture Specs  │  │ └──────────────────┴───────────────┘ │  │
│  └───────────────────────┘  └──────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ POST /api/analyze (Multipart/Base64)
                                     │ GET  /api/sources
                                     │ GET  /api/demo
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   JurisLens Backend (Express / Node.js)                │
│                                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │ Request Validator       │  │ Statutory Knowledge Base            │  │
│  │ · File type / size      │  │ · SFA Food Regulations (Reg 5-8)    │  │
│  │ · Image normalization   │  │ · SSO Cap 283 Allergen Provisions   │  │
│  │ · Strict JSON Schema    │  │ · Nutri-Grade Grading Standards     │  │
│  └────────────┬────────────┘  └──────────────────┬──────────────────┘  │
│               │                                  │                     │
│               ▼                                  ▼                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Multimodal Grounded Reasoning Pipeline                           │  │
│  │ 1. Visual Region & Text Extraction                               │  │
│  │ 2. Statutory Context Retrieval Matching                          │  │
│  │ 3. Structured Finding Generation with Bounding Boxes             │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│             Google Cloud AI Infrastructure (Target Production)         │
│  · Cloud Run: Containerized backend & Vite SSR asset hosting           │
│  · Vertex AI Gemini (gemini-3.8-flash): Multimodal vision & reasoning  │
│  · BigQuery Vector Search: Embeddings & statutory vector index         │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model Schema

```typescript
export type SeverityLevel = 'high' | 'medium' | 'informational';
export type FindingStatus = 'potential_issue' | 'needs_review' | 'verified_compliant';

export interface FindingGeometry {
  type: 'rectangle';
  ymin: number; // 0.0 - 1.0 (top)
  xmin: number; // 0.0 - 1.0 (left)
  ymax: number; // 0.0 - 1.0 (bottom)
  xmax: number; // 0.0 - 1.0 (right)
  label: string;
}

export interface RegulatorySource {
  id: string;
  jurisdiction: 'Singapore' | 'Japan' | 'India' | 'Vietnam';
  authority: string; // e.g. "Singapore Food Agency (SFA)"
  regulationTitle: string; // "Food Regulations (Cap. 283, Rg 1)"
  provision: string; // "Regulation 5(1)(c) - Net Quantity"
  sourceUrl: string;
  effectiveDate: string;
  verifiedExcerpt: string;
  status: 'verified' | 'preview_unverified';
}

export interface ComplianceFinding {
  id: string;
  category: 'label_information' | 'allergen_advisory' | 'nutri_grade_claim' | 'origin_and_importer' | 'date_marking';
  severity: SeverityLevel;
  status: FindingStatus;
  title: string;
  observation: string;
  explanation: string;
  source: RegulatorySource;
  confidence: {
    visualExtraction: number; // 0.0 - 1.0
    legalAssessment: number;  // 0.0 - 1.0
  };
  geometry: FindingGeometry;
  recommendation: string;
  suggestedWording?: string;
  reviewed?: boolean;
}

export interface ComplianceReport {
  id: string;
  assetName: string;
  assetType: 'food_label' | 'business_document';
  assetImageUrl: string;
  imageDimensions: { width: number; height: number };
  jurisdiction: string;
  analyzedAt: string;
  analysisMode: 'live_vertex_gemini' | 'precomputed_flagship_demo';
  summary: {
    totalFindings: number;
    highSeverityCount: number;
    mediumSeverityCount: number;
    infoCount: number;
    overallStatus: 'remediation_required' | 'requires_review' | 'potentially_compliant';
    executiveSummary: string;
    topActionItems: string[];
  };
  findings: ComplianceFinding[];
}
```

### Interactive Component & State Mapping

- `Navigation`: Manages current view state (`overview`, `scan`, `results`, `sources`, `architecture`, `methodology`).
- `InteractiveCanvas`: Renders image with SVG layer. Maintains zoom scale ($0.5\times$ to $3.0\times$), pan offset, hover state, active selection ID, and toggle for annotation visibility.
- `FindingsPanel`: Filters by severity (`all`, `high`, `medium`, `info`), expands finding details, handles "Mark Reviewed", triggers clipboard copy for suggested wording, and synchronizes selection back to the canvas.
- `ScanUploadStudio`: Handles file drop, file preview, PDF page rendering, sample preset loading, and analysis submission with multi-stage progress indicator:
  1. Reading uploaded asset (0% - 20%)
  2. Extracting text and visual regions (20% - 45%)
  3. Querying statutory database (45% - 70%)
  4. Evaluating regulatory findings (70% - 90%)
  5. Generating interactive report (90% - 100%)
- `SourcesRegistry`: Real-time text search and jurisdiction filter across statutory records.
- `ArchitectureModal / Section`: Interactive flow diagram with clickable nodes explaining Google Cloud Run, Vertex AI Gemini, and BigQuery vector retrieval.

---

## 5. Verification & Testing Plan

1. **Compilation & Build**: `npm run build` and `tsc --noEmit` validation.
2. **Interactive Demo Flow Acceptance**:
   - Judge clicks "Explore Live Demo" -> preloaded "ZenBrew Sparkling Botanicals" opens immediately.
   - All 4 SVG bounding boxes match bottle packaging regions (Nutri-Grade sugar claim, Sesame allergen statement, Importer address, Net volume).
   - Clicking an SVG bounding box focuses the finding card and highlights statutory text.
   - Clicking "Copy Suggested Wording" triggers a toast notification with the exact compliant text.
3. **Live Scan & Error Handling Acceptance**:
   - Custom file upload with missing `GEMINI_API_KEY` displays an informative, non-crashing banner instructing how to configure credentials in `.env` / AI Studio Secrets.
   - Custom file upload with valid key sends base64 to `/api/analyze` and parses structured output into interactive canvas findings.
   - Unsupported file types or oversized files trigger clean validation error toasts.
