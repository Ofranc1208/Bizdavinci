import dns from 'node:dns/promises';
import { isIP } from 'node:net';

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'metadata.google.internal',
  'metadata',
]);

function isPrivateIpv4(host) {
  const parts = host.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => Number.isNaN(p))) return false;
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

function isPrivateIpv6(host) {
  const normalized = host.toLowerCase();
  return (
    normalized === '::1' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe80')
  );
}

export function isPublicIpAddress(host) {
  const version = isIP(host);
  if (version === 4) return !isPrivateIpv4(host);
  if (version === 6) return !isPrivateIpv6(host);
  return false;
}

export function isSafePublicHost(hostname) {
  const host = String(hostname ?? '').toLowerCase().replace(/\.$/, '');
  if (!host || BLOCKED_HOSTNAMES.has(host)) return false;
  if (host.endsWith('.local') || host.endsWith('.internal')) return false;
  const version = isIP(host);
  if (version === 4) return !isPrivateIpv4(host);
  if (version === 6) return !isPrivateIpv6(host);
  return true;
}

/** Fail closed: unset or empty env → no allowed hosts. */
export function getCaptureAllowlist() {
  const raw = process.env.BIZDAVINCI_CAPTURE_ALLOWLIST;
  if (!raw || !String(raw).trim()) return [];
  return String(raw)
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

function hostnameAllowed(hostname, allowlist) {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return allowlist.some(entry => host === entry || host.endsWith('.' + entry));
}

async function assertResolvablePublic(hostname) {
  let records = [];
  try {
    records = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error('unreachable');
  }
  if (!records.length) throw new Error('unreachable');
  for (const entry of records) {
    const addr = entry.address;
    if (!isPublicIpAddress(addr)) throw new Error('unsupported_url');
  }
}

export async function validateCaptureUrl(input) {
  const allowlist = getCaptureAllowlist();
  if (!allowlist.length) throw new Error('allowlist_not_configured');

  const text = String(input ?? '').trim();
  if (!text || text.length > 500) throw new Error('unsupported_url');
  let parsed;
  try {
    parsed = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    throw new Error('unsupported_url');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('unsupported_url');
  if (parsed.username || parsed.password) throw new Error('unsupported_url');
  if (!parsed.hostname.includes('.') || parsed.hostname.endsWith('.')) throw new Error('unsupported_url');
  if (!isSafePublicHost(parsed.hostname)) throw new Error('unsupported_url');
  const port = parsed.port ? Number(parsed.port) : parsed.protocol === 'https:' ? 443 : 80;
  if (![80, 443].includes(port)) throw new Error('unsupported_url');

  if (!hostnameAllowed(parsed.hostname, allowlist)) throw new Error('allowlist_denied');

  await assertResolvablePublic(parsed.hostname);

  parsed.hash = '';
  parsed.search = '';
  return {
    href: parsed.href,
    hostname: parsed.hostname,
    displayHost: parsed.hostname.replace(/^www\./, ''),
  };
}
