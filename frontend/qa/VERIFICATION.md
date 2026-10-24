# Frontend verification

**Latest service-path pass, 2026-10-24:** syntax checks and 26 automated tests pass. All 208 route/width cases and 55 HTTP checks pass. Includes active cards, local downloads, service queries and existing journey regressions. [Detailed evidence and limits](service-paths/REVIEW.md).

## Development setup baseline — 2026-10-24

After the tooling preparation request, `npm run check` exited successfully and `npm test` passed all 23 tests with zero failures. The existing local preview at `http://127.0.0.1:4173/` returned HTTP 200 and HTML containing the Biz Da Vinci title. The running preview was reused. No application code changed and no new visual, accessibility or full-route browser sweep was performed in this pass. Skill installation and plugin availability are recorded in the [frontend setup](../README.md#development-skills-and-plugins--2026-10-24).

**Current delivery, 2026-10-24 (remediation refresh):** 48 registered routes (12 shared + 36 professions, 11 categories). `npm test` now covers model, profession integrity, server guard, escaping, frozen pricing and generated inventory. HTTP 200 for all 48 routes is recorded in [dedicated-pages/http-results.json](dedicated-pages/http-results.json). Earlier [dedicated-page expansion](dedicated-pages/REVIEW.md) verified the first 30-route set and must not be treated as screenshot evidence for the 18 later profession pages.

Earlier experience pass: [review, findings and checks](experience-polish/REVIEW.md). Nine routes at four widths passed overflow/image checks; syntax and all five model tests passed. Includes estimate refinement, comparison state retention, URL draft/error recovery and section navigation.

Verified 2026-10-23 in the local Codex in-app browser. This is a frontend demo review, not production certification.

Earlier pass: [continuous transformation and scale](transformation/REVIEW.md). The full-width range supersedes the two-position comparison behavior described in earlier reviews. Home, preview and quote passed 12 responsive checks; pointer and keyboard positions were exercised with matched canvas dimensions.

Earlier pass: [photographic homepage entry section](editorial-paths/REVIEW.md), checked at four widths with all three destinations exercised. It supersedes the earlier explanatory section. The [comparison, palette and scroll refinement](comparison-refinement/REVIEW.md) remains the evidence for the wider visual system. Initial captures below are historical.

## Initial automated checks — historical

- `npm run check`: all five JavaScript entry/source files pass syntax checking.
- `npm test`: five tests pass for configured price/time totals, separate monthly care, invalid/duplicate stored choices, URL validation, HTML escaping and proposal contents/line breaks.
- HTTP: all nine routes and selected CSS/image/font assets return 200; unknown paths, `.env`, server source and encoded asset traversal return 404; POST to the proposal route returns 405.
- The test command runs the single Node test file directly. This avoids intermittent sandbox `spawn EPERM` errors from Node's isolated test runner; assertions still run through `node:test`.

## Earlier browser interactions checked

| Interaction | Observed result |
|---|---|
| Empty URL submit | Visible validation message; input retained/focused |
| `example.test` URL | Sample audit opens; URL shown as context only, explicitly not analyzed |
| Industry, page and style controls | Selected industry, Services sample and Editorial appearance update |
| Comparison, latest pass | Before/After buttons switch complete designs; Home selects Before, End selects After; pointer drag changes the view and accessible value; dual view is separate canvases on desktop and stacked on mobile |
| Essential + copywriting + scheduling | $1,450–$2,400 one-time; 2–3 sample weeks |
| Optional care | Separate $79–$149/month; does not inflate one-time total |
| Refresh | Package and add-on selections retained |
| Proposal | Local draft ready state explicitly says it was not sent |
| Download | Markdown file downloaded with selected scope and demo notices; no external submission |
| Reset | Default selections restored and contact fields cleared |
| Mobile menu | Opens, closes and responds to Escape |
| Collection filter | Medical spa displays the matching card |
| Featured concept | Opens redesign with Medical spa selected |
| Sample-source disclosure | Opens the original rendered website illustration |
| Browser Back | Returns from featured preview to collection |

A test download named `biz-da-vinci-proposal-draft.md` was created in the user's Downloads folder with fictional Demo Owner / demo@example.test details. It is not a sent proposal.

## Responsive and visual checks

Nine routes rechecked at 1440, 1024, 390 and 360px iframe widths after the latest refinement: **36 layout checks**, no horizontal document overflow or broken images. Current thin scrollbars reduce content width by 10px; measurements are preserved in [latest results](comparison-refinement/layout-results.json). [Initial results](layout-results.json) remain as historical evidence. The harness sizes real browser layout; it is not physical-device testing.

Fixed a narrow About heading overflow and missing spaces between mobile quote sentences. Inspected saved screenshots for typography, image loading, comparison layout, collection presentation and quote cards.

| Page | Desktop | Mobile |
|---|---|---|
| Homepage | [Screenshot](screenshots/home-desktop.png) | [Screenshot](screenshots/home-mobile.png) |
| Redesign | [Screenshot](screenshots/preview-desktop.png) | [Screenshot](screenshots/preview-mobile.png) |
| Estimate | [Screenshot](screenshots/quote-desktop.png) | [Screenshot](screenshots/quote-mobile.png) |
| Collection | [Screenshot](screenshots/examples-desktop.png) | [Screenshot](screenshots/examples-mobile.png) |

Captures show the upper portions of each page, not every below-the-fold state. The live routes provide the complete experience.

## Limits and next review

- All designs, scores, prices and timelines remain samples. No live analysis or production service was tested.
- Sample artwork is scaled inside the comparison on mobile; it demonstrates visual direction, rather than a separately navigable mobile client website.
- No Safari/Firefox/physical-device matrix, screen-reader audit or performance benchmark was run. A fresh collection tab reported no browser warnings/errors. The long-running browser harness previously emitted unattributed MutationObserver errors; the application contains no observer code and the recorded journey completed.
- Owner review is still needed for the visual direction and copy. A subjective premium-design target cannot be certified by passing functional tests.
- Next design work: incorporate owner feedback, refine the selected concepts and expand professions as needed. Later backend work requires separate approval and production requirements; it must not connect the reference project's runtime.

## Concept #4 — latest homepage pass, 2026-10-24

[Review, desktop/mobile captures and measured layout checks](concept-four/REVIEW.md). The selected four-card section replaces the earlier photographic entry section. Syntax and 22 automated tests passed; all four new buttons are inactive. This pass does not re-certify every profession page.

## Homepage business selector — 2026-10-24

[Focused typography and responsive review](industry-strip/REVIEW.md): desktop, tablet and mobile inspected with no overflow; category behavior checked; syntax and all 23 existing tests pass.
