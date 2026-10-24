# Security remediation report

Scope: local frontend preview. No production deploy was performed.

## Changes made

| Control | Implementation | Test |
|---|---|---|
| S6 HTML escape | `h()` in `demoSite`, audit/add-on/package templates; profession pages already escaped | `tests/escape-render.test.mjs`, `tests/model.test.mjs` |
| S1 headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy: ()` | `tests/serve.test.mjs` |
| S2 Host | Allow `127.0.0.1:<port>` and `localhost:<port>` only | `tests/serve.test.mjs` → 400 |
| S3 assets | Extension allowlist, reject `.` segments, `fs.realpath` | `tests/serve.test.mjs` |
| S4 QA | `serveQa` / `BIZDAVINCI_SERVE_QA=0` / `NODE_ENV=production` hide `qa.html` | `tests/serve.test.mjs` |
| S5 now | Comment + tests: syntax only; `javascript:`/`ftp:`/`localhost` still rejected | `tests/url-syntax.test.mjs` |
| Traversal / methods | Unchanged guard, now regression-tested | `tests/serve.test.mjs` |

## CSP

Not applied on `serve.mjs`. Inline `style="--demo-color"` / score widths and `qa.html` inline script would force `'unsafe-inline'`. Production CSP should be set on the host after those attributes move to classes or JS-set custom properties.

## Remaining risks before a public deployment

1. **S5 crawler:** Do not reuse `normalizeUrl` as a fetch allowlist. Resolve DNS server-side; reject loopback, RFC1918, link-local, CGNAT, metadata (`169.254.169.254`, cloud metadata hostnames), and non-80/443 ports.
2. **S1 production:** Add CSP on the platform, not a permissive local policy.
3. **S4:** Confirm `NODE_ENV=production` (or `BIZDAVINCI_SERVE_QA=0`) on any shared host.
4. **No crawler, no API, no secrets** in this tree — remains the strongest control.

## Proof

See [TEST_RESULTS.md](TEST_RESULTS.md) and [SERVER_BEHAVIOR.md](SERVER_BEHAVIOR.md).
