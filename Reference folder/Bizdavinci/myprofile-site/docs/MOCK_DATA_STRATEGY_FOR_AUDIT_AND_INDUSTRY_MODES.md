# Mock data strategy: website audit vs industry blueprint

## Purpose

Biz DaVinci is an **AI-powered website growth experience for local businesses**. Before extraction pipelines, rules engines, and LLM report generation are fully live, the product must **look, read, and flow like the real system**.

This document defines:

- The **two user journeys** and how they differ in data.
- **Locked mode-selection rules** (no ambiguity at submit time).
- A **canonical schema** and **full envelope examples** (discriminated API shape).
- **Edge states**: fetch failures, bots blocked, thin pages, partial analysis, missing blueprint.
- **Realistic mock payloads** (not lorem ipsum).
- **UI mapping** and **view-model examples** (adapters).
- **Mock realism boundaries** (marketing vs measured).
- **Analytics events** for staged rollout.
- **Industry coverage** (v1 vs deferred vs unsupported).
- **Mock-to-real replacement** (providers, file layout).
- **Immediate next steps** for engineering.

Related direction: `PROJECT_DIRECTION_AND_ASSET_AUDIT.md` (repo root).

---

## Why mock data must be serious

- **Design and hierarchy** are validated against believable numbers and copy.
- **Components stay dumb**: layout and presentation do not embed one-off fake strings.
- **One source of truth** per mode avoids contradictory “demo” text between hero, report, and marketing sections.
- **Swap-in path** for real APIs is explicit: same **contract** (types + zod), different **provider** (mock factory vs HTTP + parse).

---

## Product modes (canonical)

### Journey 1 - Website URL (“How is *my* site doing?”)

**Trigger:** User submits a **homepage URL** (industry may add narrative context only).

**Output:** A **website analysis** payload: scores, extracted/heuristic facts, issues, quick wins, suggested headline/CTA, summary. Eventually backed by HTML extraction + rules + AI.

**UX expectation:** Dashboard-style preview and report feel **specific** to that URL (business name, realistic weaknesses).

### Journey 2 - Industry only (“What should a great site in *my* industry* include?”)

**Trigger:** User selects an **industry** without a URL (or explicit blueprint-only request).

**Note:** Today the hero form may still **require a URL** in code; this spec is the **target contract** so types, storage, and UI can ship before the API accepts empty URL.

**Output:** An **industry blueprint** payload: ideal sections, trust/CTA/local SEO expectations, page types, common mistakes, vertical-specific opportunities-not a score for “their” site.

**UX expectation:** Educational, playbook-style content; **no fabricated “overall score” for a non-existent URL** unless product adds an explicit **checklist score** (optional future).

---

## Mode selection rules (locked)

These rules apply at **validation** and **routing** time. Document them in API handlers and client forms so behavior never drifts.

| Condition | Effective mode | Notes |
|-----------|----------------|--------|
| **Valid URL present** | **`website_audit`** | Always. Industry, if present, is **context only** (copy tone, benchmark copy, optional vertical hints in LLM). It does **not** switch the user to blueprint mode. |
| **No URL** and **industry present** | **`industry_blueprint`** | Only when the API/product explicitly allows URL-less submit (see form + `auditRequestSchema`). |
| **No URL** and **no industry** | **Reject** | `400` / inline validation: “Enter a URL or choose an industry.” |
| **Both URL and industry** | **`website_audit`** | URL wins. Industry **adds context** to analysis (recommended). Do **not** force the user to pick “mode” in v1 unless product adds a deliberate toggle later. |

**Optional future toggle:** If UX adds “I don’t have a website yet,” that should set an explicit `intent: 'blueprint_only'` and **clear or ignore URL** client-side so the rules above still hold.

---

## Current UI audit (where data should come from)

