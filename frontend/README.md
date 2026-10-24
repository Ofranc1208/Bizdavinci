# Frontend — start here

Independent local demonstration, updated 2026-10-24. Read [project requirements](../docs/PRODUCT.md) and [experience](../docs/EXPERIENCE.md) first.

## Run

Requires Node 20+. Install dependencies once for homepage capture (Playwright):

```powershell
cd 'C:\Users\ofran\Desktop\New Bizdavinci\frontend'
npm install
npx playwright install chromium
npm run dev
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. If port 4173 is occupied by this preview, use the existing server; otherwise choose another port through the `PORT` environment variable. The server binds only to 127.0.0.1.

### Homepage capture (M1, local only)

1. In the workspace root `.env.local`, set **`BIZDAVINCI_CAPTURE_ALLOWLIST`** to a comma-separated list of public hostnames you approve for local testing (fail closed if unset or empty).
2. On the homepage, enter an allowlisted URL and choose **Analyze my website**.
3. The **Before** panel shows a real screenshot; the **After** panel remains the selected industry’s fictional demo template.

Capture uses DNS checks, an allowlist gate, and an isolated Playwright context. Request routing does not fully eliminate SSRF/rebinding risk; keep the allowlist until stronger network controls are verified. No OpenAI, audit engine, or production deployment in M1.

Verify captures: `node scripts/verify-captures.mjs` (requires allowlist and Chromium).

## File ownership

| File | Responsibility |
|---|---|
| `app.js` | Core route renderers, routing to editorial pages, navigation, UI event handling, session persistence and local draft download |
| `components.js` | Shared navigation, footer, journey stepper, notices, rendered sample sites, complete-view comparison, interactive Concept #4 homepage choices and estimate summary |
| `professions.js` | **36** authored profiles, stable slugs, design-family mapping and related pages |
| `pages.js` | Directory, profession template, What We Do, service planning views and FAQ renderers |
| `pages.css` | Editorial information pages and profession layouts; loaded after polish CSS |
| `data.js` | Single source for fictional industries, prices, package scope, add-ons, care, sample report, homepage service choices and route labels |
| `model.js` | Validation, state sanitization, HTML escaping, estimate calculation, free prompt, service brief and proposal text |
| `styles.css` | Base components and responsive layouts |
| `polish.css` | Final type, gallery, industry treatments and agency visual refinement; loaded after base CSS |
| `index.html` | App shell, metadata, local font preload and entry module |
| `serve.mjs` | Local static server + `/api/capture` for hero screenshots |
| `server/` | URL validation, job queue, Playwright capture |
| `tests/run.mjs`, `tests/*.test.mjs` | Single-process runner; model checks plus profile/route/asset/context contracts |
| `qa.html` | Local responsive iframe harness; not a product route |
| `qa/` | Saved screenshots, measured layout results and verification report |

Dependency direction: `professions.js` → `data.js` → `model.js` → `components.js` → `pages.js` → `app.js`. Some modules also import the registry directly. There are no circular module dependencies. CSS order is `styles.css`, `polish.css`, then `pages.css`.

The plain ES-module approach keeps this reviewable without installing or booting the old Next/Firebase project. A production framework choice remains open.

## Routes

**48 routes:** 12 shared pages plus **36** profession pages. [Complete route inventory and connection contract](../docs/PAGE_MAP.md). `data.js` derives profile route labels from `professions.js`; both `app.js` and `serve.mjs` consume that registry. Adding an approved profile does not require a separate HTML file.

Navigation uses History API and direct route requests resolve to the app shell. Browser back/forward works. Profession, industry, style, page, scope and URL context are kept in sessionStorage under `bizdavinci.frontend.v1`. Profession query parameters are applied on initial load and navigation, including Back/Forward. A manual family change clears the profession query. Profile choices use existing visual families and override fictional identity, services and content through `conceptForState()`.

Contact details are only held in memory until download or reset. Unsaved homepage URL text and per-component comparison positions are also held in memory and survive option changes, but not refresh. Expanded details are retained during same-page updates. Route navigation records scroll context; section anchors respect the sticky header. Invalid stored option IDs are discarded.

## What “connected” means here

The frontend pages share selections and update locally. It does **not** mean external services are connected.

| Future capability | Present boundary |
|---|---|
| Website crawl and audit | Fixed `report` data; homepage can capture allowlisted URLs for the slider only |
| Personalized AI redesign | Five rendered design families plus 36 authored profession adaptations; no generated personal result |
| Approved quote engine | Local arithmetic using illustrative configuration |
| CRM, scheduling, reviews | Optional scope labels and sample price changes only |
| Proposal email/database | Local draft download only |
| Payments, auth, hosting | Absent |

Future integrations require a separate task and explicit production decisions. Never connect the old project, import its dependency tree, read its secrets or reuse its services. Reference files are evidence only.

## Check and review

```powershell
npm run check
npm test
```

Use `/qa.html?width=1440&route=/&height=1500` for the responsive harness. Width options: 1440, 1024, 390, 360. The harness waits for fonts/images and displays content width, scroll width, document height and broken image count. The current thin scrollbar occupies 10px in the tested browser; measured widths are recorded in the results. Open `/` for the actual responsive website, not the fixed-width QA frame.

Add `&section=explore` to inspect the homepage entry stories. The harness eagerly loads images for complete measurements; the actual homepage lazily loads the below-the-fold editorial photographs.

[Visual system](DESIGN.md) · [Assets and licenses](ASSETS.md) · [Verification and screenshots](qa/VERIFICATION.md).

## Service choices and local briefs

The homepage service choices share `serviceChoices` in `data.js` with the focused service views. `homepagePaths()` renders the cards; `app.js` manages active-card pointer/focus/scroll states and local file downloads. `servicePlanPage()` in `pages.js` handles service query views; notes are held in an in-memory map, retained across internal navigation and cleared on refresh or Reset demo selections. `freePromptText()` and `serviceBriefText()` in `model.js` create plain-text files. No external call is made. Homepage prices remain separate from calculator rates. [Route/query contract](../docs/PAGE_MAP.md#service-query-views).

The QA harness now includes a **Check every route** button, covering all 48 routes and four service query cases at four widths. It checks rendering, overflow, images, internal destinations and same-page anchor targets. [QA evidence](qa/service-paths/REVIEW.md).

## Development skills and plugins — 2026-10-24

The owner requested development tooling preparation after review of the current project. Eight skills from the official `openai/skills` curated catalog were installed into this machine's user-level Codex skills directory and are now available in the session. They are not frontend packages or project dependencies.

| Installed skill | Intended use |
|---|---|
| `playwright` | Scripted browser interaction and regression checks |
| `playwright-interactive` | Iterative browser inspection during UI work |
| `screenshot` | Visual evidence when supported by the active environment |
| `security-best-practices` | Review relevant JavaScript security practices |
| `security-threat-model` | Assess boundaries when a future integration is designed |
| `gh-address-comments` | Address review feedback when working with a GitHub PR |
| `gh-fix-ci` | Diagnose GitHub Actions failures when CI exists |
| `vercel-deploy` | Deployment workflow only for a separately authorized publishing task |

Installation confirms the skill files exist, not that each workflow's browsers, external accounts or CLI requirements have been exercised. Existing image generation, document, spreadsheet, PDF and visualization skills were already available and were not duplicated.

The supplied plugins screenshot is reference evidence, not live connection state. Catalog checks in this session returned:

| Plugin in the screenshot | Observed setup state |
|---|---|
| GitHub | Installed; repository access was not tested |
| Context7, Firecrawl | Available; installation/connection offered, completion not confirmed |
| Firebase | Installation confirmed by the app; skills/tools available. No Firebase project selected or connected to this frontend |
| Vercel | Available; installation/connection offered, completion not confirmed |
| Gmail, Google Drive | Available; installation/connection offered, completion not confirmed |
| Google Sheets | No separate result; Google Drive's catalog description includes Sheets |
| Mobbin, Playwright, Chrome DevTools for Agents, Origin, Tavily | No matching plugin returned by the catalog searches; the catalog is not exhaustive |
| Repo Brain | Tool availability observed; excluded from this frontend workflow by owner instruction |

Playwright skills were installed independently of the unavailable plugin search result. Tooling preparation does not choose a production stack, connect Firebase/Vercel to this application, enable outreach or authorize deployment. Current work remains governed by [project status](../docs/STATUS.md) and [experience requirements](../docs/EXPERIENCE.md). The immediate continuation is owner-directed frontend refinement; production scope and architecture remain open.
