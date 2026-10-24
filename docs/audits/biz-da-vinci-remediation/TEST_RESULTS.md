# Test results (executed)

Date: 2026-10-24

## Commands

```powershell
cd frontend
npm run check
npm test
node scripts/inventory.mjs
node scripts/capture-routes.mjs
```

| Command | Exit | Result |
|---|---|---|
| `npm run check` | 0 | All listed JS/MJS files parse |
| `npm test` | 0 | **23/23 pass** |
| `node scripts/inventory.mjs` | 0 | Wrote `ROUTE_INVENTORY.md` |
| `node scripts/capture-routes.mjs` | 0 | 48/48 HTTP 200; screenshots 0 (Playwright not installed; not added to package.json) |

## `npm test` output (abridged)

```
✔ configured scope totals, extra time and separate monthly care
✔ restored state rejects unknown options and prevents duplicate charges
✔ URL input normalizes context without retaining query data or credentials
✔ proposal carries selections, uses real line breaks and never claims submission
✔ user context is escaped before rendering as HTML
✔ profession registry resolves unique routes, related pages, assets and design families
✔ profession context survives restoration, selects its family and reaches the proposal
✔ editorial page links resolve to registered routes and profession query contexts
✔ profession discovery matches aliases, separate words and accents
✔ profession registry passes schema validation
✔ every profession route is registered
✔ preview server guards traversal, private files, methods and host
✔ malicious concept fields are escaped inside demoSite markup
✔ profession page escapes injected headline, FAQ and services
✔ proposal draft keeps contact payload as plain text, not HTML
✔ escapeHTML covers quote and apostrophe contexts
✔ illustrative package, add-on and care ranges remain frozen
✔ care is billed separately and does not change one-time totals
✔ normalizeUrl is syntax-only and still rejects non-http schemes
✔ documented private and metadata hosts are accepted as syntax, not fetched
✔ generated inventory lists every registered profession slug
✔ browser pages do not import Node-only validate-content
✔ PAGE_MAP profession table includes every current slug
ℹ tests 23
ℹ pass 23
ℹ fail 0
```

## Coverage

| Area | Status |
|---|---|
| Pricing + care separation | Pass |
| Frozen illustrative rates | Pass |
| sanitizeState / unknown options | Pass |
| HTML escaping + XSS fixtures | Pass |
| Profession schema + assets + related | Pass |
| All 48 routes HTTP 200 | Pass (`serve.test.mjs` + `capture-routes.mjs`) |
| Traversal / Host / methods / QA gate | Pass |
| Inventory vs PAGE_MAP | Pass |
| Browser Back / comparison drag / download click | **Not run** (no Playwright dependency) |
| 48×2 screenshots | **Blocked** — Playwright not in the project; historical QA images retained |

## Failed tests

None after assertion fix in `escape-render.test.mjs`.