| Surface | Location | Today | Should be driven by |
|--------|----------|-------|---------------------|
| URL input | `AuditUrlForm` | User state | N/A |
| Industry select | `IndustrySelect` / form | User state | N/A |
| Insights API | `POST /api/insights` | mock factory | Website mock → real pipeline |
| Report page | `AuditReportShell` | `AuditApiResponse` in sessionStorage | Website + **Google presence**, gap, action plan; disclaimers for mock |
| Hero metric cards | `HeroDashboard` | hardcoded / illustrative | See **Mock realism boundaries** |
| Growth chart | `HeroDashboard` | hardcoded | Same |
| GBP tablet | `HeroProfileTablet` | hardcoded | Same |
| Growth proof section | `GrowthProofSection` | marketing copy | Illustrative or `analysis.insightCards` |
| Meta passage / pillars / outcomes | Homepage | mostly static | Optional industry personalization |

**Rule:** Anything that pretends to be “analysis output” should eventually read from **typed mock or real payloads**, not scattered literals in JSX.

---

## Canonical schema overview

### Top-level envelope (discriminated)

All successful API responses SHOULD use one discriminant so clients never guess:

```ts
type GrowthPreviewApiSuccess =
  | { ok: true; kind: "website_audit"; schemaVersion: string; jobId: string; data: WebsiteAuditPayload }
  | { ok: true; kind: "industry_blueprint"; schemaVersion: string; jobId: string; data: IndustryBlueprintPayload };
```

- **`WebsiteAuditPayload`**: Aligns with today’s `AuditApiResponse` body (or a renamed alias). Includes `auditFacts`, `auditReport`, **`googlePresence`**, **`gapAnalysis`**, **`topCustomerCosts`**, **`actionPlan`**, URLs, optional `growthPreviewMeta`.
- **`IndustryBlueprintPayload`**: Blueprint-only shape (scores optional only if explicitly product-approved). Optional **`googlePresencePlaybook`** for vertical Google / Maps / reviews / schema guidance.

Errors use a separate shape (see **Error / partial / empty states**).

---

## Google presence + website opportunity layer (product)

**Positioning:** The report is a **premium “Google Presence + Website Opportunity”** story for local owners - not a Lighthouse dump or generic SEO checklist. Four layers:

| Layer | Role |
|--------|------|
| **Website findings** | Headline/CTA, contact, trust on page, service/area pages, mobile friction - crawl / rules / Playwright (eventually). |
| **Google presence** | Maps rating & volume, review themes, on-site review proof, NAP consistency, structured data readiness, visibility summary; **Search Console** when connected. |
| **Gap analysis** | Mismatches (e.g. strong GBP, weak on-site proof; thin schema; strong visuals, weak conversion). |
| **Action plan** | Missed opportunities, trust, Google wins, website wins, suggested pages - plus `auditReport` headline/CTA. |

### `googlePresence` (Zod: `googlePresenceSchema` in `src/lib/insights/schema.ts`)

| Field | Purpose |
|--------|---------|
| `sourceKind` | `mock_illustrative` \| `inferred_partial` \| `connected_live` for UI labeling. |
| `rating` | 0–5 or null. |
| `reviewCount` | Count or null. |
| `reviewThemes` | `{ positive[], negative[] }`. |
| `reviewsShownOnWebsite` | Boolean. |
| `reviewProofGapSummary` | GBP ↔ site proof gap in one sentence. |
| `businessInfoConsistency` | `{ status, summary }`. |
| `richResultsEligible` | Boolean heuristic. |
| `structuredDataStatus` | `none` \| `basic` \| `good` \| `unknown`. |
| `visibilitySummary`, `reputationSummary` | Narratives. |
| `searchConsole` | `connected`, optional metrics; **`metricsAreIllustrative`** + **`illustrativeNote`** when not real. |

**Rule:** Never show GSC numbers as “yours” unless `connected` and `metricsAreIllustrative` is not true (or omitted).

**Meta:** `growthPreviewMeta.googlePresenceDataMode`: `mock_illustrative` \| `inferred` \| `connected`.

### `gapAnalysis`, `topCustomerCosts`, `actionPlan`

- **`gapAnalysis`**: `{ gapType, title, detail, severity? }[]`.
- **`topCustomerCosts`**: Curated issues for section D; UI falls back to `auditReport.issues`.
- **`actionPlan`**: Structured queues (`topMissedOpportunities`, trust, Google visibility, quick wins split, `suggestedPagesOrSections`).

