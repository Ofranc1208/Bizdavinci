# Dedicated pages — implementation and verification

Date: 2026-10-24. Local Codex in-app browser. This review covers the profession and information-page expansion; it is not production certification.

## Delivered

Originally recorded 18 authored profession routes. The live registry is now **36** professions / **48** routes; see [PAGE_MAP.md](../../../docs/PAGE_MAP.md) and [http-results.json](http-results.json) (48 × 200). This review’s screenshots and 120-width grid remain evidence for the first 30-route set only.

## Checks

| Check | Evidence / result |
|---|---|
| Syntax | `npm run check` passes for app, components, data, model, server, professions and pages |
| Automated contracts | **Current:** `npm test` is **23/23**. This table’s original pass recorded eight tests for the first 30-route set. |
| Runner compatibility | The isolated Node runner encountered sandbox `spawn EPERM`. `tests/run.mjs` imports both suites into one process and passes without escalation |
| Direct HTTP routes | **Current:** 48 registered routes return 200. [Results](http-results.json). Unknown profession and private documentation paths return 404. |
| Responsive geometry | Historical only: 120 combinations for the first **30** routes × 1440/1024/390/360. [Results](responsive-results.json). Not regenerated for the 18 newer profession routes. |
| Directory | “cafe” finds the accented café profile. Selecting Automotive with that search shows zero matches. Clear filters now restores all **36**. |
| Profession journey | Dental page → preview → estimate → local proposal retains Dental practices / Forma context |
| Refresh | Profile context survives refresh; direct query parameters are applied on initial load. Medical spa Services page and Modern style remain selected after refresh |
| Direct entry / Back | Direct Auto repair preview and Medical spa estimate show their correct identities; Back returns to Auto repair context |
| Manual family change | Changing a profile preview to Spa clears the profession notice/query; Spa persists through refresh |
| Proposal download | Download completed using fictional Demo Owner / demo@example.test details; Markdown contains Dental practices and no-submission notice |
| FAQ | Enter opens a native disclosure with visible focus; answers remain readable |
| Mobile navigation | At 360px, menu opens and FAQ link navigates to the FAQ page with menu closed |
| About Us final links | What We Do, Who We Help and FAQ links present; final layout rechecked at all four widths |
| Documentation | Relative links checked across 12 entry, canonical, implementation and handoff documents; no broken targets |

The thin native scrollbar uses 10px in this browser, so measured document widths are generally 1430/1014/380/350. QA measurements come from the iframe after fonts and images are ready; visual screenshots include the harness when testing phone layouts.

## Visual evidence

- [Directory desktop](directory-desktop.png)
- [Dental profession, full page](dental-desktop.png)
- [What We Do, full page](what-we-do-desktop.png)
- [FAQ desktop](faq-desktop.png)
- [Mobile directory](directory-mobile.png)
- [Mobile navigation](mobile-navigation.png)

The directory uses a large typographic introduction, three photographic directions and a light, searchable index. Profession pages move from a split hero to practical priorities, a full concept, a free checklist and related links. Service pages use photography and clear editorial sections rather than repeating generic icon cards.

## Limits and next refinements

- All profession identities and sample sites are fictional. Existing assets are reused; general planning/house/business photographs are placeholders for some professions, with illustrative labels. More specific licensed images would improve those directions before publication.
- Shared CSS/HTML artwork demonstrates five design families; these are not 18 bespoke production websites or personalized AI outputs.
- No comprehensive screen-reader, multi-browser, performance, legal or security certification was performed. No live audit/integration/submission was tested because none is connected.
- Routes are client-rendered and explicitly non-indexable. Production static generation, SEO metadata, canonical URLs and sitemap are future work.
- A local proposal test file was downloaded. Nothing was submitted or emailed.
