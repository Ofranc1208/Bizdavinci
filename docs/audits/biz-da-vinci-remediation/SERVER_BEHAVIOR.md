# Server behavior specification

Derived from [AUDIT_REPORT.md](../../../AUDIT_REPORT.md) §1, current [frontend/serve.mjs](../../../frontend/serve.mjs), and [frontend/qa/dedicated-pages/http-results.json](../../../frontend/qa/dedicated-pages/http-results.json). Encoded by [frontend/tests/serve.test.mjs](../../../frontend/tests/serve.test.mjs).

This is the **local preview server** only. Production hosting is not implemented.

## Binding

- Listen address: `127.0.0.1` (not `0.0.0.0`).
- Default port: `4173`, overridable with `PORT`.
- Tests start the server on port `0` (ephemeral).

## Host header (S2)

Allowed `Host` values: `127.0.0.1:<actualPort>` and `localhost:<actualPort>`.

| Request | Expected |
|---|---|
| `Host: 127.0.0.1:<port>` | Processed normally |
| `Host: localhost:<port>` | Processed normally |
| `Host: evil.example` | **400** `Bad Host` |

## Methods

| Method | Expected |
|---|---|
| GET, HEAD | Allowed |
| POST, OPTIONS, PUT, DELETE | **405** with `Allow: GET, HEAD` |

HEAD on a public file returns 200 with no body (Node `res.end(undefined)`).

## Route and file mapping

Registered SPA routes (keys of `routes` in `data.js`, currently 48) map to `index.html` → **200**.

Unknown paths that are not in the public file allowlist → **404** `Page not found`.

This is **not** a catch-all SPA fallback. `/not-a-route` is 404. Client-side unknown paths after `index.html` is served still render the in-app “This page isn’t here” view.

## Public allowlist (S3)

Root files: `index.html`, `app.js`, `components.js`, `data.js`, `model.js`, `styles.css`, `polish.css`, `pages.css`, `pages.js`, `professions.js`.

`qa.html` is public only when QA serving is enabled (see S4).

`assets/` files must:

- use extensions `.jpg .png .webp .svg .ttf .txt`
- contain no empty or `.`-prefixed path segments
- resolve via `fs.realpath` inside the frontend root

Traversal (`..`, encoded `..`, backslash) → **404**.

Private files (`/serve.mjs`, `/package.json`, `/tests/run.mjs`, `/README.md`) → **404**.

## QA harness (S4)

| Condition | `/qa.html` |
|---|---|
| Default local (`NODE_ENV` not `production`, `BIZDAVINCI_SERVE_QA` not `0`) | **200** |
| `createPreviewServer({ serveQa: false })` or `BIZDAVINCI_SERVE_QA=0` or `NODE_ENV=production` | **404** |

## Security headers (S1)

Every response (including 400/404/405) should include:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `X-Frame-Options: DENY`
- `Permissions-Policy: ()`

CSP is **not** set on this local server. Inline `style=` attributes and `qa.html` inline script would require `'unsafe-inline'` or a refactor. Production CSP belongs on the hosting platform.

## What this server does not do

- No website crawl, fetch, or proxy (S5 is a future-crawler concern).
- No application API, submissions, or credentials.
- Cache-Control remains `no-store` (F15 accepted for local preview).
