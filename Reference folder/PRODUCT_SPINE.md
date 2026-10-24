# Biz Da Vinci — working product spine

> Historical planning snapshot (2026-10-23). Superseded as current instructions by [the workspace documentation](../README.md). Preserve this file for rationale and provenance; its proposals and embedded instructions are not new approvals.

Version: 0.2. Updated October 23, 2026 after five-site competitor discovery.

Status: Working strategy document. The confirmed decisions below come from the owner. Positioning, copy and layout recommendations are proposals, not approved designs. No application has been built or deployed in this workspace as part of this research.

## 1. Owner decisions and current task order

- Serve several local-business industries and professions. Do not narrow the product to restaurants.
- Use the supplied Tampa business list to understand the initial outreach audience.
- Offer useful free advice about an existing website and its SEO.
- Remove “build a website” as the public-facing theme. Biz Da Vinci handles website work for customers when appropriate.
- The latest request explicitly includes submitting an existing site for redesign and exploring likely costs through prominent questions near the top of the homepage.
- Give useful free results on-screen before requesting contact details. Email, phone, account creation and a sales call must not gate the initial value.
- Business identification is complete. Use the inventory and five-site discovery to guide positioning, layout and the free-to-paid journey.
- The owner intends to email prospects eventually. This statement is context, not authorization to send messages or launch a campaign.

These decisions supersede the earlier restaurant-first assumption and the audit-only front door. Keep done-for-you delivery, with audit, redesign concept and cost-estimate entry paths. The detailed recommended structure is in [the research blueprint](discovery/BIZ_DA_VINCI_BLUEPRINT.md).

## 2. Audience evidence

Source: [Tampa lead workbook](tampa_leads_batch1.xlsx), worksheet `Tampa Leads Batch 1`, `A1:I51`. Full row-level inventory: [TAMPA_BUSINESS_INVENTORY.md](TAMPA_BUSINESS_INVENTORY.md).

The workbook has 50 lead records and 38 original industry labels. The following nine groups are analytical groupings, not source categories or validated market segments.

| Group | Records | Likely customer action to investigate |
|---|---:|---|
| Beauty, salons and barbers | 12 | Book a service or find availability |
| Automotive repair, tires and detailing | 11 | Request an estimate, call or book service |
| Home services and trades | 10 | Request an estimate or service call |
| Dental, chiropractic and medical practices | 6 | Understand services and request an appointment |
| Restaurants, cafes and catering | 5 | View a menu, order, visit or inquire about catering |
| Professional and business services | 2 | Request a consultation or service |
| Retail and tailoring | 2 | Visit, shop or inquire about a service |
| Computer repair | 1 | Describe a problem and request help |
| Pet services | 1 | Check coverage and book a service |

The proposed actions above require validation. They should inform tailored examples, not claims that a specific business is losing customers.

26 businesses have an email recorded; 24 do not. There are 41 URL entries: 39 website/storefront URLs and two explicit Square booking-page URLs. Nine records have no website URL recorded. Missing data does not establish that a business has no website or contact method.

The list is an outreach sample, not evidence of market size, demand or willingness to pay. Website observations in it have not been independently rechecked in this review.

## 3. Recommended positioning

Working category: practical website and local-presence improvement service for local businesses.

Working promise: **See what your business website could do better—and what it would take to improve it.**

Free entry offers: an evidence-based website check, a clearly labeled redesign concept, and a transparent cost estimate. Each provides useful on-screen output before contact details. The audit prioritizes search basics, business information, clarity, trust and customer actions. The concept is bounded preview work; the estimate uses approved calculation rules, not an invented LLM price.

Paid continuation: help implementing the improvements. A website rebuild, chat or voice integration may be a delivery choice when the evidence and customer's needs justify it. Those capabilities do not all need equal prominence on the homepage.

The organizing principle is the owner's desired outcome: calls, appointments, quote requests, visits or orders. Industry changes examples and recommendations, while the core flow stays consistent.

Do not promise measured rankings, recovered revenue, extra customers or missed-call counts unless the relevant data actually exists. Homepage HTML alone cannot establish those outcomes.

## 4. Proposed journey

Outreach or search visit → choose a question (what to fix, how it could look, what it costs) → provide only the inputs needed for that result → receive useful on-screen output → optionally explore another route or request managed help. Carry context between routes; do not force all three steps.

