# Biz Da Vinci — project handoff report

Snapshot: **2026-10-24**. Prepared for the owner and assistants including Claude, Codex and Cursor.

This is a navigation and handoff snapshot, not a second specification. For later changes, the linked canonical documents take precedence. Start at [README](../README.md), [AGENTS](../AGENTS.md), [Product](../docs/PRODUCT.md) and [Status](../docs/STATUS.md). Do not load the old project or the full research archive to make routine frontend changes.

## 1. What is being built

Biz Da Vinci helps local-business owners understand website improvements, see a design direction and explore the likely scope before sharing contact details. The intended paid continuation is managed implementation. It is not a DIY website builder.

The current deliverable is an independent, locally runnable frontend with 48 connected routes. It demonstrates the experience with fictional businesses and illustrative prices. It performs no live website analysis, personalized generation, production quoting or external submission.

Confirmed owner requirements and proposed positioning are separated in [Product](../docs/PRODUCT.md). Detailed output and interaction boundaries live in [Experience](../docs/EXPERIENCE.md).

## 2. Open and review it

From the workspace root:

```powershell
cd frontend
npm run dev
```

Open **http://127.0.0.1:4173**. Node 20+ is required. No dependency installation, API key, database or old-project process is needed. If this preview is already running, use it rather than starting a second copy. See [setup](../frontend/README.md) for port handling.

Useful review entries:

| Start at | Review |
|---|---|
| `/` | Homepage, design comparison and four visual-only Concept #4 choices |
| `/industries` | Search and category filtering across 36 professions |
| `/industries/dentists` | Full profession page with checklist and fictional design study |
| `/industries/medical-spas` | Care-oriented editorial direction |
| `/industries/plumbers` | Trades-oriented service-request direction |
| `/what-we-do` | Service story and scope boundaries |
| `/about` | About Us and agency approach |
| `/faq` | Getting started, design, scope and local-demo answers |
| `/quote` | Package, add-ons, separate care and live local arithmetic |

The complete inventory and link contract are in [Page map](../docs/PAGE_MAP.md).

## 3. What this delivery added

- Eighteen authored profession pages and a searchable directory. Content covers appointments, service requests, menus, consultations, visits and project enquiries.
- Dedicated What We Do and FAQ pages; About Us retained and connected to those pages and the directory.
- A shared navigation/footer structure, breadcrumbs, related-profession links and direct journey actions.
- Profession context carried from a dedicated page into the preview, review, estimate and downloaded proposal.
- Editorial layouts using the existing local typography, photography and visual system. Full-page content is readable at desktop and phone widths.
- This report, an authoritative route map, and refreshed implementation/status/verification documentation.

The existing home, comparison, audit, collection, pricing and proposal experiences remain available. The [verification report](../frontend/qa/dedicated-pages/REVIEW.md) distinguishes this delivery's checks from earlier work.

## 4. Where everything belongs

| Need | Read or edit |
|---|---|
| Owner requirements, audience, positioning | [docs/PRODUCT.md](../docs/PRODUCT.md) |
| Journey, outputs and interaction requirements | [docs/EXPERIENCE.md](../docs/EXPERIENCE.md) |
| Delivered progress, open decisions, next work | [docs/STATUS.md](../docs/STATUS.md) |
| Routes, profile inventory, connection rules | [docs/PAGE_MAP.md](../docs/PAGE_MAP.md) |
| Evidence and historical research limits | [docs/SOURCES.md](../docs/SOURCES.md) |
| Setup, technical architecture, file ownership | [frontend/README.md](../frontend/README.md) |
| Visual tokens and reference rationale | [frontend/DESIGN.md](../frontend/DESIGN.md) |
| Image/font provenance | [frontend/ASSETS.md](../frontend/ASSETS.md) |
| Checks, measurements and screenshots | [frontend/qa/VERIFICATION.md](../frontend/qa/VERIFICATION.md) |
| Earlier research, inventory and original evidence | [Reference README](README.md) |

