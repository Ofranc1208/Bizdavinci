import { mkdir, writeFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { validateCaptureUrl } from './safe-url.mjs';
import { captureHomepageScreenshot } from './capture-playwright.mjs';

const captureDir = path.join(os.tmpdir(), 'bizdavinci-captures');
const TTL_MS = 60 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** @type {Map<string, object>} */
const jobs = new Map();
const rateBuckets = new Map();
let activeCapture = null;

export function getCaptureDir() {
  return captureDir;
}

export function isValidJobId(id) {
  return UUID_RE.test(String(id ?? ''));
}

function pruneRate(now) {
  for (const [key, bucket] of rateBuckets) {
    if (now - bucket.start > RATE_WINDOW_MS) rateBuckets.delete(key);
  }
}

function checkRate(clientKey) {
  const now = Date.now();
  pruneRate(now);
  let bucket = rateBuckets.get(clientKey);
  if (!bucket) {
    bucket = { start: now, count: 0 };
    rateBuckets.set(clientKey, bucket);
  }
  if (now - bucket.start > RATE_WINDOW_MS) {
    bucket.start = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  if (bucket.count > RATE_MAX) throw new Error('rate_limited');
}

export function createJobRecord({ url, clientKey = 'local' }) {
  checkRate(clientKey);
  const id = randomUUID();
  const job = {
    id,
    submittedUrl: url,
    status: 'submitted',
    errorCode: '',
    message: '',
    domain: '',
    screenshotFile: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  jobs.set(id, job);
  return job;
}

export function getJob(id) {
  if (!isValidJobId(id)) return null;
  return jobs.get(id) ?? null;
}

const ERROR_MESSAGES = {
  unsupported_url: 'That website address is not supported for capture.',
  allowlist_denied: 'That domain is not on the approved capture allowlist for local testing.',
  allowlist_not_configured: 'Capture is disabled until BIZDAVINCI_CAPTURE_ALLOWLIST is set in .env.local.',
  unreachable: 'We could not reach that website.',
  timeout: 'Capture timed out before the page finished loading.',
  capture_blocked: 'The site blocked automated access.',
  rate_limited: 'Too many capture requests. Please wait a few minutes.',
  error: 'Something went wrong during capture.',
};

export function publicJobView(job) {
  if (!job) return null;
  const base = {
    id: job.id,
    status: job.status,
    domain: job.domain,
    errorCode: job.errorCode || undefined,
    message: job.message || undefined,
  };
  if (job.status === 'ready' && job.screenshotFile) {
    base.screenshotUrl = `/api/captures/${job.id}.png`;
    base.capturedAt = new Date(job.updatedAt).toISOString();
  }
  return base;
}

async function runCapture(job, deps) {
  const validate = deps?.validateCaptureUrl ?? validateCaptureUrl;
  const capture = deps?.captureHomepageScreenshot ?? captureHomepageScreenshot;
  try {
    job.status = 'validated';
    job.updatedAt = Date.now();
    const validated = await validate(job.submittedUrl);
    job.domain = validated.displayHost;
    job.status = 'capturing';
    job.updatedAt = Date.now();

    await mkdir(captureDir, { recursive: true });
    const buffer = await capture(validated.href, validated);
    const filePath = path.join(captureDir, `${job.id}.png`);
    await writeFile(filePath, buffer);
    job.screenshotFile = filePath;
    job.status = 'ready';
    job.updatedAt = Date.now();
  } catch (error) {
    job.status = 'failed';
    job.errorCode = ERROR_MESSAGES[error?.message] ? error.message : 'error';
    job.message = ERROR_MESSAGES[job.errorCode] ?? ERROR_MESSAGES.error;
    job.updatedAt = Date.now();
  }
}

export function scheduleCapture(job, deps) {
  const run = async () => {
    activeCapture = job.id;
    try {
      await runCapture(job, deps);
    } finally {
      activeCapture = null;
      const next = [...jobs.values()].find(j => j.status === 'queued');
      if (next) scheduleCapture(next, deps);
    }
  };

  if (activeCapture) {
    job.status = 'queued';
    job.updatedAt = Date.now();
    return;
  }
  void run();
}

export async function resolveCaptureFile(jobId) {
  if (!isValidJobId(jobId)) return null;
  const job = getJob(jobId);
  if (!job?.screenshotFile || job.status !== 'ready') return null;
  try {
    const filePath = job.screenshotFile;
    const expected = path.join(captureDir, `${job.id}.png`);
    if (path.resolve(filePath) !== path.resolve(expected)) return null;
    const st = await stat(filePath);
    if (!st.isFile()) return null;
    if (Date.now() - job.updatedAt > TTL_MS) {
      await unlink(filePath).catch(() => {});
      job.status = 'failed';
      job.errorCode = 'error';
      job.message = 'Capture expired. Please try again.';
      return null;
    }
    return filePath;
  } catch {
    return null;
  }
}

export function _resetJobsForTests() {
  jobs.clear();
  rateBuckets.clear();
  activeCapture = null;
}
