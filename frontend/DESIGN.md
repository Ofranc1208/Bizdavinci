# Visual system

Updated 2026-10-23. Implemented review direction, not a production brand approval.

## Intent

Present Biz Da Vinci as a considered website-improvement agency. The homepage shows the opportunity, and the collection helps an owner recognize a direction for their business. Avoid generic dashboard decoration, fake social proof, fabricated ROI and DIY-builder language.

## Tokens and composition

| Element | Decision |
|---|---|
| Main type | Locally hosted Manrope, variable weights; mostly 400–650 |
| Display accent | DM Serif Display, limited to the hero emphasis, collection title and selected fictional brands |
| Ink | `#20252d` |
| Action indigo | `#484cba`; hover `#363b95` |
| Muted text | `#626870` |
| Borders | `#e2e3e0` |
| Surfaces | Warm ivory `#faf9f6`, sage-gray `#eeefeb`, white preview canvases |
| Closing section | Deep forest `#263a33` with a cream action |
| Main width | Up to 1320px; quote workspace up to 1440px |
| Corners | Generally 9–16px; less rounded on editorial collection captions |
| Motion | Short hover/focus transitions; respects reduced motion |

Homepage: substantial type on the left, live sample comparison on the right, compact health and estimate summaries beneath. A two-column image-led collection follows the explanatory section. Mobile places the URL form first and stacks the collection.

The homepage entry section (`homepagePaths()` in `components.js`, `#explore`) uses an editorial hierarchy: one large café photograph leads to redesign; two smaller photographic stories lead to the sample review and estimate. Heading: “Your business. Seen in a new light.” The entire story is a labeled link with visible keyboard focus. Preserve the uneven composition, real photography and direct copy; do not restore three matching icon cards. On phones the lead story stacks above two compact image/text rows. These are illustrative stock scenes, not clients or staff. [Review and evidence](qa/editorial-paths/REVIEW.md).

Collection: an editorial featured concept with substantial photography, followed by large framed website previews, restrained captions and industry filters. Each card opens the appropriate redesign context. Home services uses sage, spa uses warm sand/serif/arched imagery, healthcare uses a separate consultation photograph and pale blue, dental uses teal/serif, and professional services uses full-width darkened office photography with white typography.

The comparison defaults to the complete redesign. Following the owner’s request to fix the transformation scale, a full-width 0–100% range now reveals the redesign continuously over the original. Both canvases keep identical width and height throughout the reveal; only the visible portion changes. Partial clipping during a drag is intentional. The handle stays below the artwork. Before/After buttons and Home/End reach complete endpoints; Show both displays separate canvases on desktop and stacks them on mobile. View larger opens the dedicated preview. This supersedes the earlier two-position switch and no-divider direction. Controls inside the fictional website artwork remain noninteractive. [Transformation checks](qa/transformation/REVIEW.md).

Scrolling stays native. A subdued scrollbar, warm background, photographic entry stories, sage collection surface and forest closing section give the page a consistent progression. Do not add scroll-jacking or nested scrolling inside the comparison. The page should fit its viewport; the responsive QA harness is for testing, not the user-facing preview.

## References inspected in Mobbin

