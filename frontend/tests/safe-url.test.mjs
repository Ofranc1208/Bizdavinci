import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCaptureUrl, getCaptureAllowlist, isSafePublicHost } from '../server/safe-url.mjs';

test('allowlist fails closed when unset', async () => {
  const prev = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  delete process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  assert.deepEqual(getCaptureAllowlist(), []);
  await assert.rejects(() => validateCaptureUrl('https://example.com'), err => err.message === 'allowlist_not_configured');
  if (prev !== undefined) process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = prev;
});

test('blocks private hostnames without DNS', () => {
  assert.equal(isSafePublicHost('127.0.0.1'), false);
  assert.equal(isSafePublicHost('10.0.0.1'), false);
  assert.equal(isSafePublicHost('169.254.169.254'), false);
  assert.equal(isSafePublicHost('localhost'), false);
});

test('allowlist denies unlisted domains', async () => {
  const prev = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = 'example.com';
  await assert.rejects(() => validateCaptureUrl('https://www.wikipedia.org'), err => err.message === 'allowlist_denied');
  if (prev !== undefined) process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = prev;
  else delete process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
});

test('rejects literal private URL before fetch', async () => {
  const prev = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = 'example.com';
  await assert.rejects(() => validateCaptureUrl('http://127.0.0.1'), err => err.message === 'unsupported_url');
  if (prev !== undefined) process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = prev;
  else delete process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
});
