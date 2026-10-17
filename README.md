# JurisLens - Visual Regulatory Compliance Intelligence Workspace

> **Google Cloud AI Builder Cup 2026 by Hack2skill**  
> **Theme:** Retail & Commerce: Intelligent Customer and Business Experiences  
> **Secondary Alignment:** Future of Work & Enterprise Productivity  
> *"See the risk. Find the rule. Fix it before you launch."*

---

## 1. Executive Summary & Problem Statement

Cross-border retail brands, consumer packaged goods (CPG) exporters, and food and beverage distributors entering Asian markets face complex, fragmented regulatory hurdles. Packaging labeling non-compliances (such as missing local importer addresses, non-compliant sugar marketing claims, or improper allergen typography) frequently lead to costly customs impoundments, mandatory re-labeling, or consignment rejection at border ports.

Traditional legal reviews take weeks and cost thousands of dollars per SKU. Generic AI chatbots hallucinate plausible-sounding legal sections that do not exist.

**JurisLens** solves this by delivering an interactive visual workspace:
1. **Multimodal Visual Inspection**: Scans packaging art and labels to extract text, regions, and spatial characteristics.
2. **Authoritative Statutory Retrieval**: Grounds every finding in real legislation from government authorities (Singapore Food Agency & Singapore Statutes Online).
3. **Synchronized SVG Overlays**: Pins clickable bounding boxes directly onto the asset coordinates with bidirectional UI focus.
4. **Actionable Remediation**: Generates ready-to-copy compliant wording and exportable audit briefs.

---

## 2. Google Cloud AI Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        JurisLens Client (React 19)                     │
│  · Interactive SVG Canvas with zoom/pan & zero coordinate drift        │
│  · Categorized statutory findings & copyable remediation wording       │
│  · Searchable regulatory evidence registry                             │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ POST /api/analyze (JSON / Base64)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   JurisLens Backend (Express / Node.js)                │
│  · Payload sanitization, rasterization & schema validation             │
│  · Server-side credential isolation (Zero API key leakage)             │
│  · Dual-confidence calculation & coordinate normalization [0.0 - 1.0]  │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌───────────────────────────────────┐  ┌─────────────────────────────────┐
│     Vertex AI Gemini 3.8 Flash    │  │   BigQuery Vector Search & DB   │
│  · Multimodal vision & text OCR   │  │  · SFA Food Regulations Cap 283 │
│  · Spatial bounding box detection │  │  · Nutri-Grade Grading Standards│
│  · Strict JSON Schema enforcement │  │  · Regional preview datasets    │
└───────────────────────────────────┘  └─────────────────────────────────┘
```

### Stage 1: Multimodal Visual Extraction (Vertex AI Gemini 3.8 Flash)
Processes image bytes directly on the server. Identifies mandatory label fields (nutrition panels, ingredients, importer details, net volume, allergen statements) and predicts normalized coordinates `[ymin, xmin, ymax, xmax]`.

### Stage 2: Statutory Vector Retrieval (BigQuery)
Matches visual observations against indexed statutory provisions using semantic similarity and strict jurisdiction filters.

### Stage 3: Cloud Run Orchestration
Hosts the containerized full-stack application, enforces rate limits, validates model output schemas, and provides sub-second precomputed flagship demonstration flows.

---

## 3. Flagship Demonstration Case: ZenBrew 330ml Bottled Beverage

The flagship interactive demo case evaluates **ZenBrew Organic Sparkling Botanicals** under verified Singapore Food Agency (SFA) regulations:

1. **JL-001 (High Risk / Potential Issue)**: *Missing Mandatory Nutri-Grade Mark for Sugar Claim*  
   - **Observed**: "ZERO ADDED SUGAR" promotional claim in nutrient panel.
   - **Statute**: SFA Food Regulations Regulation 184A & Nutri-Grade Measures for Prepacked Beverages.
   - **Remedy**: Affix official Nutri-Grade Mark (Grade B) and declare total sugar/100ml.

2. **JL-002 (High Risk / Potential Issue)**: *Missing Registered Singapore Importer & Local Street Address*  
   - **Observed**: Contact block only lists "London, UK" manufacturer.
   - **Statute**: Sale of Food Act (Cap. 283) Regulation 5(1)(b).
   - **Remedy**: Affix rear label auxiliary sticker with licensed Singapore importer UEN and physical street address.

3. **JL-003 (Medium Risk / Needs Review)**: *Allergen Advisory Typography & Cross-Contact Format*  
   - **Observed**: Allergen cross-contact note merged into botanical ingredients with estimated font height under 1.2mm.
   - **Statute**: SFA Regulation 5(4) Fourth Schedule (Mandatory 1.5mm capital height).
   - **Remedy**: Format into a dedicated standalone "ALLERGEN ADVISORY" line with >= 1.5mm font height.

4. **JL-004 (Informational / Compliant)**: *Metric Net Quantity Declaration Conformance*  
   - **Observed**: "NET VOLUME 330ml e" printed in metric millilitres with font height exceeding 3.0mm.
   - **Statute**: SFA Regulation 5(1)(c) / Weights and Measures Act.
   - **Remedy**: Compliant in inspected region.

---

## 4. Key Features & Interface Capabilities

- **Interactive SVG Canvas**: Precision coordinate overlay with mouse zoom (50% to 300%), drag-to-pan, 100% reset, and annotation visibility toggling.
- **Bidirectional Focus**: Clicking an SVG bounding box focuses and highlights the corresponding finding in the right drawer; clicking a finding card emphasizes the canvas bounding box.
- **Dual-Confidence Model**: Separates visual OCR extraction certainty from legal-statutory assessment confidence.
- **Searchable Statutory Knowledge Base**: Direct links to Singapore Statutes Online (`sso.agc.gov.sg`) and SFA guidance.
- **Regional Market Extensibility**: Extensible data architecture supporting Japan (CAA), India (FSSAI), and Vietnam (VFA), clearly tagged as preview datasets.
- **Audit Brief Generator**: 1-click Markdown copy and print-ready executive brief for compliance teams.

---

## 5. Local Development & Deployment

### Prerequisites
- Node.js 20+
- Google Cloud Gemini API key (optional for demo mode, required for custom live scans)

### Environment Setup
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Add your key:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### Run Locally
```bash
npm install
npm run dev
```
The server starts at `http://localhost:3000`.

### Run Test Suite
```bash
npm test
```
Validates coordinate bounding box geometry, statutory citation integrity, and regional dataset configurations.

### Build & Deploy to Google Cloud Run
```bash
# Build production bundle
npm run build

# Deploy to Cloud Run using gcloud CLI
gcloud run deploy jurislens \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="YOUR_KEY"
```

---

## 6. Regulatory Disclaimer

JurisLens is an AI-powered visual compliance intelligence workspace designed for risk identification, pre-screening, and operational workflow acceleration. Findings do not constitute formal legal counsel. For final commercial customs filings, consult licensed regional regulatory counsel or local import brokers.
