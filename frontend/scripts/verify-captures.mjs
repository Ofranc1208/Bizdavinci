// Manual M1 verification: run with allowlist set. Writes docs/audits/.../capture-m1-results.json
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { createPreviewServer } from '../serve.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
try {
  process.loadEnvFile(path.join(root, '.env.local'));
} catch {
  console.error('Missing .env.local with BIZDAVINCI_CAPTURE_ALLOWLIST');
  process.exit(1);
}
if (!process.env.BIZDAVINCI_CAPTURE_ALLOWLIST?.trim()) {
  console.error('Set BIZDAVINCI_CAPTURE_ALLOWLIST in .env.local before running verify-captures.mjs');
  process.exit(1);
}

const outDir = path.join(root, 'docs/audits/biz-da-vinci-remediation/capture-m1');
mkdirSync(outDir, { recursive: true });

const { server } = createPreviewServer({ port: 0, serveQa: false });
await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', err => (err ? reject(err) : resolve())));
const port = server.address().port;
const origin = `http://127.0.0.1:${port}`;

function post(url) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ url });
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: '/api/capture',
      method: 'POST',
      headers: { Host: `127.0.0.1:${port}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(Buffer.concat(chunks).toString('utf8')) }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function poll(jobId) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: '127.0.0.1', port, path: `/api/capture/${jobId}`, headers: { Host: `127.0.0.1:${port}` } }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))));
    }).on('error', reject);
  });
}

async function runCase(name, url) {
  const started = Date.now();
  const created = await post(url);
  if (created.status !== 202) return { name, url, ok: false, error: created.body };
  let job;
  for (let i = 0; i < 120; i++) {
    job = await poll(created.body.jobId);
    if (job.status === 'ready' || job.status === 'failed') break;
    await new Promise(r => setTimeout(r, 500));
  }
  return {
    name,
    url,
    ok: job.status === 'ready',
    status: job.status,
    errorCode: job.errorCode,
    message: job.message,
    ms: Date.now() - started,
    screenshotUrl: job.screenshotUrl,
  };
}

const allowlist = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST.split(',').map(s => s.trim()).filter(Boolean);
const publicSites = allowlist.slice(0, 3).map(host => ({ name: host, url: `https://${host}` }));

const results = {
  origin,
  allowlist,
  publicSites: [],
  privateRejected: null,
  unreachable: null,
  at: new Date().toISOString(),
};

for (const site of publicSites) {
  results.publicSites.push(await runCase(site.name, site.url));
}

results.privateRejected = await runCase('private-ip', 'http://127.0.0.1');
results.unreachable = await runCase('unreachable-host', `https://this-host-should-not-exist-${Date.now()}.example.com`);

writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
await new Promise(resolve => server.close(resolve));

const okCount = results.publicSites.filter(r => r.ok).length;
console.log(`Capture M1 verify: ${okCount}/${results.publicSites.length} allowlisted sites ready. Results: ${path.join(outDir, 'results.json')}`);
process.exit(okCount >= Math.min(3, publicSites.length) ? 0 : 1);
