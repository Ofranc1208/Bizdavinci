# Homepage capture — Milestone 1 (local)

Implemented 2026-10-24. Local preview only; not deployed.

## What works

- Homepage **Analyze my website** stays on `/`, POSTs to `/api/capture`, polls job status.
- **Before** panel: PNG screenshot of allowlisted public homepage.
- **After** panel: existing fictional `demoSite` for selected industry (unchanged design).
- Slider reveal at 50% when capture is ready; stale poll results ignored via `activeCaptureJobId`.
- Fail closed: empty/unset `BIZDAVINCI_CAPTURE_ALLOWLIST` rejects all captures.

## Security notes

- DNS lookup + public IP check before capture; literal private hosts rejected.
- Playwright: fresh context per job, `context.route`, blocked service workers, downloads disabled, cleanup in `finally`.
- Screenshots served only for UUID job IDs in `ready` state under temp capture directory.
- Route interception does **not** fully eliminate SSRF/DNS rebinding; allowlist remains required.

## Git / secrets

- Repo root observed at `C:/Users/ofran`; project `.env.local` was untracked with no commits on `master` at investigation time.
- Do not commit `.env.local` from a home-scoped repository.

## Verification

Automated: `npm test` — **31/31** pass (includes safe-url + capture API with injected fake capturer).

Live script: `node frontend/scripts/verify-captures.mjs` — see `results.json` in this folder.

Evidence PNGs (2026-10-24 run): `screenshots/` (`example.com`, `www.example.com`, `iana.org`).

Private `http://127.0.0.1` → `unsupported_url`. Unknown host under allowlisted parent → `unreachable`.

## Limitations (M1)

- No OpenAI, industry auto-match, audit engine, or pricing integration.
- Allowlist required; anti-bot pages return `capture_blocked`.
- Health/estimate cards remain sample data.
- Capture temp files expire after TTL; in-memory jobs reset on server restart.
