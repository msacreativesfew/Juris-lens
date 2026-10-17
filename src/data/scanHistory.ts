import { ComplianceReport } from '../types/compliance';
import { FLAGSHIP_DEMO_REPORT } from './flagshipDemo';
import { STATUTORY_SOURCES } from './statutoryDatabase';

export const SCAN_HISTORY: ComplianceReport[] = [
  FLAGSHIP_DEMO_REPORT,
  {
    id: 'JL-IN-2026-HAZELNUT',
    assetName: 'Hazelnut_Cocoa_Spread_350g_Jar.jpg',
    assetType: 'food_label',
    assetImageUrl: '/src/assets/images/retail_compliance_desk_1791913350717.jpg',
    imageDimensions: { width: 1200, height: 900 },
    jurisdiction: 'India',
    analyzedAt: '2026-10-14T03:15:00Z',
    analysisMode: 'live_vertex_gemini',
    summary: {
      totalFindings: 3,
      highSeverityCount: 2,
      mediumSeverityCount: 1,
      infoCount: 0,
      overallStatus: 'remediation_required',
      executiveSummary:
        'FSSAI regulatory evaluation for imported Hazelnut Cocoa Spread 350g: The product requires mandatory front-of-pack green vegetarian logo display and the 14-digit FSSAI importer license number prior to distribution.',
      topActionItems: [
        'Affix mandatory Vegetarian Green Circle / Square logo (FSSAI Reg 5(4)).',
        'Display the 14-digit FSSAI License Number of the Indian registered importer.',
        'Format added sugars in the nutrition table per 100g on a dedicated line.',
      ],
    },
    findings: [
      {
        id: 'JL-IN-001',
        category: 'product_identity',
        severity: 'high',
        status: 'potential_issue',
        title: 'Missing Mandatory Vegetarian / Non-Vegetarian Logo Symbol',
        observation:
          'No green filled circle within a square (Vegetarian) or brown triangle within a square (Non-Vegetarian) was detected on the front panel.',
        explanation:
          'FSSAI (Labelling and Display) Regulations 2020 Regulation 5(4) mandates that all prepacked food sold in India must display the approved Veg/Non-Veg symbol in close proximity to the brand name.',
        source: STATUTORY_SOURCES.find((s) => s.id === 'IN-FSSAI-VEG-2020')!,
        confidence: { visualExtraction: 0.94, legalAssessment: 0.96 },
        geometry: { type: 'rectangle', ymin: 0.25, xmin: 0.2, ymax: 0.45, xmax: 0.45, label: 'Missing FSSAI Veg Symbol' },
        recommendation:
          'Affix the standard green vegetarian logo (minimum 6mm diameter for containers up to 500g) on the front-of-pack display panel.',
        suggestedWording: '[Green Dot in Square Logo] 100% Vegetarian',
        reviewed: false,
      },
      {
        id: 'JL-IN-002',
        category: 'origin_and_importer',
        severity: 'high',
        status: 'potential_issue',
        title: 'Missing 14-Digit FSSAI Importer License Number',
        observation:
          'Packaging displays European distributor address but lacks the 14-digit FSSAI license number and registered Indian importer name.',
        explanation:
          'Section 31 of Food Safety and Standards Act 2006 requires all imported food consignments to display the license number of the authorized Indian importer preceded by the FSSAI logo.',
        source: {
          id: 'IN-FSSAI-LIC-2020',
          jurisdiction: 'India',
          authority: 'Food Safety and Standards Authority of India (FSSAI)',
          regulationTitle: 'FSSAI Licensing and Registration of Food Businesses Regulations',
          provision: 'Regulation 2.1 - License Display Requirement',
          sourceUrl: 'https://www.fssai.gov.in/',
          effectiveDate: 'Current Edition',
          verifiedExcerpt:
            'The Food Business Operator shall ensure that the 14-digit FSSAI License Number and logo are displayed on the label of the prepackaged food in contrasting colour.',
          status: 'preview_unverified',
        },
        confidence: { visualExtraction: 0.92, legalAssessment: 0.95 },
        geometry: { type: 'rectangle', ymin: 0.55, xmin: 0.15, ymax: 0.75, xmax: 0.6, label: 'Missing FSSAI License' },
        recommendation:
          'Add authorized Indian importer name, physical address, customer care contact, and 14-digit FSSAI license number via over-sticker label.',
        suggestedWording:
          'Marketed & Distributed in India by: Global Brands India Pvt Ltd. FSSAI Lic. No: 10018022007890. Consumer Care: care@globalbrands.in',
        reviewed: false,
      },
      {
        id: 'JL-IN-003',
        category: 'nutri_grade_claim',
        severity: 'medium',
        status: 'needs_review',
        title: 'Added Sugar & Nutritional Table per 100g Declaration',
        observation:
          'Nutritional breakdown is visible, but added sugars declaration format must be audited against FSSAI 2020 metrics.',
        explanation:
          'FSSAI mandates nutritional info to clearly state energy (kcal), protein (g), carbohydrate (g), total sugars (g), added sugars (g), total fat (g), and sodium (mg) per 100g or 100ml.',
        source: {
          id: 'IN-FSSAI-NUTRI-2020',
          jurisdiction: 'India',
          authority: 'Food Safety and Standards Authority of India (FSSAI)',
          regulationTitle: 'FSSAI (Labelling and Display) Regulations 2020',
          provision: 'Regulation 5(2) - Nutritional Information Requirements',
          sourceUrl: 'https://www.fssai.gov.in/',
          effectiveDate: 'July 2022',
          verifiedExcerpt:
            'Nutritional information shall specify the amount of added sugars, saturated fats, trans fats and sodium per 100g or per 100ml and per single serving.',
          status: 'preview_unverified',
        },
        confidence: { visualExtraction: 0.88, legalAssessment: 0.9 },
        geometry: { type: 'rectangle', ymin: 0.4, xmin: 0.45, ymax: 0.65, xmax: 0.85, label: 'Nutrition Panel Review' },
        recommendation:
          'Ensure nutritional values explicitly list Added Sugars on a dedicated line directly under Total Carbohydrates.',
        suggestedWording: 'Carbohydrate: 57.5g, of which Total Sugars: 56.3g, Added Sugars: 50.0g',
        reviewed: false,
      },
    ],
  },
  {
    id: 'JL-JP-2026-MATCHA',
    assetName: 'Artisan_Matcha_Extract_Can_250ml.jpg',
    assetType: 'food_label',
    assetImageUrl: '/src/assets/images/retail_compliance_desk_1791913350717.jpg',
    imageDimensions: { width: 1200, height: 900 },
    jurisdiction: 'Japan',
    analyzedAt: '2026-10-13T18:40:00Z',
    analysisMode: 'live_vertex_gemini',
    summary: {
      totalFindings: 2,
      highSeverityCount: 0,
      mediumSeverityCount: 2,
      infoCount: 0,
      overallStatus: 'requires_review',
      executiveSummary:
        'Consumer Affairs Agency (CAA) preview review for Artisan Matcha Extract: Label complies with primary naming rules but requires validation of secondary Japanese language nutritional translation.',
      topActionItems: [
        'Affix Japanese supplementary label with mandatory 8-allergen declaration format (CAA Act No. 70).',
        'Verify per-serving energy, protein, fat, carbohydrate, and salt equivalent values.',
      ],
    },
    findings: [
      {
        id: 'JL-JP-001',
        category: 'allergen_advisory',
        severity: 'medium',
        status: 'needs_review',
        title: 'Mandatory Allergen Declaration Format Compliance',
        observation:
          'English allergen notice lists tree nuts. Japan CAA specifies 8 mandatory raw materials including walnuts (added 2023).',
        explanation:
          'Under the Japan Food Labeling Act, allergens must be indicated in brackets directly following the raw material name or as a collective declaration at the end of the ingredient list in Japanese.',
        source: STATUTORY_SOURCES.find((s) => s.id === 'JP-CAA-ALLERGEN-2023')!,
        confidence: { visualExtraction: 0.91, legalAssessment: 0.88 },
        geometry: { type: 'rectangle', ymin: 0.35, xmin: 0.2, ymax: 0.55, xmax: 0.55, label: 'CAA Allergen Review' },
        recommendation:
          'Prepare secondary Japanese label listing all specific raw materials using standard CAA terminology.',
        suggestedWording: '原材料名：緑茶（国産）、ビタミンC／アレルゲン：特定原材料に該当するものなし',
        reviewed: true,
      },
      {
        id: 'JL-JP-002',
        category: 'net_quantity',
        severity: 'medium',
        status: 'needs_review',
        title: 'Metric Net Contents & Japanese Date Format',
        observation:
          'Date format on can base is printed as DD/MM/YYYY. Standard Japanese retail convention expects YYYY.MM.DD or YYYY年MM月DD日.',
        explanation:
          'Cabinet Office Ordinance No. 10 recommends YYYY.MM.DD date marking format to prevent consumer misinterpretation of expiry dates.',
        source: {
          id: 'JP-CAA-DATE-2020',
          jurisdiction: 'Japan',
          authority: 'Consumer Affairs Agency (CAA)',
          regulationTitle: 'Food Labeling Standards Cabinet Office Ordinance No. 10',
          provision: 'Article 3(1) - Expiration Date Format',
          sourceUrl: 'https://www.caa.go.jp/en/policy/food_labeling/',
          effectiveDate: 'Current Edition',
          verifiedExcerpt:
            'Expiration date or best-before date should be marked in the order of year, month, and day, or year and month.',
          status: 'preview_unverified',
        },
        confidence: { visualExtraction: 0.95, legalAssessment: 0.89 },
        geometry: { type: 'rectangle', ymin: 0.7, xmin: 0.3, ymax: 0.88, xmax: 0.7, label: 'Expiry Date Format' },
        recommendation:
          'Ensure Japanese auxiliary label clearly states the best-before date in YYYY.MM.DD format.',
        suggestedWording: '賞味期限：2027.10.31',
        reviewed: false,
      },
    ],
  },
];
