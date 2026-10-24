# Git repository and `.env.local` (2026-10-24)

Investigation only. No home-directory Git configuration was changed.

## Findings

| Check | Result |
|--------|--------|
| `git rev-parse --show-toplevel` | `C:/Users/ofran` (user home, not this project folder) |
| `Desktop/New Bizdavinci/.env.local` | Untracked (`??`) |
| Current branch `master` | No commits at investigation time |
| Key in this repo’s history | Not found (nothing committed) |
| Home-level ignore | Did not ignore `.env.local` |

## What this means

The OpenAI key in `.env.local` is **not in this repository’s Git history**. Risk remains if someone later runs a broad `git add` from `C:/Users/ofran` and includes that file.

**Rotation:** Not required from this repo alone. Rotate if the key was committed or shared elsewhere.

## Guidance (owner choice — not applied automatically)

- Prefer a dedicated Git repository rooted at `Desktop/New Bizdavinci`, **or**
- Add `Desktop/New Bizdavinci/.env.local` to `C:/Users/ofran/.git/info/exclude` (local exclude, not a shared home `.gitignore`).

A **project-local** `.gitignore` may list `.env.local` and capture temp paths. Do **not** rewrite `C:/Users/ofran/.gitignore` or run broad Git operations from the home folder.

## Runtime

`frontend/serve.mjs` loads `../.env.local` with `process.loadEnvFile` when the file exists. Values are never logged. Capture requires `BIZDAVINCI_CAPTURE_ALLOWLIST`. `OPENAI_API_KEY` is unused for M1 screenshot capture; M2 classification may use it only when keyword confidence is low.
