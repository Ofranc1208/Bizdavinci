# Interactive service paths — verification

Verified locally, 2026-10-24. Owner request: lift/highlight the active plan, refine the cards and verify working page connections. This supersedes the original visual-only button restriction.

## Delivered

- Four equally sized cards with cleaner spacing, readable offer copy, aligned actions and a quieter inactive state. Pointer entry or keyboard focus raises the active desktop card 10px and changes its border, background, button and matching numbered indicator. The single-column mobile layout follows the card nearest the viewport center on scroll, with a 5px lift. Keyboard focus takes priority. Reduced-motion CSS removes movement and transitions.
- The free path downloads an industry-aware website planning prompt without contact details. Refresh, rebuild and marketing open focused views of the existing What We Do route. Scope, price-example qualifications, planning questions and a local brief form are visible.
- Refresh/rebuild link to matching sample estimate packages. Changing a package updates its query parameter so a refresh preserves the user's current selection. Homepage price examples remain separate from calculator ranges.
- Internal cross-page fragment links keep the app session and scroll to the destination; same-page anchors retain native navigation. Service notes survive internal navigation, and clear on full refresh or reset. Nothing is submitted or connected externally.

## Checks and evidence

| Layer | Result | Evidence |
|---|---|---|
| Syntax | Pass, including new service-path test file | [Log](syntax-check.txt) |
| Automated tests | 26 passed, zero failed; includes service routes, downloads' text, escaped notes, existing model/server/content contracts and frozen calculator prices | [Log](test-results.txt) |
| HTTP | 55 checks passed: 48 routes, four service queries, two package queries and expected unknown-route 404 | [Results](http-results.json) |
| Browser layout/link sweep | 208/208 passed: 48 routes + refresh/rebuild/marketing + unknown-service fallback, each at 1440/1024/390/360px | [Results](route-layout-results.json) |
| Card pointer states | Each of the four cards activates on pointer entry during a non-action heading click | [Results](pointer-checks.json) |
| Desktop geometry | Four card heights measured 566.98px; active top 587.66px, other tops 597.66px: 10px lift without changing layout height | Browser DOM measurement |

The sweep checks a rendered main heading, document overflow, decoded images, registered internal destinations and same-page hash targets. Zero failures were found. Widths include the local browser's scrollbar allowance. The HTTP checks verify response status separately from browser rendering.

## Interaction regression pass

- Keyboard Tab from the prompt CTA activates and focuses Refresh, with a visible focus ring and blue card treatment.
- Narrow-screen scrolling highlights Refresh, then Rebuild; the numbered indicator matches the active card.
- Free prompt download completed; [downloaded content](free-prompt.txt) contains the industry and truthful URL-context limits.
- Refresh, Rebuild and Marketing scope views opened through links/tabs. Back returned from the estimate to the expected service view. The cross-page Compare all four paths link returned to the homepage section.
- Marketing notes containing `&` and angle brackets remained text; they survived leaving and returning through internal navigation. [Downloaded brief](marketing-brief.txt) preserved them and stated that nothing was sent.
- Refresh selected Essential; selecting Rebuild manually and refreshing retained Rebuild in both the URL and checked control.
- Directory search produced an empty state, Clear filters restored results, and CPA search returned the matching profile. Its preview retained profession context after refresh.
- Comparison Show both/Before and slider End changed visible modes as expected.
- Copywriting and optional care carried into the local proposal. Fictional Demo Owner / demo@example.test input produced a [downloaded proposal](sample-proposal.md) retaining CPA context and separate monthly care.
- Mobile navigation opened and Escape closed it. FAQ expanded with Enter; its category anchor navigated correctly. Gallery filtering to medical spa left one concept. An empty homepage URL showed validation; `example.test` opened the labeled sample audit.
- No application warning/error logs were returned for the inspected interaction tab. The original preview server was reused and left running. Test selections were reset afterward.

## Visual review

- [Full desktop card section](cards-desktop.png): complete heading, indicators, cards, actions and qualification note.
- [Focused refresh card](cards-refresh-focused.png): active treatment and keyboard focus. This screenshot is scrolled to the actions; use the full-section capture for surrounding context.
- [Mobile scroll state](cards-mobile-scroll.png): complete active Refresh card and neighboring cards at the actual narrow browser width (359px viewport).
- Desktop service views: [Refresh](refresh-desktop.png), [Rebuild](rebuild-desktop.png), [Marketing](marketing-desktop.png).
- [Marketing mobile](marketing-mobile.png): stacked panels, readable controls and plain-text notes.

Reviewed card alignment, line wrapping, control sizes, focus visibility, full service content and responsive stacking. Desktop navigation bounds showed a 29px gap between Design collection and Pricing; apparent tight glyph spacing in some full-page captures was not overlapping link geometry. No clipped card content or horizontal document overflow was found.

## Limits

This is local Chromium/Codex browser evidence, not a Safari/Firefox, physical-device, screen-reader or production certification. The 208 checks are structural/layout checks, not 208 manually reviewed screenshots or tests of every possible control combination. Reduced-motion handling was inspected in CSS; the browser's OS motion preference was not changed. No live audit, personalized AI generation, email, payment, backend or deployment was tested or enabled. The sample downloads remain in the user's Downloads folder; copies with fictional data are retained here for evidence.