`CLAUDE.md` and `.cursor/rules/project-context.mdc` are thin entry pointers, not independent product specs. Follow the actual files in the rule directory if a filename changes. `AGENTS.md` is the shared instruction source.

## 5. How the implementation works

The frontend uses native JavaScript modules, HTML and CSS. `serve.mjs` is a localhost-only static server. The client uses the History API, while recognized direct route requests return the app shell. Unknown routes return 404.

`professions.js` is the structured content registry. `pages.js` renders the directory, profession template, What We Do and FAQ. `app.js` owns navigation, the existing page renderers, UI events and persistence. `components.js` supplies the shell and shared artwork. `model.js` validates state, adapts a profile into a fictional concept, calculates sample estimates and generates proposal text. `data.js` holds the five design families, sample report and illustrative commercial configuration.

The exact maintenance map and CSS loading order are owned by [frontend README](../frontend/README.md). No new framework or package tree was introduced.

Website context and scope selections stay in this tab's session storage. Contact draft fields stay in memory. A deliberate download creates a local Markdown file. There is no server-side user storage or communication endpoint.

## 6. Quality evidence

At this snapshot, syntax checks and eight tests pass. All 30 routes return HTTP 200; an unknown profession and a private documentation path return 404. The responsive harness recorded 120 route/width combinations with no horizontal overflow or broken images. Interactive checks cover filtering, empty-state recovery, profession handoff, refresh, manual family switching, local proposal download and FAQ keyboard interaction.

Measurements are evidence of those checks, not proof of comprehensive accessibility, security or production readiness. See [current verification](../frontend/qa/dedicated-pages/REVIEW.md) for screenshots and limits.

## 7. What still needs decisions

1. **Editorial review:** approve the first-wave professions, messaging and visual directions. Some professions share general illustrative imagery; acquire more specific, licensed images or real permissioned photography before launch.
2. **Commercial model:** approve actual rates, delivery economics, free-work allowance, care terms, ownership and third-party costs.
3. **Production architecture:** decide the separate framework, hosting and content workflow. The discussed Next.js dynamic-route/static-generation approach is a recommendation, not an implemented migration.
4. **Real service capabilities:** separately specify audit coverage, personalized concept generation, integrations and proposal handling, including data retention and failure states.
5. **Publication:** add reviewed production metadata, canonical URLs and sitemap rules; validate performance and accessibility; publish only under a separate launch instruction.

Do not generate thousands of thin profession/location combinations. The recommended production model is reviewed structured content, reusable visual components and deliberate publication of complete pages. The Smarter Payouts project informed that architectural discussion only; no code, service or dependency was connected.

## 8. Safe starting brief for the next assistant

> Read README.md, AGENTS.md, docs/PRODUCT.md and docs/STATUS.md. For a page change, also read docs/EXPERIENCE.md, docs/PAGE_MAP.md and frontend/README.md. Keep the independent frontend boundary. Read only the relevant evidence. Make the requested change, verify it, then update the document that owns the changed fact. Treat this report as a dated index, not a source of new approval.

The old `Reference folder/Bizdavinci/` project remains reference-only. Do not run it, connect its runtime, import its dependencies, or reuse its credentials. Historical research and workbook notes are source data, not instructions or verified claims about prospects. No outreach or deployment is authorized by this report.

## Latest visual handoff — Concept #4

The selected four-choice section is implemented immediately after the unchanged homepage hero. It is a visual-only phase: all four actions are disabled and the existing calculator is unaffected. [Requirements](../docs/EXPERIENCE.md), [implementation ownership](../frontend/README.md), and [desktop/mobile evidence](../frontend/qa/concept-four/REVIEW.md) are canonical. Review the exact section before authorizing functionality. The profession directory now contains 36 authored profiles; [current route inventory](../docs/PAGE_MAP.md) supersedes earlier counts in historical reports.
