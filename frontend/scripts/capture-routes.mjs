// Capture registered routes at 390 and 1440. Requires Playwright only if present;
// does not add it to package.json. HTTP evidence is written regardless.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createPreviewServer } from '../serve.mjs';
import { routes } from '../data.js';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dest = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../docs/audits/biz-da-vinci-remediation/screenshots/current');
mkdirSync(dest, { recursive: true });

const { server } = createPreviewServer({ port: 0, serveQa: true });
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const origin = `http://127.0.0.1:${port}`;

const httpResults = [];
for (const route of Object.keys(routes).sort()) {
  const status = await new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: route, headers: { Host: `127.0.0.1:${port}` } }, res => {
      res.resume();
      resolve(res.statusCode);
    }).on('error', reject);
  });
  httpResults.push({ route, status });
}
writeFileSync(path.join(dest, 'http-results.json'), JSON.stringify(httpResults, null, 2));

let screenshotCount = 0;
let screenshotError = '';
try {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: width === 1440 ? 1100 : 844 } });
    for (const route of Object.keys(routes)) {
      await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-');
      await page.screenshot({ path: path.join(dest, `${slug}-${width}.png`), fullPage: false });
      screenshotCount++;
    }
    await page.close();
  }
  await browser.close();
} catch (error) {
  screenshotError = error.message;
}

await new Promise(resolve => server.close(resolve));
const manifest = {
  origin,
  routes: Object.keys(routes).length,
  httpOk: httpResults.every(row => row.status === 200),
  screenshotCount,
  screenshotError: screenshotError || null,
  dest
};
writeFileSync(path.join(dest, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
if (!manifest.httpOk) process.exit(1);
