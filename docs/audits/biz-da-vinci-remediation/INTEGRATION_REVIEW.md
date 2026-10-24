# Agent 8 — independent integration review

Reviewer: orchestrator + dedicated [integration subagent](b0c54d15-62a8-4e95-920e-c992f4f5df1e).

## Commands run

| Command | Exit |
|---|---|
| `npm run check` | 0 |
| `npm test` | 0 (23/23) |
| `node scripts/capture-routes.mjs` | 0 (48 HTTP 200; 0 Playwright screenshots from Node) |

## Challenged claims

- “Baseline screenshots before any source edit” — **not met**. Documented as a missed gate. Historical QA + current MCP captures used instead.
- “All 36 findings fixed” — **not claimed**. Tracker separates deferred/accepted.
- “App.js fully tested” — **false if claimed**. Node tests do not drive popstate/click. Honest in TEST_RESULTS.

## Regression found

`pages.js` imported `validate-content.mjs` → browser 404 on `/validate-content.mjs`. Fixed; `/` console is empty. Guard test added.

## Pricing

`data.js` still essential 950–1450, growth 1800–2800, care 79–149. Frozen tests pass.

## Follow-up from [Agent 8](b0c54d15-62a8-4e95-920e-c992f4f5df1e)

Confirmed after this review (2026-10-24):

- Test count in `docs/STATUS.md` updated to **23**.
- `frontend/qa/dedicated-pages/REVIEW.md` checks table no longer claims eight tests / 30 HTTP routes / “restore 18”.
- Homepage Concept #4 cards (`homepagePaths`) still show **$1,000 + $75/mo** and **$3,000 + $150/mo**. Those buttons are disabled and labeled “not active yet.” They are not `data.js` rates and were left unchanged (owner freeze + visual-preview constraint). Recorded as remaining product inconsistency, not a silent price edit.

Discovery also filed: [routing](9100c825-0209-4fed-ae9b-cb0585ee971c), [security](c3139392-7a77-4892-ae15-89bac8f97940), [CSS](f09c8efe-6239-40b9-a8a6-9aaa564d041c), [architecture](10f58c80-cd53-49d7-b80f-54fcf128cdd5), [QA gaps](3db82aa3-382b-42f7-a38c-e76d5617881a), [docs drift](53cd3826-0b06-4697-93c2-2ff07bb49838).

## Readiness

**READY WITH DOCUMENTED LIMITATIONS** — matches FINAL_READINESS_REPORT.md.
