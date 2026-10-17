import { ComplianceReport } from '../types/compliance';
import { STATUTORY_SOURCES } from './statutoryDatabase';

const bottleImageUrl = '/src/assets/images/zenbrew_bottle_label_1791913351086.jpg';

export const FLAGSHIP_DEMO_REPORT: ComplianceReport = {
  id: 'JL-SG-2026-ZENBREW',
  assetName: 'ZenBrew_Sparkling_Botanicals_330ml_Label.jpg',
  assetType: 'food_label',
  assetImageUrl: bottleImageUrl,
  imageDimensions: {
    width: 896,
    height: 1152,
  },
  jurisdiction: 'Singapore',
  analyzedAt: '2026-10-13T10:35:00Z',
  analysisMode: 'precomputed_flagship_demo',
  summary: {
    totalFindings: 4,
    highSeverityCount: 2,
    mediumSeverityCount: 1,
    infoCount: 1,
    overallStatus: 'remediation_required',
    executiveSummary:
      'Inspection of ZenBrew Organic Sparkling Botanicals identifies 2 high-priority statutory non-compliances under Singapore Food Regulations (missing Nutri-Grade Mark for sugar claim and absence of a local Singapore importer address) plus 1 allergen formatting review item. Rectification is required prior to commercial customs clearance.',
    topActionItems: [
      'Affix Singapore registered importer name & physical business address sticker (SFA Reg 5(1)(b)).',
      'Integrate the mandatory Nutri-Grade grading mark and 100ml sugar/fat panel due to the "Zero Added Sugar" marketing claim (SFA Reg 184A).',
      'Increase allergen advisory font height to >= 1.5mm and format precautionary statement as a standalone warning (SFA Reg 5(4)).',
    ],
  },
  findings: [
    {
      id: 'JL-001',
      category: 'nutri_grade_claim',
      severity: 'high',
      status: 'potential_issue',
      title: 'Missing Mandatory Nutri-Grade Mark for Sugar Claim',
      observation:
        'Observed prominent marketing claim "ZERO ADDED SUGAR" in the upper-right section of the nutrient panel. No Nutri-Grade Mark (Grade A/B/C/D) or per-100ml sugar breakdown is present.',
      explanation:
        'Under Singapore Food Regulations 1973 (Regulation 184A) and SFA Nutri-Grade guidelines, any prepacked beverage sold in Singapore carrying a sugar or nutrition claim MUST display an approved Nutri-Grade Mark and an accompanying Nutrition Information Panel (NIP) stating total sugar per 100ml.',
      source: STATUTORY_SOURCES.find((s) => s.id === 'SG-SFA-REG184A-NUTRI')!,
      confidence: {
        visualExtraction: 0.96,
        legalAssessment: 0.94,
      },
      geometry: {
        type: 'rectangle',
        ymin: 0.655,
        xmin: 0.565,
        ymax: 0.705,
        xmax: 0.635,
        label: 'Sugar Claim / Missing Nutri-Grade',
      },
      recommendation:
        'Submit formulation data to SFA for official Nutri-Grade rating. Print the Nutri-Grade Mark (minimum 20mm x 25mm) on the principal display panel and include total sugar per 100ml in the NIP.',
      suggestedWording:
        'Nutri-Grade: B | Sugar: 4.2g/100ml | Saturated Fat: 0.0g/100ml [Affix Official Grade B Vector Mark]',
      reviewed: false,
    },
    {
      id: 'JL-002',
      category: 'origin_and_importer',
      severity: 'high',
      status: 'potential_issue',
      title: 'Missing Registered Singapore Importer & Local Street Address',
      observation:
        'Contact imprint only reads "Bottled for: ZenBrew Se., London, UK" followed by a UK web address. No Singapore corporate entity, postal code, or local contact details are provided.',
      explanation:
        'The Sale of Food Act (Cap. 283) Food Regulations Regulation 5(1)(b) mandates that every prepacked food item imported into Singapore must prominently state the name and physical address of the registered Singapore manufacturer, importer, or local distributor. Overseas addresses alone violate import clearance rules.',
      source: STATUTORY_SOURCES.find((s) => s.id === 'SG-SFA-REG5-1B-IMPORTER')!,
      confidence: {
        visualExtraction: 0.98,
        legalAssessment: 0.99,
      },
      geometry: {
        type: 'rectangle',
        ymin: 0.730,
        xmin: 0.470,
        ymax: 0.772,
        xmax: 0.635,
        label: 'Missing SG Importer Address',
      },
      recommendation:
        'Add the authorized Singapore importer or distributor name and physical street address. An auxiliary sticker label on the rear of the bottle is acceptable for imported shipments.',
      suggestedWording:
        'Imported & Distributed in Singapore by: ZenBrew Asia Pacific Pte. Ltd., 18 Robinson Road #14-02, Singapore 048547. Tel: +65 6789 0123.',
      reviewed: false,
    },
    {
      id: 'JL-003',
      category: 'allergen_advisory',
      severity: 'medium',
      status: 'needs_review',
      title: 'Allergen Advisory Typography & Cross-Contact Format',
      observation:
        'Extracted ingredient list features botanicals with facility allergen text. Estimated uppercase font height is approximately 1.1mm (below the 1.5mm threshold), and cross-contact notice is merged with general ingredients.',
      explanation:
        'SFA Regulation 5(4) and Fourth Schedule enforce that mandatory allergens and precautionary cross-contact statements must be printed in distinct characters not less than 1.5mm in height. Ambiguous integration with botanical extracts creates regulatory scrutiny.',
      source: STATUTORY_SOURCES.find((s) => s.id === 'SG-SFA-REG5-4-ALLERGEN')!,
      confidence: {
        visualExtraction: 0.88,
        legalAssessment: 0.85,
      },
      geometry: {
        type: 'rectangle',
        ymin: 0.655,
        xmin: 0.380,
        ymax: 0.725,
        xmax: 0.480,
        label: 'Allergen Advisory Formatting',
      },
      recommendation:
        'Enlarge lettering to at least 1.5mm capital letter height. Bold all known allergens in the ingredient list and format the cross-contact notice into a distinct line prefaced by "ALLERGEN ADVISORY:".',
      suggestedWording:
        'ALLERGEN ADVISORY: Contains Soy. May contain traces of Sesame Seeds and Tree Nuts due to shared processing facility equipment.',
      reviewed: false,
    },
    {
      id: 'JL-004',
      category: 'net_quantity',
      severity: 'informational',
      status: 'verified_compliant',
      title: 'Metric Net Volume Declaration Conformance',
      observation:
        'Extracted statement "NET VOLUME 330ml e" declares contents in metric millilitres (ml) with uppercase lettering exceeding 3.0mm in height.',
      explanation:
        'The statement strictly conforms with SFA Regulation 5(1)(c) and Singapore Weights and Measures requirements, which dictate metric declaration and minimum 3.0mm letter height for containers over 120ml.',
      source: STATUTORY_SOURCES.find((s) => s.id === 'SG-SFA-REG5-1C-NETQTY')!,
      confidence: {
        visualExtraction: 0.95,
        legalAssessment: 0.97,
      },
      geometry: {
        type: 'rectangle',
        ymin: 0.702,
        xmin: 0.570,
        ymax: 0.732,
        xmax: 0.635,
        label: 'Net Quantity Conformance (330ml)',
      },
      recommendation:
        'No corrective action required for this region. Maintain current font height and metric abbreviation formatting across subsequent production batches.',
      suggestedWording: 'NET VOLUME: 330 mL',
      reviewed: true,
    },
  ],
};
