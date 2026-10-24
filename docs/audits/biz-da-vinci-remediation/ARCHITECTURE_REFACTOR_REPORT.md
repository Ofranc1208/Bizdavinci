# Architecture refactor report

## Intentional non-rewrite

Wave 4 did **not** split `app.js`, `components.js`, or the CSS trio. The audit’s suggested module explosion would change every import and raise regression risk without fixing a user-visible defect. Per owner approval, M1/M4/M5 and R3–R8 stay **deferred**.

## Incremental changes that did land

| Change | Why it is an improvement |
|---|---|
| `validate-content.mjs` + `featuredSlugs` | Single registry check for slugs, families, groups, assets, related links |
| `scripts/inventory.mjs` | Route/profession table generated from live data |
| `createPreviewServer()` export | Server can be tested on port 0 without spawning a process |
| `data-disclosure-id` on home/FAQ/audit details | Stable restore keys without a new renderer |
| Global `[hidden]{display:none!important}` | One rule instead of per-widget patches (F3) |
| `Object.hasOwn(routes, path)` | Avoids prototype-chain `in` |
| Parse vs access error on `sessionStorage` | Honest storage banner |

## CSS

No selector consolidation. Visual tokens and comparison `v2`/`v3` classes remain. A screenshot baseline of all 48 routes is still required before any stylesheet merge.

## Duplication left in place

Home FAQ vs `/faq` wording (R4), nav label vs `routes` titles (R5), family brands vs profession brands (R7), two serialization formats in `professions.js` (M3/R8). None currently break journeys.
