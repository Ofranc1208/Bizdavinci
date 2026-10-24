import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createPreviewServer } from '../serve.mjs';
import { _resetJobsForTests, getJob, isValidJobId } from '../server/jobs.mjs';

function postJson(port, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path,
      method: 'POST',
      headers: {
        Host: `127.0.0.1:${port}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({
        status: res.statusCode,
        body: JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'),
      }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(port, path) {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: '127.0.0.1',
      port,
      path,
      headers: { Host: `127.0.0.1:${port}` },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

test('capture API serves PNG only for ready jobs with valid UUID', async () => {
  _resetJobsForTests();
  const prev = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = 'example.com';

  const fakePng = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  const { server } = createPreviewServer({
    port: 0,
    serveQa: false,
    captureDeps: {
      validateCaptureUrl: async () => ({ href: 'https://example.com/', hostname: 'example.com', displayHost: 'example.com' }),
      captureHomepageScreenshot: async () => fakePng,
    },
  });
  await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', err => (err ? reject(err) : resolve())));
  const port = server.address().port;
  try {
    const created = await postJson(port, '/api/capture', { url: 'https://example.com' });
    assert.equal(created.status, 202);
    assert.ok(isValidJobId(created.body.jobId));

    let job;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 50));
      job = getJob(created.body.jobId);
      if (job?.status === 'ready' || job?.status === 'failed') break;
    }
    assert.equal(job.status, 'ready');

    const bad = await get(port, '/api/captures/not-a-uuid.png');
    assert.equal(bad.status, 404);

    const png = await get(port, `/api/captures/${created.body.jobId}.png`);
    assert.equal(png.status, 200);
    assert.equal(png.body.slice(0, 4).toString('hex'), '89504e47');
  } finally {
    await new Promise(resolve => server.close(resolve));
    if (prev !== undefined) process.env.BIZDAVINCI_CAPTURE_ALLOWLIST = prev;
    else delete process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
    _resetJobsForTests();
  }
});
