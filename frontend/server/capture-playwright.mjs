import { isSafePublicHost } from './safe-url.mjs';

const CAPTURE_TIMEOUT_MS = 20_000;

function sameSiteHost(requestHost, allowedHostname) {
  const req = requestHost.toLowerCase().replace(/\.$/, '');
  const allowed = allowedHostname.toLowerCase().replace(/\.$/, '');
  if (req === allowed) return true;
  const base = allowed.replace(/^www\./, '');
  return req === base || req.endsWith('.' + base) || req === 'www.' + base;
}

function requestAllowed(urlString, allowedHostname) {
  try {
    const parsed = new URL(urlString);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    if (!isSafePublicHost(parsed.hostname)) return false;
    return sameSiteHost(parsed.hostname, allowedHostname);
  } catch {
    return false;
  }
}

/**
 * @param {string} url validated URL
 * @param {{ hostname: string }} meta from validateCaptureUrl
 */
export async function captureHomepageScreenshot(url, meta) {
  const allowedHostname = meta.hostname;
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--no-first-run', '--no-default-browser-check'],
  });
  let context;
  try {
    context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      serviceWorkers: 'block',
      acceptDownloads: false,
      ignoreHTTPSErrors: false,
      javaScriptEnabled: true,
    });

    await context.route('**/*', route => {
      const req = route.request();
      if (req.resourceType() === 'websocket') return route.abort();
      if (!requestAllowed(req.url(), allowedHostname)) return route.abort();
      return route.continue();
    });

    const page = await context.newPage();
    page.on('download', download => download.cancel().catch(() => {}));

    let response;
    try {
      response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: CAPTURE_TIMEOUT_MS,
      });
    } catch (error) {
      const message = String(error?.message ?? '');
      if (/timeout/i.test(message)) throw new Error('timeout');
      throw new Error('unreachable');
    }

    if (!response) throw new Error('unreachable');
    if (response.status() >= 400) throw new Error('unreachable');

    if (!requestAllowed(page.url(), allowedHostname)) throw new Error('unsupported_url');

    const title = await page.title();
    const bodyText = await page.locator('body').innerText().catch(() => '');
    if (/access denied|captcha|challenge|blocked|forbidden/i.test(`${title} ${bodyText}`.slice(0, 500))) {
      throw new Error('capture_blocked');
    }

    await page.waitForTimeout(400);
    return await page.screenshot({ type: 'png', fullPage: false });
  } finally {
    if (context) await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}
