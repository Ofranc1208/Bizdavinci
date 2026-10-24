# Regression report

## Pricing and journeys (must stay unchanged)

`data.js` package / add-on / care ranges were **not edited**. `tests/pricing-freeze.test.mjs` pins:

- Essential $950–$1,450; Growth $1,800–$2,800; Rebuild $3,200–$4,800
- Care $79–$149/month, separate from one-time totals
- Essential + copy + booking = $1,450–$2,400 one-time (existing model test)

Navigation destinations, comparison widget markup, and proposal download filename are unchanged.

## Before vs after

| Area | Before | After |
|---|---|---|
| Docs counts | 18 / 30 / 8 | 36 / 48 / 11 |
| Tests | 9 | 16+ (see TEST_RESULTS) |
| Unknown `?profession=` | Left in URL | `replaceState` strips it |
| Corrupt session JSON | “storage unavailable” | Cleared and defaults restored |
| `example.com:8080` | Rejected as scheme | Accepted as host:port |
| `demoSite` XSS if data turned dynamic | Raw interpolation | Escaped |
| Server Host / QA / headers | Unrestricted Host; QA always public | Host allowlist; QA gated |
| `[hidden]` | Per-component patches | Global rule |

## Visual

Pre-change 48×2 screenshots were **not** captured before the first source edits (gate missed after late audit-file arrival). Historical QA images under `frontend/qa/` remain the last visual baseline for shared pages and the first 18 professions.

Current-state captures (if Playwright is available) go in `screenshots/current/`. HTTP 200 for all 48 routes is recorded independently.

## Outstanding visual / interaction verification

- Playwright Back/Forward, comparison drag, and proposal download UI (Node tests cover download *text*, not the click)
- Fresh overflow grid at 360/390/1024/1440 for the 18 newer profession routes
- Screen-reader pass on announcement debounce (F13 partial)
