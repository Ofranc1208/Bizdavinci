# Phase 4 - Tools Hub + Pricing System

> **Goal:** Launch free-value tools that pre-qualify leads, and make pricing/conversion paths explicit.  
> **Status:** 🔄 In Progress  
> **Estimated Time:** 7–10 days  
> **Depends On:** Phase 3 complete  
> **Gate:** All 4 MVP tools produce deterministic results, pricing page renders from config, tool/pricing CTAs hand off to chat/contact correctly.

---

## MVP Routes (This Phase)

| Route | Type | Purpose |
|-------|------|---------|
| `/tools` | Page | Tools directory |
| `/tools/website-cost-estimator` | Page | Cost estimator wizard |
| `/tools/timeline-planner` | Page | Timeline planner wizard |
| `/tools/questionnaire-generator` | Page | Project questionnaire |
| `/tools/automation-finder` | Page | Automation opportunity finder |
| `/pricing` | Page | Packages + add-ons |
| `/work` | Page | Portfolio / case studies |
| `/faqs` | Page | FAQ page |
| `/learn/ai-automation` | Page | AI benefits (educational) |

---

## Part A: Tools Hub

### `/tools` Page Structure

1. **Hero** - "Free tools to plan your website or app" + subtitle + CTAs
2. **Tool Categories** - Estimators, Planners, Decision helpers, Automation
3. **Tool Cards** - Name, description, time badge, output badge, CTA

### MVP Tools (4)

| # | Tool | Inputs | Output |
|---|------|--------|--------|
| 1 | **Website Cost Estimator** | Site type, pages, design level, CMS, integrations, timeline | Price range + breakdown, timeline, suggested package |
| 2 | **Timeline Planner** | Build type, scope, content readiness, approval speed | Gantt milestones, best/typical/worst timelines |
| 3 | **Project Questionnaire Generator** | Goals, pages/features, branding, examples | Downloadable questionnaire, copy-to-clipboard |
| 4 | **Automation Opportunity Finder** | Repetitive tasks, current tools | 3 automation ideas + impact assessment |

### Tool Page Structure (`/tools/[slug]`)

1. Intro - what it does, who it's for
2. Form steps - multi-step wizard (Zod validation)
3. Result summary - computed output
4. Export: copy-to-clipboard (V1), PDF download (V2)
5. CTA row: "Get a quote" → contact/chat, "Ask AI" → chat with context

**Architecture:**
- `app/tools/[slug]/page.tsx` = Server Component (metadata + route data)
- Renders `<ToolClient slug={slug} />` = Client Component (wizard state)
- Calculator logic in `src/tools/<tool>/calculator.ts` (pure functions, testable)
- Validation in `src/tools/<tool>/schema.ts` (Zod)

### Folder Structure

```
src/tools/
├── registry.ts                    # Tool definitions: slug, title, category
├── cost-estimator/
│   ├── schema.ts                  # Zod form schema
│   ├── calculator.ts              # Deterministic scoring
│   └── CostEstimatorTool.tsx
├── questionnaire-generator/
│   ├── schema.ts
│   └── QuestionnaireGeneratorTool.tsx
├── timeline-planner/
│   ├── schema.ts
│   ├── calculator.ts
│   └── TimelinePlannerTool.tsx
└── automation-finder/
    ├── schema.ts
    └── AutomationFinderTool.tsx

src/components/tools/
├── ToolLayout.tsx                 # Shared wizard layout
├── ToolCard.tsx                   # Card for /tools directory
└── ToolResultCTA.tsx              # CTA row after results
```

### Tool Registry (`src/tools/registry.ts`)

```typescript
interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  category: 'estimators' | 'planners' | 'decision' | 'automation' | 'leadgen';
  timeMinutes: number;
  outputType: 'estimate' | 'pdf' | 'plan' | 'checklist';
}
```

### Shared Data Models

**ProjectBrief** - normalized object shared across tools:

```typescript
interface ProjectBrief {
  businessType?: string;
  goal?: string;
  buildType: 'website' | 'webapp' | 'mobile' | 'automation';
  pages: number;
  features: string[];
  integrations: string[];
  designLevel: 'template' | 'semi_custom' | 'custom';
  cmsNeeded: boolean;
  seoLevel: 'basic' | 'advanced';
  contentReadiness: 'ready' | 'partial' | 'not_ready';
  approvalSpeed: 'fast' | 'average' | 'slow';
  timelineUrgency: 'normal' | 'rush';
  budgetRange?: 'under_3k' | '3k_8k' | '8k_20k' | '20k_plus';
}
```

**ToolResult** - standard output contract:

```typescript
interface ToolResult {
  toolSlug: string;
  summary: string;
  score: number;
  confidence: 'tight' | 'medium' | 'wide';
  estimatedCostMin?: number;
  estimatedCostMax?: number;
  estimatedTimelineMinWeeks?: number;
  estimatedTimelineMaxWeeks?: number;
  suggestedPackage?: 'bronze' | 'silver' | 'platinum';
  riskFlags: string[];
  recommendations: string[];
  payloadVersion: 'v1';
}
```

