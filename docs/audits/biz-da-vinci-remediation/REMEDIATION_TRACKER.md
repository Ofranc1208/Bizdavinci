# Remediation tracker (36 findings)

Every original audit ID. Deferred is not counted as Fixed.

| ID | Original severity | Agent | Verification | Root cause | Files | Action taken | Verification test | Result | Resolution | Remaining risk |
|---|---|---|---|---|---|---|---|---|---|---|
| S1 | Low | 1 | Confirmed | Missing headers besides nosniff | `serve.mjs` | Added nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy. CSP deferred | `serve.test.mjs` | Passed | Partial | No CSP on local server |
| S2 | Low | 1 | Confirmed | Host unchecked | `serve.mjs` | Allow 127.0.0.1/localhost + port | `serve.test.mjs` Host 400 | Passed | Fixed | — |
| S3 | Low | 1 | Confirmed | Broad assets/ + no realpath | `serve.mjs` | Ext allowlist, no dotfiles, realpath | `serve.test.mjs` | Passed | Partial | Symlink attacks still depend on OS |
| S4 | Low | 1 | Confirmed | qa.html always public | `serve.mjs` | serveQa / NODE_ENV / BIZDAVINCI_SERVE_QA | `serve.test.mjs` | Passed | Partial | Must set env on any shared host |
| S5 | Low | 1 | Confirmed (future) | Validator is syntax-only | `model.js` | Comment + tests; no crawler added | `url-syntax.test.mjs` | Passed | Deferred | SSRF if a fetcher reuses this |
| S6 | Medium | 1 | Confirmed | Raw interpolation in demoSite/app | `components.js`, `app.js` | `h()` on dynamic fields | `escape-render.test.mjs` | Passed | Fixed | New templates must use `h()` |
| M1 | Medium | 5 | Confirmed | app.js monolith | `app.js` | No split | — | Not Run | Deferred | Maintainability |
| M2 | Medium | 4 | Confirmed | CSS revision layers | CSS trio | No merge | — | Not Run | Deferred | Override chain |
| M3 | Medium | 3 | Confirmed | 53KB JS content DB | `validate-content.mjs` | Schema tests, not JSON split | `content-integrity.test.mjs` | Passed | Partial | Two serialization formats remain |
| M4 | Low | 5 | Confirmed | components.js mix | — | Deferred | — | Not Run | Deferred | — |
| M5 | Low | 5 | Confirmed | pages/model mix | — | Deferred | — | Not Run | Deferred | — |
| F1 | High | 7 | Confirmed | Docs/QA stale vs 36/48 | docs, README, PAGE_MAP, VERIFICATION | Counts + full slug table + inventory script | `inventory.test.mjs` | Passed | Fixed | 48×2 screenshots incomplete |
| F2 | Medium | 4 | Confirmed | comparison v2/v3 layers | CSS | Deferred | — | Not Run | Deferred | Visual risk if CSS reordered |
| F3 | Low | 4 | Confirmed | [hidden] overridden | `styles.css` | Global `[hidden]{display:none!important}` | CSS review | Passed | Fixed | — |
| F4 | Medium | 4 | Confirmed | Tiny type | CSS | Deferred (design preserve) | — | Not Run | Deferred | WCAG |
| F5 | Medium | 2 | Confirmed | Index restore after innerHTML | `app.js`, `pages.js` | `data-disclosure-id` | Code + FAQ keys | Not Run (browser) | Partial | Other widgets still lost |
| F6 | Medium | 3 | Confirmed | Unguarded lookups | `pages.js`, `model.js` | Guards + schema | `content-integrity.test.mjs` | Passed | Fixed | — |
| F7 | Medium | 3 | Confirmed | Magic strings/counts | `app.js` | Dynamic finding count; featured on registry | tests | Passed | Partial | spa→editorial still duplicated |
| F8 | Medium | 6 | Confirmed | No serve/app tests | `tests/*` | Serve + integrity + escape + pricing | `npm test` 22/22 | Passed | Fixed | App.js events still untested in browser |
| F9 | Low | 6 | Confirmed | Hand lists | `package.json` | Expanded check list | `npm run check` | Passed | Partial | Still hand-maintained |
| F10 | Low | 2 | Confirmed | Parse=unavailable | `app.js` | Separate SyntaxError | code | Not Run (browser) | Fixed | — |
| F11 | Low | 2 | Confirmed | Bad query left in URL | `app.js` | replaceState strip | code | Not Run (browser) | Fixed | Back can still reapply old query |
| F12 | Low | 3 | Confirmed | host: treated as scheme | `model.js` | Require `://` | `model.test.mjs` | Passed | Fixed | — |
| F13 | Low | 2 | Confirmed | Identical announce ignored | `app.js` | Clear then rAF set | code | Not Run | Partial | Directory count not debounced |
| F14 | Low | 2 | Confirmed | `in` + order-dependent click | `app.js` | `Object.hasOwn` | code | Not Run | Partial | Still one dispatcher |
| F15 | Low | 1 | Confirmed | no-store / 404 masking | `serve.mjs` | Accepted for local tool | — | Not Run | Accepted | Local only |
| F16 | Low | 7 | Confirmed | h3 in span | `pages.js` | Deferred | — | Not Run | Deferred | Validator noise |
| F17 | Low | 2 | Confirmed | Late font scroll jump | `app.js` | Skip if scrollY changed | code | Not Run | Fixed | — |
| R1 | Medium | 4 | Confirmed | Redeclared selectors | CSS | Deferred | — | Not Run | Deferred | — |
| R2 | Low | 4 | Confirmed | Dead comparison CSS | CSS | Deferred | — | Not Run | Deferred | — |
| R3 | Low | 5 | Confirmed | Unused JS fields | — | Deferred | — | Not Run | Deferred | — |
| R4 | Medium | 5 | Confirmed | Two FAQ sources | `app.js` / `pages.js` | Deferred | — | Not Run | Deferred | Wording drift |
| R5 | Low | 5 | Confirmed | Nav vs title labels | — | Deferred | — | Not Run | Deferred | — |
| R6 | Low | 5 | Confirmed | Repeated templates | — | Deferred | — | Not Run | Deferred | — |
| R7 | Low | 3 | Confirmed | Brands in data + professions | — | Deferred | — | Not Run | Deferred | Copy can diverge |
| R8 | Low | 3 | Confirmed | Dual formats; isolated slugs | `professions.js` | Schema only | integrity tests | Passed | Deferred | Isolated profiles OK via directory |

**Pricing:** `data.js` ranges unchanged (owner freeze). `pricing-freeze.test.mjs` Passed.

**New observation (Agent 8):** Homepage Concept #4 cards display inactive $1,000 / $3,000 / $75–$150 preview figures that do not match `data.js`. Not treated as a `data.js` price change. Owner decision needed if those cards become live.
