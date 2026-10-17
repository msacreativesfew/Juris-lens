import { describe, it } from 'node:test';
import assert from 'node:assert';
import { FLAGSHIP_DEMO_REPORT } from '../src/data/flagshipDemo.ts';
import { STATUTORY_SOURCES, JURISDICTIONS } from '../src/data/statutoryDatabase.ts';

describe('JurisLens Compliance Data Models & Coordinates', () => {
  it('should validate normalized coordinate geometry bounds for all flagship findings', () => {
    assert.strictEqual(FLAGSHIP_DEMO_REPORT.findings.length > 0, true);

    for (const finding of FLAGSHIP_DEMO_REPORT.findings) {
      const { geometry } = finding;
      assert.strictEqual(geometry.type, 'rectangle');
      assert.ok(geometry.ymin >= 0 && geometry.ymin <= 1.0, `ymin out of bounds for ${finding.id}`);
      assert.ok(geometry.xmin >= 0 && geometry.xmin <= 1.0, `xmin out of bounds for ${finding.id}`);
      assert.ok(geometry.ymax >= 0 && geometry.ymax <= 1.0, `ymax out of bounds for ${finding.id}`);
      assert.ok(geometry.xmax >= 0 && geometry.xmax <= 1.0, `xmax out of bounds for ${finding.id}`);
      assert.ok(geometry.ymin < geometry.ymax, `ymin must be less than ymax for ${finding.id}`);
      assert.ok(geometry.xmin < geometry.xmax, `xmin must be less than xmax for ${finding.id}`);
    }
  });

  it('should maintain verified statutory sources for Singapore market', () => {
    const sgSources = STATUTORY_SOURCES.filter((s) => s.jurisdiction === 'Singapore');
    assert.ok(sgSources.length >= 5, 'Must have at least 5 verified Singapore provisions');

    for (const source of sgSources) {
      assert.strictEqual(source.status, 'verified');
      assert.ok(source.sourceUrl.startsWith('https://sso.agc.gov.sg/'), 'URL must point to Singapore Statutes Online');
      assert.ok(source.verifiedExcerpt.length > 20, 'Excerpt must contain authentic statutory text');
    }
  });

  it('should isolate visual extraction confidence from legal assessment confidence', () => {
    for (const finding of FLAGSHIP_DEMO_REPORT.findings) {
      const { confidence } = finding;
      assert.ok(typeof confidence.visualExtraction === 'number');
      assert.ok(typeof confidence.legalAssessment === 'number');
      assert.ok(confidence.visualExtraction >= 0 && confidence.visualExtraction <= 1);
      assert.ok(confidence.legalAssessment >= 0 && confidence.legalAssessment <= 1);
    }
  });

  it('should maintain extensible regional markets labeled as preview', () => {
    const previewMarkets = JURISDICTIONS.filter((j) => j.status === 'preview');
    assert.ok(previewMarkets.length >= 3, 'Must support Japan, India, and Vietnam previews');
    assert.ok(previewMarkets.some((m) => m.name === 'Japan'));
    assert.ok(previewMarkets.some((m) => m.name === 'India'));
    assert.ok(previewMarkets.some((m) => m.name === 'Vietnam'));
  });
});