### Deterministic Scoring Model (`src/config/estimator.ts`)

```typescript
export const WEIGHTS = {
  baseByBuildType: { website: 20, webapp: 35, mobile: 40, automation: 30 },
  pagePoint: 2,
  featurePoints: { booking: 8, payments: 10, auth: 8, dashboard: 12, blog: 5, multilingual: 8 },
  integrationPoint: 4,
  designMultiplier: { template: 1.0, semi_custom: 1.2, custom: 1.5 },
  cmsBonus: 6,
  seoBonus: { basic: 4, advanced: 10 },
  contentPenalty: { ready: 0, partial: 6, not_ready: 12 },
  approvalPenalty: { fast: 0, average: 3, slow: 8 },
  rushMultiplier: { normal: 1.0, rush: 1.25 },
} as const;

export const SCORE_THRESHOLDS = { smallMax: 44, mediumMax: 85 } as const;
export const COST_UNITS = { baseUnitMin: 90, baseUnitMax: 150 } as const;
```

**Flow:** baseScore → complexityScore (with multipliers) → timeline band → cost band → package suggestion

### Tool → Chat Handoff

When user finishes a tool, "Ask about this" button calls:
```typescript
openChat({ tool: 'cost-estimator', context: toolResult })
```

### Acceptance Tests (Required)

| Test Case | Expected |
|-----------|----------|
| Basic brochure (5 pages, template) | Low score, Bronze, short timeline |
| Service business (8 pages, 2 integrations) | Mid score, Silver, medium timeline |
| Advanced custom (12+ pages, auth/dashboard) | High score, Platinum, long timeline |
| Missing content + rush | Wider confidence, risk flags |
| Same input repeated | Identical ToolResult every run |

---

## Part B: Pricing System

### `/pricing` Page Structure

1. **Hero** - "Simple, transparent pricing"
2. **Package cards** (3-column grid) - Name, tagline, price, features, timeline, CTA
3. **Add-ons section** - Grid of add-on cards
4. **FAQ** - Common pricing questions
5. **CTA row** - "Not sure? Use our Cost Estimator" + "Start Here"

### Pricing Config (`src/config/pricing.ts`)

```typescript
interface Package {
  id: 'bronze' | 'silver' | 'platinum';
  name: string;
  tagline: string;
  price: number;
  priceLabel?: string;
  features: string[];
  timeline: string;
  exclusions?: string[];
  popular?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: number | string;
  description: string;
}
```

### Packages (Placeholders - values set in config)

| Package | Scope |
|---------|-------|
| **Bronze** | Up to 5 pages, responsive, basic SEO, contact form, 1 revision |
| **Silver** | Up to 10 pages, CMS, blog, analytics, 2 revisions |
| **Platinum** | Custom UI, integrations, dashboards, automation, 3 revisions + support |

### Components

| Component | Path |
|-----------|------|
| PackageCard | `src/components/pricing/PackageCard.tsx` |
| AddOnCard | `src/components/pricing/AddOnCard.tsx` |

### Pricing → Chat Handoff

```typescript
<button onClick={() => openChat({ package: 'silver' })}>
  Get Silver Quote
</button>
```

---

## Part C: Supporting Pages

### `/work` Page

Portfolio / case studies rendering from `src/data/projects.ts`. Grid of project cards with tech tags, descriptions, links.

### `/faqs` Page

FAQ accordion with structured data (FAQPage schema for rich results).

### `/learn/ai-automation` Page

Educational page following the 8-part template:
1. Hero → 2. Problem/Impact → 3. Deliverables → 4. How it works → 5. Industry examples → 6. Tool CTAs → 7. FAQs → 8. Bottom CTA

---

## Test Checklist

| Check | Status |
|-------|--------|
| `/tools` lists all 4 tools with cards | ☐ |
| Each tool card links to working tool page | ☐ |
| Cost Estimator wizard completes and shows result | ☐ |
| Timeline Planner produces timeline visualization | ☐ |
| Questionnaire Generator produces output | ☐ |
| Automation Finder produces recommendations | ☐ |
| Tool results include CTA to pricing/contact/chat | ☐ |
| Deterministic tests pass (same input = same output) | ☐ |
| `/pricing` renders packages from config (no hardcoded values) | ☐ |
| Package CTA sends context to chat/contact | ☐ |
| Add-ons render correctly | ☐ |
| `/work` displays project cards | ☐ |
| `/faqs` renders with accordion + FAQ schema | ☐ |
| `/learn/ai-automation` renders all sections | ☐ |
| All pages load < 3s on mobile | ☐ |
| Mobile + desktop layouts pass QA | ☐ |

## Gate Output

- Working lead-qualification tools live
- Conversion-ready pricing experience
- All supporting pages functional
- Ready for Phase 5