### Industry blueprint - `googlePresencePlaybook`

Six string-list fields + `headline` (see `googlePresencePlaybookSchema`). Fixtures in `industryBlueprints.ts` for restaurant, medical practice, contractor, **med spa**, **cleaning company**, plus generic fallback.

### Report UI (`AuditReportShell`)

Sections **A–E** + headline/CTA + facts: Google snapshot, search visibility (with GSC disclaimer), gap cards, website pillars, customer costs, action plan (or legacy quick wins).

### Mock preset stories

| Preset | Google story |
|--------|----------------|
| `preset-cleaning-mi` | Decent site; **low review volume** vs pack; proof not by CTA; illustrative GSC. |
| `preset-medspa-tx` | **Strong GBP**; **reviews not on site** near consult; basic schema. |
| `preset-generic-local` | Placeholder Google fields; no `actionPlan`. |

---

## Canonical response examples (full envelope)

Below are **reference JSON shapes** developers can copy. Field lists are representative; optional fields may grow. Use the same discriminant in mock and production.

### Example A - Success, `website_audit`

```json
{
  "ok": true,
  "kind": "website_audit",
  "schemaVersion": "1.0.0",
  "jobId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "data": {
    "jobId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "submittedUrl": "https://sparkledaycleaning.com",
    "finalUrl": "https://www.sparkledaycleaning.com/",
    "industry": "Cleaning company",
    "growthPreviewMeta": {
      "resultKind": "website_audit",
      "schemaVersion": "1.0.0",
      "mockPresetId": "preset-cleaning-mi"
    },
    "auditFacts": {
      "pageTitle": "Sparkle Day Cleaning | Metro Detroit House Cleaning",
      "metaDescription": "Book trusted home cleaning in Oakland County. Move-out cleans, recurring service, and deep cleans.",
      "h1": "A cleaner home without the hassle",
      "h2s": ["Services", "Service area", "Reviews", "Book online"],
      "primaryCtas": [
        { "text": "Get a quote", "href": "/contact" },
        { "text": "Call us", "href": "tel:+12485550199" }
      ],
      "contactSignals": {
        "phones": ["(248) 555-0199"],
        "emails": ["hello@sparkledaycleaning.com"],
        "addresses": ["West Bloomfield, MI"]
      },
      "internalLinks": [
        { "href": "/services", "text": "Services" },
        { "href": "/locations", "text": "Locations" }
      ],
      "seoSignals": { "titleLengthOk": true, "hasMetaDescription": true, "singleH1": true },
      "conversionSignals": { "ctaCount": 2, "hasFormHeuristic": true }
    },
    "auditReport": {
      "overallScore": 63,
      "pillarScores": {
        "messagingClarity": 68,
        "conversionReadiness": 58,
        "seoBasics": 64,
        "trustSignals": 62,
        "localBusinessReadiness": 55
      },
      "quickWins": [
        {
          "title": "Sharpen the hero for one buyer + one city",
          "detail": "Pair the H1 with a subhead that names your core service area and primary offer (e.g. recurring cleans + West Bloomfield).",
          "impact": "High"
        }
      ],
      "issues": [
        {
          "severity": "warning",
          "title": "Service-area depth looks thin",
          "detail": "Competitors rank with city + service landing pages; you mostly route to a generic services grid."
        }
      ],
      "recommendedHeadline": "West Bloomfield house cleaning - recurring, deep, and move-out",
      "recommendedCTA": "Book a walkthrough or get a flat quote",
      "summary": "The site reads friendly and trustworthy, but local intent and conversion paths are split across too many soft CTAs. Tighten the hero, add service+area coverage, and make tap-to-call or book primary on mobile.",
      "llmModel": "mock/preset-cleaning-mi",
      "scoringVersion": "0.1.0-mock"
    }
  }
}
```

### Example B - Success, `industry_blueprint`

