// Local preview + optional homepage capture API (127.0.0.1 only).
import { routes as routeLabels } from './data.js';
import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCaptureApiHandler } from './server/api.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const parentEnv = path.join(root, '..', '.env.local');
try {
  process.loadEnvFile(parentEnv);
} catch {
  /* optional */
}

const defaultPort = Number(process.env.PORT || 4173);
const routes = new Set(Object.keys(routeLabels));

export const publicRootFiles = new Set([
  'index.html', 'app.js', 'components.js', 'data.js', 'model.js',
  'styles.css', 'polish.css', 'pages.css', 'pages.js', 'professions.js'
]);

const assetExtensions = new Set(['.jpg', '.png', '.webp', '.svg', '.ttf', '.txt']);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': '()'
  };
}

function allowedHosts(port) {
  return new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
}

export function serveQaEnabled() {
  if (process.env.BIZDAVINCI_SERVE_QA === '0') return false;
  if (process.env.NODE_ENV === 'production') return false;
  return true;
}

async function serveStaticFile(req, res, localPort, serveQa) {
  const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const normalized = requested.replace(/\/$/, '') || '/';
  const relative = routes.has(normalized) ? 'index.html' : requested.slice(1);
  if (relative.includes('\\') || relative.split('/').includes('..')) throw new Error('Not public');
  if (relative === 'qa.html' && !serveQa) throw new Error('Not public');
  if (!publicRootFiles.has(relative) && relative !== 'qa.html' && !relative.startsWith('assets/')) {
    throw new Error('Not public');
  }
  if (relative.startsWith('assets/')) {
    const segment = relative.slice('assets/'.length);
    if (!segment || segment.split('/').some(part => !part || part.startsWith('.'))) throw new Error('Not public');
    const ext = path.extname(relative).toLowerCase();
    if (!assetExtensions.has(ext)) throw new Error('Not public');
  }
  const filename = path.resolve(root, relative);
  const fileReal = await realpath(filename);
  const resolvedRoot = await realpath(root);
  if (!fileReal.startsWith(resolvedRoot + path.sep) && fileReal !== resolvedRoot) throw new Error('Not public');
  if (!(await stat(fileReal)).isFile()) throw new Error('Not found');
  res.writeHead(200, {
    'Content-Type': types[path.extname(fileReal)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
    ...securityHeaders()
  });
  res.end(req.method === 'HEAD' ? undefined : await readFile(fileReal));
}

export function createPreviewServer({ port = defaultPort, serveQa = serveQaEnabled(), captureDeps } = {}) {
  const handleCaptureApi = createCaptureApiHandler(captureDeps ?? {});

  const server = http.createServer(async (req, res) => {
    const localPort = req.socket.localPort ?? port;
    if (!allowedHosts(localPort).has(req.headers.host || '')) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', ...securityHeaders() });
      return res.end('Bad Host');
    }

    const url = new URL(req.url, 'http://localhost');

    if (url.pathname.startsWith('/api/')) {
      if (!['GET', 'HEAD', 'POST'].includes(req.method)) {
        res.writeHead(405, { Allow: 'GET, HEAD, POST', ...securityHeaders() });
        return res.end('Method not allowed');
      }
      if (req.method === 'HEAD') {
        res.writeHead(200, securityHeaders());
        return res.end();
      }
      return handleCaptureApi(req, res, url, { securityHeaders });
    }

    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD', ...securityHeaders() });
      return res.end('Static preview only');
    }

    try {
      await serveStaticFile(req, res, localPort, serveQa);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...securityHeaders() });
      res.end('Page not found');
    }
  });

  return { server, port, serveQa };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const { server, port } = createPreviewServer({ port: defaultPort });
  server.listen(port, '127.0.0.1', () => console.log(`Biz Da Vinci local preview: http://127.0.0.1:${port}`));
  server.on('error', error => { console.error(error.message); process.exit(1); });
}
