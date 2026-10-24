# Remediation baseline

Captured: 2026-10-24.

## Git / worktree

The workspace sits under a home-directory git root with no project-local commits. **No reset/clean was performed.** Preserved local work includes root `package.json` (dev script proxy) and all existing `frontend/qa/` screenshots.

## Code metrics (live)

| Metric | Value |
|--------|------:|
| Professions | 36 |
| Registered routes | 48 |
| Browsing categories | 11 |
| Tests before this program | 9 |
| `npm run check` (pre) | exit 0 |
| `npm test` (pre) | 9/9 pass |

## Behavior snapshot (documented, not changed as product intent)

- Local preview: `npm run dev` → `http://127.0.0.1:4173`
- Registered routes serve `index.html`; unknown paths 404
- Estimate arithmetic from `data.js`; care is separate
- URL is context only; no fetch
- Contact form stays in memory; download is a local Markdown Blob
- Comparison state lives in a module `Map` across same-page re-renders
- Profession query maps to registry; unknown slug discarded

## Server

See [SERVER_BEHAVIOR.md](SERVER_BEHAVIOR.md).

## Visual baseline

Mandatory 48×2 capture was scheduled **before** source edits. The audit file arrived after Wave 1–3 code had already started, so that gate was missed. Historical images:

- Shared pages: `frontend/qa/screenshots/`, `frontend/qa/dedicated-pages/`
- Do not treat those files as evidence for financial-advisors … tutors

Current HTTP + optional Playwright captures: `screenshots/current/`.

## Audit

Full read of [AUDIT_REPORT.md](../../../AUDIT_REPORT.md): 0 critical, 1 high, 12 medium, 23 low.