```json
{
  "ok": true,
  "kind": "industry_blueprint",
  "schemaVersion": "1.0.0",
  "jobId": "8d4e6f2a-1234-4abc-9def-0123456789ab",
  "data": {
    "kind": "industry_blueprint",
    "schemaVersion": "1.0.0",
    "industryId": "restaurant",
    "industryLabel": "Restaurant",
    "executiveSummary": "High-performing restaurant sites win on clarity: menu, hours, location, and reservations or ordering above the fold, plus proof that matches how people choose where to eat.",
    "idealHomepageSections": [
      {
        "title": "Above-the-fold offer",
        "purpose": "Answer cuisine, vibe, and why to pick you in 3 seconds.",
        "mustInclude": ["Primary cuisine type", "Neighborhood or city", "Primary CTA: order / reserve / menu"]
      }
    ],
    "trustElements": [
      { "element": "Recent Google reviews surfaced near the CTA", "rationale": "Diners compare social proof at decision time." }
    ],
    "idealCtaTypes": [
      { "cta": "Order online", "placement": "Sticky on mobile + hero" },
      { "cta": "Reserve a table", "placement": "Hero + /reservations page" }
    ],
    "localSeoChecklist": [
      { "item": "GBP category alignment", "detail": "Primary category matches how you actually make money (e.g. Italian restaurant vs generic restaurant)." }
    ],
    "recommendedPageTypes": [
      { "pageType": "Menu", "goal": "Convert hungry searchers", "keyContent": ["Prices or ranges", "Dietary notes", "Photos of hero dishes"] }
    ],
    "contentConversionExpectations": [
      "Menu must load fast on mobile; PDF-only menus hurt conversion unless mirrored in HTML."
    ],
    "reviewReputation": [
      { "recommendation": "Prompt happy guests post-visit", "rationale": "Recency matters next to star average in local pack." }
    ],
    "commonMistakes": [
      { "mistake": "Buried hours and parking", "fix": "Repeat hours + parking near map and footer." }
    ],
    "topPerformerPatterns": [
      "Dedicated landing pages for brunch, catering, or private events when those drive margin."
    ],
    "growthOpportunities": [
      { "opportunity": "Structured data for menu and reservations", "why": "Eligible for richer results and fewer wrong clicks." }
    ],
    "recommendedModules": [
      { "module": "Online ordering / reservation embed", "description": "Reduce phone friction for high-intent traffic." }
    ],
    "suggestedSiteStructure": {
      "primaryNav": ["Menu", "Locations", "Catering", "Private events", "About", "Contact"],
      "supportingPagesNote": "Add neighborhood or occasion pages only when you can support unique copy and internal links."
    }
  }
}
```

*(Trimmed arrays in B for readability; real fixtures should be complete per `industryBlueprintPayloadSchema`.)*

---

## Error / partial / empty mock states

Mock and real layers should share **the same error contract** so UI does not fork.

### Recommended error envelope

```json
{
  "ok": false,
  "errorCode": "FETCH_FAILED | BOT_BLOCKED | THIN_CONTENT | PARTIAL_ANALYSIS | BLUEPRINT_NOT_FOUND | VALIDATION_ERROR | RATE_LIMITED | INTERNAL",
  "message": "Human-readable summary for UI.",
  "details": {
    "submittedUrl": "https://example.com",
    "industryId": "restaurant",
    "retryable": true,
    "partial": {
      "auditFacts": null,
      "auditReport": null,
      "completedSteps": ["dns_resolved", "fetch_started"]
    }
  }
}
```

### States to support in mocks and UI

| State | `errorCode` (suggested) | Mock behavior | UI expectation |
|-------|-------------------------|---------------|----------------|
| URL invalid / normalize fail | `VALIDATION_ERROR` | Client or API | Inline field error; no job created. |
| Fetch timeout / connection | `FETCH_FAILED` | Mock returns error envelope | Friendly retry; optional “try industry blueprint.” |
| Site blocks bots / 403 / WAF | `BOT_BLOCKED` | Mock | Explain limitation; offer checklist or manual URL screenshot flow (future). |
| Page too thin (little text, no H1) | `THIN_CONTENT` | Mock partial payload optional | Show what was inferred + “we need more content” CTA. |
| Partial analysis (HTML partial, rules only) | `PARTIAL_ANALYSIS` | `ok: true` with `data.auditReport` flagged or lower confidence | Banner: “Preliminary results”; hide or soften scores. |
| Industry blueprint missing for id | `BLUEPRINT_NOT_FOUND` | Mock | Fallback to `generic_local_services` blueprint or 404 with CTA to contact. |
| Rate limit | `RATE_LIMITED` | Already in API | 429 + message. |

