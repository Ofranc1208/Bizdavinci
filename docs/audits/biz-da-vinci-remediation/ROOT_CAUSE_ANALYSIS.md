# Root cause analysis

Established by reading [AUDIT_REPORT.md](../../../AUDIT_REPORT.md) and the current `frontend/` sources. Independent discovery notes: Agents 1–7 (explore workstreams).

## F1 — Documentation and QA drift (High)

**Cause:** Eighteen additional profession objects were appended to `professions.js` (lines 22–974). `data.js` derives `routes` from that array, so the app and server immediately gained 36 profiles / 48 routes. Canonical docs and the 30-route QA set were not regenerated.

**Manifestation:** Assistants and owners were instructed to treat `STATUS.md` / `PAGE_MAP.md` as truth while 18 routes had no inventory rows and no current HTTP/screenshot evidence.

**How established:** Live `Object.keys(routes).length === 48` vs docs saying 30/18/8.

## S6 — Inconsistent HTML escaping (Medium)

**Cause:** `pages.js` escaped profile fields; `demoSite()` and several `app.js` templates interpolated the same objects raw. `conceptForState()` copies profession brand/headline/services into that object. Safe today only because fixtures are static.

**Manifestation:** Future CMS/AI content interpolated through `app.innerHTML` would become stored XSS.

**How established:** Audit line citations plus current `components.js` `demoSite` (now escaped) and `escape-render.test.mjs`.

## F6 — Unguarded registry lookups (Medium)

**Cause:** Featured slugs, `related` lookups, `faq[0]/[1]`, and `needs[0][1]` assumed complete records. A missing slug throws inside the renderer and blanks the app.

**How established:** `pages.js` / `model.js` before guards; schema now in `validate-content.mjs`.

## F8 — Tests skipped the security boundary (Medium)

**Cause:** `tests/` covered model + professions only. `serve.mjs` is the only filesystem guard and was untested. `npm run check` omitted test files.

## F5 — Index-based `<details>` restore (Medium)

**Cause:** Full-page `innerHTML` rebuilds. Open state was stored as a list of indexes, so adding or reordering disclosures (contact draft toggle, FAQ) restores the wrong panels.

## F10 / F11 / F12

- **F10:** One `catch` treated JSON parse failure as storage unavailable.
- **F11:** Unknown `?profession=` was sanitized in state but left in the URL.
- **F12:** `/^[a-z][a-z\d+.-]*:/i` treated `example.com:` as a scheme.

## S1–S4 (local server)

- Headers besides `nosniff` were absent.
- `Host` was unchecked.
- `assets/` accepted any extension and followed symlinks without `realpath`.
- `qa.html` was always public.

## S5 — Future SSRF

`normalizeUrl` is a client syntax helper. It does not fetch. Private/metadata hosts with a dot in the hostname are accepted as text context. A future crawler that reuses this function would be an SSRF vector.

## CSS / monoliths (M1–M5, F2, F4, R1)

Layered stylesheets and a single `app.js` are maintainability issues, not current functional defects. Root cause is chronological revision without consolidation. Deferred unless a user-visible break appears.
