import { validateCaptureUrl } from './safe-url.mjs';

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 2 * 1024 * 1024;
const MAX_REDIRECTS = 5;

async function fetchOnce(href) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(href, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'BizDaVinci-Capture/1.0 (local preview)',
      },
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function readLimitedBody(response) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('unreachable');
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) throw new Error('unreachable');
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(out);
}

/**
 * Fetch HTML from a URL already passing validateCaptureUrl.
 * Re-validates every redirect hop against the allowlist and public-IP checks.
 */
export async function fetchHtml(startUrl) {
  let href = startUrl;
  for (let hops = 0; hops <= MAX_REDIRECTS; hops++) {
    const validated = await validateCaptureUrl(href);
    let response;
    try {
      response = await fetchOnce(validated.href);
    } catch (error) {
      if (String(error?.name) === 'AbortError') throw new Error('timeout');
      throw new Error('unreachable');
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new Error('unreachable');
      href = new URL(location, validated.href).href;
      continue;
    }

    if (!response.ok) throw new Error('unreachable');
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      throw new Error('unreachable');
    }
    const html = await readLimitedBody(response);
    return { href: validated.href, html };
  }
  throw new Error('unreachable');
}
