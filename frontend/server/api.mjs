import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  createJobRecord,
  getJob,
  publicJobView,
  scheduleCapture,
  resolveCaptureFile,
  getCaptureDir,
  isValidJobId,
} from './jobs.mjs';

const MAX_BODY = 2048;

async function readJsonBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_BODY) throw new Error('body_too_large');
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) return {};
  return JSON.parse(text);
}

function json(res, status, body, headers) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  res.end(JSON.stringify(body));
}

export function createCaptureApiHandler(deps = {}) {
  return async function handleCaptureApi(req, res, url, { securityHeaders }) {
    const headers = securityHeaders();

    if (url.pathname === '/api/capture' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const job = createJobRecord({ url: body?.url, clientKey: req.socket.remoteAddress ?? 'local' });
        scheduleCapture(job, deps);
        return json(res, 202, { jobId: job.id, status: job.status }, headers);
      } catch (error) {
        if (error.message === 'body_too_large') {
          return json(res, 413, { error: 'Request body too large.' }, headers);
        }
        if (error.message === 'rate_limited') {
          return json(res, 429, { errorCode: 'rate_limited', message: 'Too many capture requests.' }, headers);
        }
        return json(res, 400, { error: 'Invalid request.' }, headers);
      }
    }

    const jobMatch = url.pathname.match(/^\/api\/capture\/([0-9a-f-]{36})$/i);
    if (jobMatch && req.method === 'GET') {
      if (!isValidJobId(jobMatch[1])) {
        return json(res, 404, { error: 'Not found.' }, headers);
      }
      const job = getJob(jobMatch[1]);
      if (!job) return json(res, 404, { error: 'Not found.' }, headers);
      return json(res, 200, publicJobView(job), headers);
    }

    const fileMatch = url.pathname.match(/^\/api\/captures\/([0-9a-f-]{36})\.png$/i);
    if (fileMatch && req.method === 'GET') {
      if (!isValidJobId(fileMatch[1])) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
        return res.end('Not found');
      }
      const filePath = await resolveCaptureFile(fileMatch[1]);
      if (!filePath) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
        return res.end('Not found');
      }
      const resolvedDir = path.resolve(getCaptureDir());
      if (!path.resolve(filePath).startsWith(resolvedDir + path.sep)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
        return res.end('Not found');
      }
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store', ...headers });
      return res.end(data);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
    res.end('Not found');
  };
}