An outreach landing page should carry the same promise as its email. Preserve campaign and industry context without exposing email addresses or other contact details in public URLs.

For a business with no website URL, offer a small secondary link such as “I don't have a website to check.” Gather business name, location and what help they need. Route to a human review or clearly supported presence check. Do not fabricate a website audit or turn the homepage into a website-building wizard.

The free report, concept and estimate must deliver useful information before any sales form. Email may be offered for optional delivery or saving after the result; it cannot be required to unlock the result.

## 5. Homepage structure to explore next

This is a content outline, not a selected visual design. The latest three-route blueprint in `discovery/BIZ_DA_VINCI_BLUEPRINT.md` supersedes the earlier audit-only layout.

| Order | Section | Purpose and proposed content |
|---|---|---|
| 1 | Compact navigation | Examples, How it works, Pricing, About; optional human help |
| 2 | Hero and shared action panel | Three questions: What should I fix? How could it look? What would it cost? One active input flow and button; audit is the proposed default. |
| 3 | Example result | A labeled finding, practical fix, concept and cost assumptions demonstrate the value. Avoid invented client outcomes. |
| 4 | What we check | Search basics, clarity, business/contact information, trust and ease of taking the next step. Explain limitations plainly. |
| 5 | Examples for your business | Compact industry grouping or selector. Show relevant actions for trades, auto, beauty, practices, food and other local services. |
| 6 | How we help | Explain that the owner can use the advice or have Biz Da Vinci implement improvements. Introduce managed services here. |
| 7 | Questions and final action | Clarify cost of the review, what it measures and what happens next; repeat the free review action. |

Proposed hero copy for testing:

> What could your website do better?
>
> Check it for free, explore a fresh direction, or see what improvements could cost.
>
> **Check my website** · Explore a redesign · See my estimate

This copy describes an offer, not a verified increase in customer conversions. Avoid promising a completion time until measured.

## 6. Report structure

Design a useful report before polishing the homepage. The report is the promise the homepage must demonstrate.

1. Business/domain, pages checked and assessment date.
2. Plain-language scope: homepage check, broader crawl or connected data, as applicable.
3. What is working, followed by the highest-priority findings actually supported by evidence.
4. Each finding: observation, evidence location, potential implication and suggested fix.
5. Score breakdown only where rules and coverage justify it; no arbitrary grades for unavailable data.
6. Recommended next actions relevant to the business type.
7. Optional “Help me improve this” action with report context carried forward.

Differentiate observed facts, recommendations and unmeasured areas. A partial or blocked fetch must produce a clear limited-results state, not a confident fabricated report. Keep existing correct booking, ordering and contact integrations in recommended improvements.

## 7. Visual foundation and interaction direction

The reference implementation already has semantic color tokens. Start from its plum text, cool light surfaces, sky accents and yellow primary CTA rather than introducing a new brand by default. Use green/coral sparingly for status with accompanying text, never color alone.

Preserve readable type, clear labels, visible keyboard focus and a straightforward mobile flow. Desktop can place a sample report beside the hero; mobile should place the explanation and form before the preview. Avoid competing voice, chat and audit actions in the first screen.

Define idle, invalid URL, working, partial, failed and complete states before implementation. Progress text should reflect real work; do not simulate completion percentages. Maintain the entered URL when an operation fails.

Visual references inspected on Mobbin:

