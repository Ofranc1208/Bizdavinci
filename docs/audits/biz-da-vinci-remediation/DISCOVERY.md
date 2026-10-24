# Independent discovery (Agents 1–7)

Read-only workstreams were launched as Cursor explore/generalPurpose subagents after `AUDIT_REPORT.md` was present. Source edits in Waves 1–3 had already begun in the prior turn (late audit-file arrival). These notes reconcile agent scope with current code.

## Agent 1 — Security (S1–S6)

Verified against current `serve.mjs` / `model.js` / templates:

- S1 Partial: local headers present; CSP deferred.
- S2 Fixed: Host allowlist.
- S3 Partial: extension + realpath + dot-segment reject.
- S4 Partial: QA gated.
- S5 Deferred for crawler; syntax-only documented and tested.
- S6 Fixed in templates + XSS fixture tests.

## Agent 2 — Routing / state

- F5 Partial: keyed disclosures; full innerHTML remains.
- F10 Fixed: parse vs unavailable.
- F11 Fixed: strip unknown profession query.
- F13 Partial: announce clears then sets.
- F14 Partial: `Object.hasOwn`.
- F17 Fixed: skip hash scroll if user already scrolled.

## Agent 3 — Data

- 36 professions, 11 groups, schema validator pass.
- Featured slugs live on `professions.js` (browser-safe).
- R7/R8 duplication remains; inbound related gaps (attorneys, roofers, veterinarians, tutors) accepted.

## Agent 4 — CSS / a11y

- F3 Fixed: global `[hidden]`.
- F2/F4/R1/M2 Deferred (no visual rewrite).
- Audit metric claims not independently re-counted in a committed CSS analyzer; treat 191/261/15 as audit-era measurements.

## Agent 5 — Architecture

No file split. Incremental exports only (`createPreviewServer`, inventory, validation).

## Agent 6 — QA

22 Node tests + 48-route HTTP. Missing: Playwright journey suite (dependency not added).

## Agent 7 — Docs

Counts updated in README, STATUS, PAGE_MAP (all 36 slugs), EXPERIENCE, SOURCES, DESIGN, VERIFICATION. Historical QA reviews labeled as first-wave evidence only.

## Agent 8

Independent review launched after integration. Homepage regression found and fixed: `pages.js` must not import Node-only `validate-content.mjs`.