**Partial success (website mode):** Prefer `ok: true` with explicit `analysisCompleteness: 'partial' | 'full'` inside `data` rather than overloading scores.

---

## Industry coverage plan

### v1 (ship with mocks + UI)

Aligned with `src/config/industries.ts` (`HERO_INDUSTRIES`):

| `industryId` | Label |
|--------------|--------|
| `restaurant` | Restaurant |
| `medical-practice` | Medical practice |
| `cleaning-company` | Cleaning company |
| `med-spa` | Med spa |
| `law-firm` | Law firm |
| `auto-shop` | Auto shop |
| `roofing-hvac-plumbing` | Roofing / HVAC / plumbing |
| `retail-store` | Retail store |

Each v1 id MUST have a **blueprint fixture** or a **generated fallback** template.

### Deferred (v2+)

- Additional verticals (e.g. dental, fitness, real estate) only after v1 analytics show demand.
- Multi-location enterprise playbooks (separate blueprint family).

### Unsupported industry

If `industryId` is unknown or legacy:

1. **API:** Return `BLUEPRINT_NOT_FOUND` **or** `200` with `industryId: 'generic-local-service'` and `growthPreviewMeta.mockBlueprintId: 'blueprint-generic-local'` (product choice).
2. **UI:** Never show an empty screen; show generic local-service blueprint + “Tell us more on the contact form.”

---

## Mock realism boundaries

This removes ambiguity between **marketing** and **measured** data.