- [Square photographic feature rows](https://mobbin.com/sites/sections/39d72df8-07a4-4434-bb5e-cc0dd73d4f8b): real business settings connected to individual actions, with thin rules and uncomplicated copy. Adapted into an asymmetric lead story and two supporting paths.
- [V7 comparison](https://mobbin.com/sites/sections/17e4b22d-7c8d-45ff-a87c-47b61b089da6): separate complete before/after canvases; informed the replacement for the clipped wipe.
- [COLLINS homepage](https://mobbin.com/sites/sections/76aeaeb4-d741-43d4-a7c6-65dbbd902701): warm neutral surface, deliberate typography and restrained composition.
- [Squarespace template showcase](https://mobbin.com/sites/sections/dfd2ba9d-c641-4a64-8606-f6a01c762009): large two-column site previews; let the designs carry the section.
- [Framer gallery](https://mobbin.com/sites/sections/172723ff-341f-48c4-8d6c-d2b0155d2d4d): strong visual cards with lightweight captions and browsing categories.
- [Webflow template collection](https://mobbin.com/sites/sections/90616428-cbf5-4f75-be49-14a7fd736e99): visible variety across template imagery; adapted to fewer, larger cards.
- [Locomotive work section](https://mobbin.com/sites/sections/280c1a2d-41d4-4495-a4bd-816763c93ad3): clear typography and deliberate whitespace.
- [Lovart hero](https://mobbin.com/sites/sections/9e947f3e-a9fe-468e-8db2-f99bd4fbec3f): restrained display typography and image-led examples; considered in the final refinement pass.

These are pattern references, not copied code, images or claims of affiliation. The owner's [estimate-dashboard image](../Reference%20folder/Refrence%20image/Website%20Redesign%20Estimate%20Dashboard.png) supplied the initial quote-page composition. The owner subsequently authorized palette changes and asked to fix the clipped comparison. [Refinement review and evidence](qa/comparison-refinement/REVIEW.md).

## Editing rules

Keep tokens in CSS, data/prices in `data.js`, and reusable artwork/components in `components.js`. Prefer one distinctive visual decision over adding decorative cards. Preserve useful mobile reading sizes, explicit demo labels and visible focus. Add original or licensed imagery with provenance in `ASSETS.md`.

## Experience finish

The estimate carries the same Manrope/serif, ivory, indigo and sage treatment as the homepage. Use a balanced two-column introduction, three comparable package choices at wide widths, a two-column feature list and a separate sticky summary. Reserve card borders for selectable scope and totals. Supporting scope copy is generally 12–13px on desktop and 13px on phones. Keep direct review, redesign and cost entries visible in the hero. Preserve comparison position while changing sample options. [Rationale and verification](qa/experience-polish/REVIEW.md).

## Dedicated-page system — 2026-10-24

The directory opens with an asymmetric three-image composition, followed by a searchable text-led index. Profession pages use a split photographic introduction, ruled priorities, a large fictional site study, a free checklist and related links. What We Do uses alternating photographic stories. FAQ uses category headings and native disclosures. About Us keeps the original purpose/approach narrative with explicit onward links. Styling lives in `pages.css`; typography and palette inherit the shared system.

Mobbin references inspected for this expansion: [Beside industry sections](https://mobbin.com/sites/sections/2ae35feb-6f93-4f86-8376-880d6b0d6f66) informed business-specific photography and hierarchy; [Airtasker services](https://mobbin.com/sites/sections/2c48bf0b-3622-44fc-8fb1-76ff63d17cbb) informed clear service entry points; [Canva industry directory](https://mobbin.com/sites/sections/b327a861-bba9-43fb-afdc-b0b7cc063088) informed browseable categories. These are pattern references, not copied assets or claims of affiliation.

The **36** professions reuse five design families and existing licensed photography. Some supporting images are general planning or business imagery rather than profession-specific photography; replacement with more precise licensed imagery is an editorial refinement before publication. They are labeled illustrative throughout.

## Selected Concept #4 — 2026-10-24

The owner selected the supplied four-choice screenshot and implementation brief. `homepagePaths()` in `components.js` renders it directly after the unchanged hero in `app.js`; `.choices-*` and `.choice-*` in `polish.css` isolate its white/navy/electric-blue treatment from the rest of the site. Local Manrope continues; Caveat is used only for the handwritten annotation. Four columns above 1050px, two from 761–1050px, one below. All buttons are visually complete but disabled by explicit request.

An original generated document illustration replaces the reference's branded AI symbol. Licensed Tabler icons supply the gift, lightning, crown, chart, checks and arrows. The written brief controls features, starting-price wording and optional care when it differs from the image. See [asset provenance](ASSETS.md) and [comparison evidence](qa/concept-four/REVIEW.md).

## Homepage industry selector refinement — 2026-10-24

The owner flagged the narrow, faint industry-strip label. The selector now uses a contained white panel, a 21px Manrope heading, a separate directory link, and consistent outlined category buttons with a pale-blue active state. Desktop buttons use 13px medium-weight text; mobile uses 12px text in 47px-high targets, arranged two columns with the last option spanning both. Under 1200px the heading and choices occupy separate rows. Existing sample-industry handlers remain unchanged. Markup lives in `app.js`, scoped overrides in `polish.css`. [Verification](qa/industry-strip/REVIEW.md).

## Interactive plan cards — 2026-10-24

The owner's later screenshot/request supersedes Concept #4's inactive-card behavior. The hero is preserved. The plan section now uses a shorter two-line heading, quieter numbered indicators, consistent card padding, aligned CTA baselines, stronger text contrast and balanced offer areas. Only the active card receives the pale-blue fill, blue border/button and shadow. A 10px desktop lift (5px mobile) transitions over 240ms; reduced-motion mode uses the color/border state without motion. Keyboard focus has a separate high-contrast outline. Pointer entry/focus synchronizes the numbered indicator; single-column scrolling follows the nearest card to the viewport center. Four/two/one-column layouts retain the existing breakpoints.

Service-detail views reuse the site typography and palette, with a scope panel beside a pale-blue local brief form; they stack on mobile. Price examples and optional monthly care remain distinct from calculator ranges. No new imagery was required. [Current screenshots and checks](qa/service-paths/REVIEW.md).
