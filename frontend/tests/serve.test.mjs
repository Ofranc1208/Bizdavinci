import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createPreviewServer } from '../serve.mjs';
import { routes } from '../data.js';

function request(port, path, { method = 'GET', host } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path,
      method,
      headers: { Host: host ?? `127.0.0.1:${port}` }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('preview server guards traversal, private files, methods and host', async () => {
  const { server } = createPreviewServer({ port: 0, serveQa: true });
  await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', err => err ? reject(err) : resolve()));
  const port = server.address().port;
  try {
    for (const path of ['/serve.mjs', '/package.json', '/tests/run.mjs', '/assets/../serve.mjs', '/assets/.hidden']) {
      const res = await request(port, path);
      assert.equal(res.status, 404, path);
    }
    assert.equal((await request(port, '/')).status, 200);
    assert.equal((await request(port, '/app.js')).status, 200);
    assert.equal((await request(port, '/assets/home.jpg')).status, 200);
    assert.equal((await request(port, '/', { method: 'POST' })).status, 405);
    assert.equal((await request(port, '/', { host: 'evil.example' })).status, 400);
    assert.equal((await request(port, '/qa.html')).status, 200);
    const noQa = createPreviewServer({ port: 0, serveQa: false });
    await new Promise((resolve, reject) => noQa.server.listen(0, '127.0.0.1', err => err ? reject(err) : resolve()));
    const qPort = noQa.server.address().port;
    assert.equal((await request(qPort, '/qa.html')).status, 404);
    await new Promise(resolve => noQa.server.close(resolve));
    for (const route of Object.keys(routes)) {
      const res = await request(port, route);
      assert.equal(res.status, 200, route);
    }
    const res = await request(port, '/not-a-route');
    assert.equal(res.status, 404);
    assert.equal(res.headers['x-content-type-options'], 'nosniff');
    assert.equal(res.headers['x-frame-options'], 'DENY');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
