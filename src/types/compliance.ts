export type SeverityLevel = 'high' | 'medium' | 'informational';
export type FindingStatus = 'potential_issue' | 'needs_review' | 'verified_compliant';

export interface FindingGeometry {
  type: 'rectangle';
  ymin: number; // 0.0 - 1.0 (top percentage)
  xmin: number; // 0.0 - 1.0 (left percentage)
  ymax: number; // 0.0 - 1.0 (bottom percentage)
  xmax: number; // 0.0 - 1.0 (right percentage)
  label: string;
}

export interface RegulatorySource {
  id: string;
  jurisdiction: 'Singapore' | 'Japan' | 'India' | 'Vietnam';
  authority: string; // e.g. "Singapore Food Agency (SFA)"
  regulationTitle: string; // "Food Regulations (Cap. 283, Rg 1)"
  provision: string; // "Regulation 5(1)(b) - Local Importer Details"
  sourceUrl: string;
  effectiveDate: string;
  verifiedExcerpt: string;
  status: 'verified' | 'preview_unverified';
}

export interface ComplianceFinding {
  id: string;
  category: 'nutri_grade_claim' | 'allergen_advisory' | 'origin_and_importer' | 'net_quantity' | 'product_identity' | 'date_marking';
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
  jurisdiction: 'Singapore' | 'Japan' | 'India' | 'Vietnam';
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

export interface JurisdictionOption {
  id: 'Singapore' | 'Japan' | 'India' | 'Vietnam';
  code: 'SG' | 'JP' | 'IN' | 'VN';
  name: string;
  authority: string;
  status: 'verified' | 'preview';
  coverageDescription: string;
  activeRegulationsCount: number;
}