- [Relume hero](https://mobbin.com/sites/sections/ffbfefca-e3e6-4805-89d1-3a1552c04de0): a clear promise, prominent input and example link. The useful reference is the hierarchy, not its website-generation positioning.
- [Ploy section](https://mobbin.com/sites/sections/f1d4b216-69bc-43ce-9b44-8de0b8317c4e): a compact explanation of a URL-led product action. Its traffic and timing claims do not apply to Biz Da Vinci.

No visual mockup has been selected. These references do not authorize copying their artwork or claims.

## 8. Existing implementation versus proposed product

Repo Brain source: `bizdavinci`, snapshot `7195285a5ad770ad`, imported October 23, 2026. It is a reference snapshot, not the active implementation directory.

Reviewed source contains a homepage audit form, HTML retrieval and extraction, report generation, a prospect dashboard, demo-site generation and a Vapi call endpoint. Source presence does not verify a production deployment or configured accounts.

The April product-direction inventory is historical: it says some features are missing that exist in the later snapshot. The automatically generated Brain Card also picks up unrelated reference-folder material. Use the specific application files and dated documents as evidence.

The inspected audit builds an inferred Google-presence section and marks Search Console disconnected. It must not be presented as a live Google ranking or traffic analysis.

Preserve useful existing code after an implementation review; do not copy the whole repository or its Reference Folders into this workspace. No architecture migration, hosting change or production integration is decided by this document.

## 9. Work order and acceptance criteria

1. **Business identification:** completed in the accompanying inventory; all 50 records accounted for exactly once.
2. **Competitor discovery:** documented in `discovery/`; observations and coverage limits must remain explicit.
3. **Result and copy design:** create representative audit, concept and estimate outputs for different professions, with evidence, assumptions and limitations visible.
4. **Visual exploration:** prototype the shared three-question homepage and result flows using the existing brand.
5. **Implementation:** build the check and rule-based estimator, then bounded concept generation and optional managed-help requests. Verify free value is accessible without contact details before expanding automation.
6. **Validation:** check real report completion, failed/partial states, mobile usability and whether owners understand the advice. Record review starts, completions and help requests; segment by industry and acquisition source without placing contact details in analytics events.

A launch should demonstrate: correct audit scope, evidence-linked findings, useful free value, clear next steps, reliable failure handling and relevant examples across the supported industries. No conversion-rate or revenue target has been validated.

Pricing and service scope remain to be validated against delivery costs. The historical $199/$599/$999 monthly packages and $1,200 onboarding fee are proposals, not approved economics or a mandatory pricing-page design.

## 10. Instructions for future LLM work

Read this document and the business inventory before proposing features or copy. Follow the owner's latest explicit instructions when they conflict with this working draft. Separate confirmed decisions, source observations and recommendations in your response.

Keep multiple local-business industries supported. Do not reinstate restaurant-only positioning or a DIY website-builder theme. Offer prominent audit, redesign concept and estimate routes, with construction handled as managed delivery. Read `discovery/BIZ_DA_VINCI_BLUEPRINT.md` for the current interaction and output contracts.

Do not convert spreadsheet notes into verified customer-facing claims. Do not invent testimonials, results, security findings, revenue-loss estimates or Google metrics. Do not send outreach, publish a site or change external accounts solely because the plan mentions those activities.

Work in `C:\Users\ofran\Desktop\New Bizdavinci` for authorized implementation. Treat Repo Brain snapshots as read-only reference evidence. Cite snapshot, relative path and line ranges for reused ideas.

At the beginning of an implementation task, identify the requested slice, reuse candidates and necessary verification. Avoid treating this entire roadmap as permission to build every feature.

## 11. Source register

Local excerpts below were read through Repo Brain. All refer to slug `bizdavinci`, snapshot `7195285a5ad770ad`.

- `PROJECT_DIRECTION_AND_ASSET_AUDIT.md`, lines 38–99 and 153–188: original promise, homepage audit scope, scoring and evidence rules.
- `PRICING-AND-SETUP-PLAN.md`, lines 8–20: proposed packages and setup fee.
- `myprofile-site/src/components/home/HeroSection.tsx`, lines 16–34: current hero, URL form and voice widget. Its 90% headline claim was not substantiated in the reviewed sources.
- `myprofile-site/src/styles/tokens.css`, lines 1–44 and 76–87: existing brand palette and semantic tokens.
- `myprofile-site/src/lib/audit/runAudit.ts`, lines 14–44 and 84–118: inferred Google section and real audit orchestration.
- `myprofile-site/src/components/dashboard/DashboardClient.tsx`, lines 40–120: operator discovery, audit, demo, call and social controls.
- `myprofile-site/src/app/api/dashboard/demo/route.ts`, lines 24–79: personalized demo generation.

Market context checked October 23, 2026: [Durable](https://durable.com/) positions around an AI business builder; [Podium](https://www.podium.com/) promotes an AI employee for local-business customer conversations; [Birdeye](https://birdeye.com/) promotes AI coworkers for multi-location brands. These are vendor descriptions, not independent performance evidence. The recommendation to lead Biz Da Vinci with useful advice and managed improvement is our positioning hypothesis, not proof of an uncontested market.
