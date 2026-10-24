import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeUrl } from '../model.js';

test('normalizeUrl is syntax-only and still rejects non-http schemes', () => {
  assert.throws(() => normalizeUrl('javascript:alert(1)'));
  assert.throws(() => normalizeUrl('ftp://example.com'));
  assert.throws(() => normalizeUrl('localhost'));
  assert.equal(normalizeUrl('https://example.com/a?q=1#h'), 'https://example.com/a');
});

test('documented private and metadata hosts are accepted as syntax, not fetched', () => {
  // Current product does not crawl. These addresses are stored as context only.
  // A future server-side fetcher MUST reject them (see SECURITY_REMEDIATION_REPORT.md).
  assert.match(normalizeUrl('http://10.0.0.5:8080'), /^http:\/\/10\.0\.0\.5:8080\/$/);
  assert.match(normalizeUrl('http://169.254.169.254'), /^http:\/\/169\.254\.169\.254\/$/);
});