| Data type | Classification | Rule |
|-----------|----------------|------|
| Hero floating KPIs (“New leads 56”, “Bookings $17.2k”) | **Illustrative marketing defaults** | Unless sourced from **real** analytics integration, label in design/copy as **example** or tie to `growthSnapshot.mockDisclaimer`. **Never** imply these numbers were read from the user’s site without ingestion. |
| Growth chart in hero | **Illustrative** or **preset-only** | Same rule. If tied to a **website audit** session, only show series when `growthSnapshot.source === 'extracted' | 'connected_analytics'`. |
| GBP tablet (#3 pack, 4.9, 128 reviews) | **Illustrative** unless | Values come from **live GBP API** or user-supplied snapshot. |
| Pillar scores + issues + quick wins on **report** | **Analysis-shaped output** | In mock: **preset-driven** but must be **internally consistent** (no “SEO high” copy contradicting a low `seoBasics` score without explanation). |
| Industry blueprint bullets | **Educational / prescriptive** | Not “measured”; never framed as “your site failed X.” |

**Product copy rule:** If the hero stays illustrative while the report is analytical, the disclaimer under the audit CTA should stay explicit (already directionally true in `AuditUrlForm` hero disclaimer).

---

## Example payloads (preset IDs)

Full builders (target location):

- `src/lib/growthPreview/mock/websitePresets.ts`
- `src/lib/growthPreview/mock/industryBlueprints.ts`

| Preset / blueprint | Intent |
|--------------------|--------|
| `preset-cleaning-mi` | Weak local depth + soft CTAs |
| `preset-medspa-tx` | Strong visuals, weak trust / booking clarity |
| `preset-generic-local` | Default when hostname does not match a named preset |
| `blueprint-restaurant`, `blueprint-medical-practice`, `blueprint-contractor-rhvac`, `blueprint-med-spa`, `blueprint-cleaning-company` | Industry mode + **googlePresencePlaybook** |
| `blueprint-generic-local` | Unsupported-industry fallback |

---

## UI mapping (explicit)

### Website audit mode

| UI area | Fields |
|---------|--------|
| Report title + summary | `data.auditReport.summary`, `data.finalUrl` |
| Google snapshot | `data.googlePresence` (+ meta `googlePresenceDataMode`) |
| Gap analysis | `data.gapAnalysis` |
| Customer impact | `data.topCustomerCosts` or `auditReport.issues` |
| Action plan | `data.actionPlan` (or fallback `quickWins`) |
| Scores | `data.auditReport.overallScore`, `pillarScores` |
| Headline / CTA | `recommendedHeadline`, `recommendedCTA` |
| Facts panel | `auditFacts` |
| Hero KPI / chart (when wired) | `growthSnapshot` **only if** sourced; else illustrative |

### Industry blueprint mode

| UI area | Fields |
|---------|--------|
| Headline area | `data.industryLabel`, `executiveSummary` |
| Google / reputation playbook | `googlePresencePlaybook` |
| Checklists | `idealHomepageSections`, `localSeoChecklist`, `recommendedPageTypes` |
| Mistakes / winners | `commonMistakes`, `topPerformerPatterns`, `growthOpportunities` |

---

## View-model layer examples

Raw payloads stay stable; **adapters** map into props the UI can consume.

### `ReportViewModel` (website audit)

```ts
// adapters/toReportViewModel.ts
export type ReportViewModel = {
  pageTitle: string;
  urlDisplay: string;
  industryLabel: string | null;
  overallScore: number;
  pillars: { key: string; label: string; score: number }[];
  summary: string;
  quickWins: { title: string; detail: string; impact?: string }[];
  issues: { severity: string; title: string; detail: string }[];
  suggestedHeadline: string | null;
  suggestedCta: string | null;
  mockPresetId?: string;
};

export function toReportViewModel(d: WebsiteAuditPayload): ReportViewModel {
  const labels: Record<string, string> = {
    messagingClarity: "Messaging",
    conversionReadiness: "Conversion",
    seoBasics: "SEO basics",
    trustSignals: "Trust",
    localBusinessReadiness: "Local readiness",
  };
  return {
    pageTitle: d.auditFacts.pageTitle ?? "Your page",
    urlDisplay: d.finalUrl,
    industryLabel: d.industry,
    overallScore: d.auditReport.overallScore,
    pillars: (Object.keys(d.auditReport.pillarScores) as (keyof typeof labels)[]).map((key) => ({
      key,
      label: labels[key],
      score: d.auditReport.pillarScores[key],
    })),
    summary: d.auditReport.summary,
    quickWins: d.auditReport.quickWins,
    issues: d.auditReport.issues,
    suggestedHeadline: d.auditReport.recommendedHeadline,
    suggestedCta: d.auditReport.recommendedCTA,
    mockPresetId: d.growthPreviewMeta?.mockPresetId,
  };
}
```

### `HeroPreviewModel` (illustrative vs session-bound)

```ts
export type HeroPreviewModel = {
  source: "illustrative" | "website_audit_session";
  kpis: { label: string; value: string; hint?: string }[];
  chart: { title: string; subtitle: string; badge?: string; disclaimer?: string };
  gbp: { businessName: string; categoryLine: string; packRank?: string; rating?: string; reviewCount?: string };
};

/** Until analytics are real, default source is illustrative with a disclaimer. */
export function toHeroPreviewModelFromIllustrative(defaults: HeroPreviewModel): HeroPreviewModel {
  return { ...defaults, source: "illustrative" };
}
```

### `BlueprintViewModel`

```ts
export type BlueprintViewModel = {
  industryLabel: string;
  summary: string;
  sections: { title: string; purpose: string; mustInclude: string[] }[];
  mistakes: { mistake: string; fix: string }[];
  primaryNav: string[];
};

export function toBlueprintViewModel(d: IndustryBlueprintPayload): BlueprintViewModel {
  return {
    industryLabel: d.industryLabel,
    summary: d.executiveSummary,
    sections: d.idealHomepageSections,
    mistakes: d.commonMistakes,
    primaryNav: d.suggestedSiteStructure.primaryNav,
  };
}
```

---

## Mock content / writing standards

1. **Specific:** Name cities, services, and user actions (“tap-to-call,” “service + city page”) not vague “improve SEO.”
2. **Business-oriented:** Owners, not engineers; outcomes (calls, bookings, trust) over stack names.
3. **Non-generic:** No interchangeable adjectives; each preset has a distinct story.
4. **No lorem ipsum** or placeholder Latin.
5. **Internally consistent:** Scores, issues, and summary must align; if copy says “strong trust,” `trustSignals` cannot be 22 without an explanation block.
6. **No false claims:** Mock must not say “we crawled 47 pages” unless `auditFacts` supports it. Label mock model as `mock/...` in `llmModel` or `growthPreviewMeta`.
7. **Contradiction check:** Quick wins must not repeat issues as wins; severity language must match pillar narrative.

---

## Analytics events (staged rollout)

Emit the **same event names** in mock and production so dashboards stay comparable. Suggested payload: `{ jobId?, industryId?, urlHost?, kind, errorCode?, mock: boolean }`.

| Event | When |
|--------|------|
| `url_submitted` | User submits a URL (client, before response). |
| `industry_selected` | Industry dropdown changes (debounced) or on submit. |
| `audit_started` | API accepts request and creates `jobId`. |
| `audit_completed` | Successful `website_audit` response. |
| `analysis_failed` | Error envelope returned (`ok: false`). |
| `blueprint_viewed` | Successful `industry_blueprint` response or blueprint page view. |
| `report_cta_clicked` | e.g. “Get help,” “Book,” “Run again” on report/blueprint. |

**Mock flag:** `mock: true` while backend is stubbed; flip when real pipeline runs for A/B on data quality.

---

## Mock-to-real replacement strategy

### Principles

1. **Single contract per mode** - Types + Zod at the boundary; UI consumes **view models** from adapters.
2. **No mock logic in presentational components** - Data from hooks/providers.
3. **Provider selection** - `getGrowthPreviewResult(input)` switches `mockProvider` vs `httpProvider` via env.

4. **Session storage** - Store the **full success envelope** `{ kind, jobId, data }` keyed by `jobId` so the report route can branch without re-fetching.

5. **Industry-only** - Extend `auditRequestSchema` per **Mode selection rules**; blueprint responses must not fabricate URL-based scores.

### Adapter layer

- **Input:** Raw DTO (mock or real).
- **Output:** `ReportViewModel`, `HeroPreviewModel`, `BlueprintViewModel`.
- **Benefit:** Swap providers without rewiring components.

---

## Recommended file structure (in this repo)

```txt
src/lib/insights/
  schema.ts
  mock.ts
  normalizeUrl.ts
  storage.ts

src/lib/growthPreview/
  types.ts
  schemas/
    industryBlueprint.ts
  mock/
    websitePresets.ts
    selectWebsitePreset.ts
    buildWebsiteAuditMock.ts
    industryBlueprints.ts
    errorFixtures.ts          # optional: THIN_CONTENT, BOT_BLOCKED, etc.
  marketing/
    heroDashboardIllustrative.ts
    growthProofIllustrative.ts
  adapters/
    toReportViewModel.ts
    toBlueprintViewModel.ts
    toHeroPreviewModel.ts

docs/
  MOCK_DATA_STRATEGY_FOR_AUDIT_AND_INDUSTRY_MODES.md
```

---

## Immediate next steps

1. Align `POST /api/insights` response with **`ok` + `kind`** envelope (or document transitional mapping from current `{ success, data }`).
2. Implement **error fixtures** in `mock/errorFixtures.ts` for QA and UI states.
3. Wire **analytics** helpers (`trackAuditEvent`) once product picks a vendor; keep names stable.
4. Add **`blueprint-generic-local`** and map unsupported industries per **Industry coverage plan**.
5. Refactor report route to `toReportViewModel` + blueprint branch using `BlueprintViewModel`.

---

## Quality bar

Mock content should read like **plausible PM + local SEO + CRO notes**, not filler. Presets are named, traceable via `growthPreviewMeta`, and replaceable 1:1 with backend payloads that satisfy the same schemas. **Marketing visuals** and **analysis outputs** stay separated per **Mock realism boundaries**.
