# Experience requirements

Updated: 2026-10-24. Current demo behavior is implemented in [frontend/](../frontend/README.md). [PRODUCT.md](PRODUCT.md) owns positioning and owner decisions.

## Current connected experience

**Home → sample audit → redesign preview → estimate → local proposal draft.** Each page also works as a direct entry point. No signup, contact details or sales call gates the first three outputs.

| Page | What works now |
|---|---|
| Home / | URL validation, industry selection, complete before/after views, sample health/estimate cards, four interactive service cards (homepage price examples, separate from calculator rates), industry strip, concept collection and FAQs |
| Audit /audit | Fixed sample scores, four sample-design issues with fixes, evidence locations and assessment limits |
| Redesign /preview | Five industries, Modern/Editorial styles, four sample pages and keyboard/pointer comparison |
| Estimate /quote | Three packages, eight add-ons, separate monthly care, local totals and planning allowances |
| Pricing /pricing | Scope comparison, inclusions and exclusions; selected package carries into the estimate |
| Collection /examples | Large original concept previews, filtering and links selecting the matching industry |
| Industries /industries | Search, category filtering, empty-state recovery and links to **36** authored profession pages |
| Profession /industries/<slug> | Distinct priorities, free checklist, fictional design study, FAQ, related professions and context-bearing journey links |
| What We Do /what-we-do | Review, design direction and intended managed delivery; `?service=refresh`, `rebuild` or `marketing` opens a focused scope and local brief |
| FAQ /faq | Twelve answers in three categories, section links and native keyboard-accessible disclosures |
| About /about | Intended agency approach; no invented client proof or team claims |
| How it works /how-it-works | Four steps with explicit demonstration limits |
| Proposal /contact | Review selections, prepare and download a local Markdown draft; nothing is submitted |

## Profession context

A dedicated page’s preview, review and estimate links include `?profession=<slug>`. Direct entry, navigation and refresh resolve that approved profile into its matching design family and fictional identity. Subsequent journey steps retain context through session storage and show a visible profession notice. The downloaded draft includes that identity and profession. Changing the general industry selector clears the profile and its query parameter. Unknown query values are discarded; unknown profession routes return 404. The complete route and content contract is in [PAGE_MAP.md](PAGE_MAP.md).

Profession pages provide three useful self-review questions before any contact form. These are editorial suggestions, not findings about a visitor’s actual business. They share five visual families and licensed stock assets; each page has distinct authored content.

## Homepage and visual priorities

Headline: **See what your website could become.** Desktop pairs a URL form with a complete redesign example and two summary cards. A full-width 0–100% slider reveals the redesign while both canvases retain their size. Before/After buttons show complete endpoints. Show both displays both canvases, stacked on mobile. View larger opens the dedicated preview. Mobile places the form before the example. Cost and redesign paths work without a URL.

Warm ivory and sage surfaces, charcoal text, indigo actions, Manrope typography and a DM Serif Display accent. Normal page scrolling uses a subdued native scrollbar. Gallery previews use larger image-led canvases and industry-specific colors/type. See [DESIGN.md](../frontend/DESIGN.md).

Immediately after the hero, Concept #4 replaces the earlier photographic entry stories. It presents four independent choices: free GPT prompt, Website Refresh ($1,000 starting one-time; $75/month optional maintenance), Full Rebuild + SEO ($3,000 starting one-time; $150/month optional maintenance), and Content & Marketing (Custom Plan). The numbered indicator is not a sequential workflow. Desktop has four equal-height cards with aligned buttons, tablet two columns and mobile stacked cards. The current owner request supersedes the original inactive-button restriction. The active card lifts and gains a blue border, tint, button and matching numbered indicator on pointer entry or keyboard focus. In the single-column mobile layout, scrolling highlights the card nearest the viewport center unless a card control holds keyboard focus. Reduced motion retains the color/border state without translation or animation. The free CTA downloads a text prompt using the selected industry/profession and URL context. Paid-path CTAs open `/what-we-do?service=refresh`, `rebuild` or `marketing`; each has scope questions, optional notes and a local text-brief download. Notes remain in memory across internal navigation and clear on refresh or reset. Unknown service values show the general What We Do page. Refresh and rebuild offer explicit sample-estimate links with matching package presets; those calculator figures remain separate examples. No backend, email or submission is connected. The industry strip and remaining sections follow unchanged. The existing estimate calculator retains its separate illustrative figures. [Current interaction and visual evidence](../frontend/qa/service-paths/REVIEW.md).

The hero offers direct redesign and pricing links alongside “Explore a sample review.” Its URL draft survives industry changes until refresh. Comparison position and Show both mode survive option changes within the current app session. Open estimate details remain expanded when options change. These interface states reset with Reset demo selections.

The estimate uses a two-column introduction and a direct jump to scope. Wide screens place comparable packages and optional features beside a sticky total; smaller screens stack them in reading order. Monthly care remains separate. Section anchors account for the sticky header, and route Back navigation restores context.

## Demonstration boundaries

- Business identities, scores, findings, prices and delivery ranges are fictional or illustrative. Real Tampa lead records are not app fixtures.
- URLs are validated and stored as context in the browser session. They are not fetched or evaluated; the report says so.
- Comparison artwork is HTML/CSS for fictional businesses. Embedded navigation/buttons are visual artwork; surrounding page, style, industry and slider controls work.
- Estimates use deterministic local arithmetic from one configuration. Monthly care is separate; taxes, hosting and third-party fees are excluded. Figures are not approved offers.
- Contact details remain in memory. Only a deliberate download writes a proposal file. No email, database, payment, authentication, AI or legacy connection exists.
- Selections and URL context persist in sessionStorage through refreshes and route changes. Reset clears selections and contact details. Contact details do not survive a full refresh.

## Production requirements — not implemented

A real audit must identify pages checked, assessment time, evidence and coverage limits. Distinguish observation, implication and recommendation. Missing data must not become an invented poor score. Do not infer rankings, traffic, conversions, security flaws or lost revenue from appearance.

A personalized concept must preserve verified business facts and working customer tools. No invented testimonials, credentials or locations. Validate the free allowance and delivery cost before promising them.

A live estimate requires an approved, versioned rate card and defined terms. A real proposal flow needs a separately authorized destination and retention/consent behavior. Add-on labels describe possible future scope, not connected services.

## Accessibility and quality

Visible labels and keyboard focus, skip link, validation, announced route/estimate changes and reduced-motion support are implemented. Check desktop, tablet and mobile layouts. Current [QA evidence](../frontend/qa/VERIFICATION.md) is not a comprehensive accessibility certification.

## Homepage business selector

The section following Concept #4 says “Built for your business.” A separate link opens all professions; five category buttons continue to change the sample industry. A contained white panel and stronger typography replace the earlier full-width muted strip. Mobile uses two columns with a full-width final option. This changes presentation, not the directory or selection behavior.
