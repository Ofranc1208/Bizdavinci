# Biz DaVinci - Project Direction & Asset Audit

**Version:** 3 - *Adds scoring philosophy, AI output guardrails, and MVP success metrics (2026-04-16).*  
**Document purpose:** Re-orient the repo around the **AI-powered website growth audit** product (local businesses, URL-in → insights-out). This file inventories **what exists today** (verified against the codebase), **what is missing**, **reference material** in `Reference Folders/`, and a **phased build order**.  
**Last audited:** 2026-04-16 against `myprofile-site/` and `Reference Folders/` in this workspace.

---

## Table of contents

1. [Project vision & positioning](#1-project-vision--positioning)
2. [Target audience](#2-target-audience)
3. [Product direction (north star)](#3-product-direction-north-star)
4. [MVP v1 (must-have only)](#4-mvp-v1-must-have-only)
5. [What the homepage should do now](#5-what-the-homepage-should-do-now)
6. [Draft data model & schemas](#6-draft-data-model--schemas)
7. [Scoring philosophy](#7-scoring-philosophy)
8. [Guardrails for AI output](#8-guardrails-for-ai-output)
9. [Success metrics for MVP](#9-success-metrics-for-mvp)
10. [Keep vs deprioritize (legacy portfolio identity)](#10-keep-vs-deprioritize-legacy-portfolio-identity)
11. [Repository layout](#11-repository-layout)
12. [Current assets (myprofile-site)](#12-current-assets-myprofile-site)
13. [Reference folders (not wired to the app)](#13-reference-folders-not-wired-to-the-app)
14. [Missing assets & capabilities](#14-missing-assets--capabilities)
15. [UX / design gap analysis](#15-ux--design-gap-analysis)
16. [Architecture gap analysis](#16-architecture-gap-analysis)
17. [Proposed product modules](#17-proposed-product-modules)
18. [Suggested system architecture](#18-suggested-system-architecture)
19. [Recommended component structure (future)](#19-recommended-component-structure-future)
20. [Phased implementation roadmap](#20-phased-implementation-roadmap)
21. [Immediate next actions](#21-immediate-next-actions)
22. [Open questions & assumptions](#22-open-questions--assumptions)
23. [Reuse map (existing → future product)](#23-reuse-map-existing--future-product)
24. [Document coverage & known omissions](#24-document-coverage--known-omissions)

---

## 1. Project vision & positioning

**Vision:** A **modern, premium, conversion-focused** experience where a **local business owner** submits their **website URL** (and context such as industry), and receives **clear, actionable insight** on whether the site behaves as a **growth asset** or a **digital business card**-with a path toward industry-specific recommendations and services.

**Core value proposition (locked):**  
*“Turn your website from a digital business card into a revenue engine.”*

**What the product is *not* (going forward):** A generic freelancer portfolio, a vague developer showcase, or a disconnected SEO blog without a central audit narrative.

---

## 2. Target audience

Local business owners across verticals already reflected in `myprofile-site/src/config/industries.ts` (e.g. restaurant, medical practice, cleaning company, med spa, law firm, auto shop, roofing/HVAC/plumbing, retail store).

---

## 3. Product direction (north star)

| Stage | User action | System behavior |
|-------|-------------|-----------------|
| 1 | Lands on marketing site | Understands product: audit, growth, local SEO, trust, conversion |
| 2 | Enters **URL** (+ optional industry) | Validates input; safe fetch / analysis pipeline triggered |
| 3 | Waits | Playwright (or equivalent) captures page signals; rules extract structure |
| 4 | - | Optional enrichment (e.g. public review/business signals where appropriate & legal) |
| 5 | - | Structured payload → **OpenAI** (or similar) for narrative + prioritized recommendations |
| 6 | Views **report** | Sections: what works, what hurts conversions/SEO, trust gaps, quick wins, suggested headline/CTA, next steps |
| 7 | Converts | Routed to industry-specific plan, contact, or booking |

**Hybrid intelligence:** Deterministic extraction/scoring where possible; LLM for explanation and prioritization-not for inventing facts about the page without grounding.

---

## 4. MVP v1 (must-have only)

**Locked definition:** The first shippable product is **not** full Playwright parity, industry playbooks, or reputation enrichment. It is a **single-page, fetch-based** pass over the **homepage HTML** plus a **structured report** and **results UI**.

| Step | Requirement |
|------|----------------|
| **Input** | User enters **URL** (validated: scheme, length, basic SSRF hygiene). Optional **industry** (reuse `IndustrySelectorPanel` / `HERO_INDUSTRIES`). |
| **Fetch** | App retrieves **homepage only** (follow redirects; record `finalUrl`; timeout + size cap). v1 may use **`fetch` + HTML parse**-not Playwright-if clearly documented. |
| **Deterministic extraction** | Parse and store: **title**, **meta description**, **H1**, **H2s** (ordered list), **primary CTAs** (button/link text + `href` where detectable), **contact signals** (phone, email, address patterns), **internal links** (sample + count). |
| **AI report** | OpenAI consumes **only** the structured `AuditFacts` payload (+ optional industry); output matches **`AuditReport`** shape (see [§6](#6-draft-data-model--schemas)). |
| **Results** | Dedicated **results page** shows **scores**, **issues**, **quick wins**, and a **CTA** (contact / deeper plan). No account system required for v1 if a shareable `jobId` URL is acceptable. |

**Explicitly out of scope for MVP v1:** Multi-page crawl, Core Web Vitals lab data, screenshot capture, Google Business / reviews, PDF export, user dashboards.

**Funnel metrics for this slice:** [§9](#9-success-metrics-for-mvp).

---

## 5. What the homepage should do now

The **front-end priority** is to make the marketing surface **indistinguishable from the product entry point**. Until the audit flow exists end-to-end, the homepage should still **read** and **behave** like step 1 of that flow-not a parallel “hire a developer” story.

| Priority | Behavior |
|----------|-----------|
| **1 - One-sentence product** | Above the fold: what the tool *does* (URL → growth audit for local businesses) in **one** clear line. |
| **2 - URL in** | Primary CTA is **enter your website URL** (not only “Get started” → generic contact). |
| **3 - Optional industry** | Industry selector **pre-fills context** for the audit (query params or form state)-same mental model as today, wired to audit not only contact. |
| **4 - Proof, not decoration** | Replace or clearly label decorative “growth snapshot” with **sample report preview**, methodology strip, or “what we check” list tied to real signals. |
| **5 - Into the flow** | Submit → **audit job** (or stub) → **results**; contact remains **after** insight, not instead of it. |

This section **implements** the north star’s stage 1–2; [§15](#15-ux--design-gap-analysis) lists current gaps against it.

---

## 6. Draft data model & schemas

**Purpose:** One canonical shape so `POST /api/audit`, storage, prompts, and `app/audit/[jobId]` all agree. Names below are **suggested**; implement as **Zod** (`src/lib/audit/schema.ts`) and version with `schemaVersion`.

### 6.1 `AuditJob` (request + run metadata)

| Field | Type | Notes |
|-------|------|--------|
| `jobId` | string (uuid) | Public id for `/audit/[jobId]`. |
| `submittedUrl` | string | Raw user input. |
| `finalUrl` | string | After redirects; canonical fetch target. |
| `industry` | string \| null | From selector; optional in v1. |
| `status` | enum | e.g. `queued` \| `running` \| `completed` \| `failed`. |
| `createdAt` | ISO string | - |
| `schemaVersion` | string | e.g. `1.0.0`. |

### 6.2 `AuditFacts` (deterministic extraction only)

| Field | Type | Notes |
|-------|------|--------|
| `pageTitle` | string \| null | `<title>`. |
| `metaDescription` | string \| null | Primary meta description. |
| `h1` | string \| null | First H1 text; optionally `h1All: string[]`. |
| `h2s` | string[] | Ordered. |
| `primaryCtas` | `{ text: string; href?: string }[]` | Buttons/links heuristic. |
| `contactSignals` | `{ phones?: string[]; emails?: string[]; addresses?: string[] }` | Regex / microdata later. |
| `internalLinks` | `{ href: string; text?: string }[]` | Cap list length in v1. |
| `trustSignals` | object (optional v1) | e.g. presence of reviews widget, SSL, privacy link-expand later. |
| `seoSignals` | object | e.g. title length, meta missing, single H1-**rules**, not LLM. |
| `conversionSignals` | object | e.g. CTA count, above-fold CTA, form presence-**rules**. |

### 6.3 `AuditReport` (scores + LLM narrative)

| Field | Type | Notes |
|-------|------|--------|
| `overallScore` | number (e.g. 0–100) | Derived **only** from rule-based pillar scores and documented weighting ([§7](#7-scoring-philosophy)); not a free-form LLM guess. |
| `pillarScores` | object (recommended) | Keys: `messagingClarity`, `conversionReadiness`, `seoBasics`, `trustSignals`, `localBusinessReadiness` (each 0–100). See [§7](#7-scoring-philosophy). |
| `quickWins` | `{ title: string; detail: string; impact?: string }[]` | Top 3–5. |
| `issues` | `{ severity: string; title: string; detail: string }[]` | Mapped to facts. |
| `recommendedHeadline` | string \| null | Grounded in `h1` / value prop gaps. |
| `recommendedCTA` | string \| null | Grounded in `primaryCtas`. |
| `summary` | string | Short executive summary. |
| `llmModel` | string | For reproducibility. |

**Rule:** The LLM must not assert on-page facts not present in `AuditFacts` (or must label them as industry defaults). Full output rules: [§8](#8-guardrails-for-ai-output).

---

## 7. Scoring philosophy

**Purpose:** Prevent ad hoc “vibes-based” `overallScore` logic. Scores are **deterministic** from `AuditFacts` + `seoSignals` / `conversionSignals` / `trustSignals` (and similar rule outputs). The LLM **narrates and prioritizes**; it does not invent the numbers unless you explicitly choose a hybrid model later (document that if so).

### 7.1 Five pillars (v1)

| Pillar | What it measures (homepage, v1) |
|--------|----------------------------------|
| **Messaging clarity** | H1/title/meta alignment; obvious value proposition; heading hierarchy (H1/H2) supports scanning. |
| **Conversion readiness** | Primary CTAs visible and specific; forms or tap-to-call paths; friction signals (e.g. no CTA above the fold heuristic). |
| **SEO basics** | Title/description presence and length; single clear H1; basic duplicate-title risk; crawlable signals available from static HTML. |
| **Trust signals** | Contact info discoverable; privacy/terms links if detectable; schema or trust markers you can derive without third-party APIs in v1. |
| **Local business readiness** | Name/address/phone patterns; “local” cues (service area, map embeds, location copy) inferred from **extracted text only**. |

### 7.2 `overallScore` (default v1)

1. Compute a **0–100 sub-score per pillar** using checked rules (checklist or weighted deductions-implement in code, not in the prompt).  
2. **Default weights:** **20% each** (equal split) until product tuning says otherwise.  
3. `overallScore` = weighted sum of the five sub-scores, rounded to an integer.  
4. Persist **`pillarScores`** on `AuditReport` so the UI can show a breakdown and you can change weights without confusing historical jobs (store `scoringVersion` if needed). **Suggested property names:** `messagingClarity`, `conversionReadiness`, `seoBasics`, `trustSignals`, `localBusinessReadiness`.

---

## 8. Guardrails for AI output

These rules apply to **all** LLM-generated fields on `AuditReport` (summary, quick wins, issue copy, recommendations).

| Guardrail | Requirement |
|-----------|--------------|
| **Grounding** | The model must **only** treat as “facts” what appears in `AuditFacts` (and rule-derived signal objects). If it generalizes from industry or best practice, label that as **suggestion**, not as something observed on the page. |
| **Observed vs inferred** | **Observed issues** must tie to a specific extracted field or rule flag. **Inferred suggestions** (e.g. “consider adding…”) must be phrased as recommendations, not as current-state claims. |
| **No unmeasured claims** | Do **not** claim search **rankings**, **traffic**, **Core Web Vitals**, or **competitor performance** unless those values are **actually measured** and present in the job payload. |
| **No fabricated contact or legal facts** | Do not invent phone numbers, addresses, awards, or review counts not extracted. |
| **Consistency with scores** | Narrative severity should not contradict `pillarScores` / `overallScore` without explanation (e.g. “SEO basics scored high but messaging clarity is hurting conversions”). |

Prompting and eval fixtures should include **failure cases** (model over-claiming) and reject patterns in structured output validation where possible.

---

## 9. Success metrics for MVP

**Purpose:** Treat the audit like a **product funnel**, not a one-off build. Instrument minimally in v1; expand in “Polish” phase.

| Metric | Definition | Why it matters |
|--------|------------|----------------|
| **URL submission rate** | Sessions where user **submits** a valid URL / starts a job | Top-of-funnel activation |
| **Report completion rate** | `status === completed` ÷ jobs **started** | Pipeline reliability + UX clarity |
| **Time to report** | p50 / p95 time from submit to **first** completed report view | Latency perception; drives async vs sync decisions |
| **Failed audit rate** | Jobs `failed` ÷ started (by error class: fetch, timeout, parse, LLM) | Quality of fetch rules and infra |
| **Contact conversion after report** | Contact submits (or CTA clicks) **after** viewing a report ÷ completed reports | Proof the insight drives leads |

**Note:** Baselines and targets are TBD; the priority is **having** these events (even logging + DB counts) before optimizing copy or scoring weights.

---

## 10. Keep vs deprioritize (legacy portfolio identity)

**Intent:** Stop preserving **freelancer credibility** at the expense of **product clarity**. The items below are **defaults** for Version 2 planning; adjust only with an explicit reason.

| Asset / area | Recommendation |
|----------------|----------------|
| **`SkillsSection`** | **Deprioritize or remove** from homepage; move to `/about` only if still needed for hiring. Not part of audit MVP. |
| **`WorkSection` + `/work` + `data/projects.ts`** | **Deprioritize** as primary nav; **portfolio case studies** only if reframed as “audit before/after.” Otherwise keep **off** homepage. |
| **`ServicesSection` (generic services)** | **Remove or rewrite** as “what the audit covers” (modules), not dev-for-hire services. |
| **`ChatWidget` / “Debbie” + `POST /api/chat`** | **Do not invest** in general consulting chat for v1. **Either** remove from UI **or** narrow to **“Ask about your report”** after `AuditReport` exists (context = job + facts). |
| **`/tools`, `/pricing` (legacy framing)** | **Keep** only if copy aligns with audit product; otherwise tuck under Resources until rewritten. |
| **`config/businessInfo.ts`** | **Must** be rewritten; until then it **contradicts** [§5](#5-what-the-homepage-should-do-now). |

For **what to reuse** without deletion, see [§23](#23-reuse-map-existing--future-product).

---

## 11. Repository layout

| Path | Role |
|------|------|
| `myprofile-site/` | **Production Next.js 16 app** (App Router, `src/app`). This is the deployable product surface today. |
| `docs/` | Phase docs, SEO strategy, legacy `myprofile.md` spec (still oriented to “freelancer portfolio” in places-**treat as historical unless updated**). |
| `Reference Folders/` | **Non-imported** reference code: Playwright automation project, legacy chat architectures. **Not bundled** into `myprofile-site`. |
| Root `package.json` | Proxies scripts into `myprofile-site` (`dev`, `build`, `lint`, `typecheck`). |

There is **no** `playwright` dependency in `myprofile-site/package.json` today. Playwright exists **only** under `Reference Folders/cloudnet-bot/`.

---

## 12. Current assets (myprofile-site)

Grounded inventory of **real files** under `myprofile-site/src` and related config.

### 12.1 App routes (`src/app/`)

| Route | File | Notes |
|-------|------|--------|
| `/` | `page.tsx` | Homepage: `HeroSection`, `HeroProofStrip`, `SecondaryCTASection`, `SkillsSection`, `WorkSection`, `ServicesSection`, `CTASection`. **No URL audit flow.** |
| `/contact` | `contact/page.tsx` | Contact page; wraps `ContactForm` in `Suspense` for `useSearchParams`. |
| `/pricing`, `/work`, `/tools`, `/tools/[slug]` | respective `page.tsx` | Marketing/tools; cost estimator in `ToolRuntime` for one slug. |
| `/learn/ai-automation`, `/faqs`, `/privacy`, `/terms` | respective `page.tsx` | Content/legal. |
| **API** `POST /api/chat` | `api/chat/route.ts` | OpenAI `gpt-4o-mini` chat; Zod body; Upstash rate limit; guardrails; `industryDetector`; fallback if no API key. **Not** URL audit. |
| **API** `POST /api/contact` | `api/contact/route.ts` | Zod; Firestore via `getAdminDb()` when configured; rate limit. |
| SEO | `robots.ts`, `sitemap.ts`, `llms.txt/route.ts`, `ai.txt/route.ts` | Present. |
| Global | `layout.tsx`, `globals.css` | Root layout; imports design tokens via `src/styles/index.css`. |

### 12.2 Styling system

| Asset | Location |
|-------|----------|
| Design tokens | `src/styles/tokens.css` (colors, radii, shadows, nav height) |
| Base + utilities | `src/styles/base.css`, `utilities.css`, `pages.css` |
| Bundle entry | `src/styles/index.css` ← imported from `src/app/globals.css` |
| Component styles | CSS Modules (`*.module.css`) colocated with components |
| **Tailwind** | **Not used** |

### 12.3 Homepage / marketing components

| Component | Path | Role |
|-----------|------|------|
| `HeroSection` | `components/home/HeroSection.tsx` | Headline, subhead, **industry selector** (`IndustrySelectorPanel`), bullets, trust row, `HeroDashboard` (decorative metrics). |
| `HeroProofStrip` | `components/home/HeroProofStrip.tsx` | Four value props with inline SVGs. |
| `SecondaryCTASection` | `components/home/SecondaryCTASection.tsx` | Second narrative + inline industry selector. |
| `HeroDashboard` | `components/home/HeroDashboard.tsx` | **Static** “Growth snapshot” UI-no live data. |
| `IndustrySelectorPanel` | `components/home/IndustrySelectorPanel.tsx` | Client: select industry → `router.push(/contact?industry=...)`. |
| `SkillsSection`, `WorkSection`, `ServicesSection`, `CTASection` | `components/home/*` | Still largely **portfolio/stack** framing via `businessInfo` / project data. |
| `Navbar` | `components/layout/Navbar.tsx` | Dropdowns (Industries, How it works, Resources), **Get Started** → `/contact`. |
| `Footer` | `components/layout/Footer.tsx` | Standard footer. |

### 12.4 Forms & lead capture

| Asset | Path |
|-------|------|
| `ContactForm` | `components/contact/ContactForm.tsx` | Fields: name, email, phone, projectType, budget, message. Prepends `?industry=` from URL into message. **No website URL field.** |

### 12.5 Chat

| Asset | Path |
|-------|------|
| `ChatWidget` | `components/chat/ChatWidget.tsx` | Client widget; intake steps + `fetch('/api/chat')`. “Debbie” assistant positioning. |

### 12.6 Config & data

| File | Purpose |
|------|---------|
| `config/industries.ts` | `HERO_INDUSTRIES` list (id + label)-**reusable** for industry routing. |
| `config/site.ts`, `config/pricing.ts`, `config/estimator.ts` | Site URL, pricing packages, estimator math. |
| `config/businessInfo.ts` | **Still describes “Full-Stack Developer”**, stack blurbs, legacy industry list-**misaligned** with audit product until rewritten. |
| `data/projects.ts` | Portfolio projects for `/work`. |

### 12.7 Libraries (`src/lib/`)

| Module | Purpose |
|--------|---------|
| `openai/config.ts` | `openai` client singleton from `OPENAI_API_KEY`. |
| `chat/guardrails.ts`, `chat/fallback.ts`, `chat/industryDetector.ts` | Keyword-based industry + guardrails for **chat**, not page audit. |
| `firebase/admin.ts` | Firebase Admin for contact API. |
| `ratelimit.ts` | Upstash IP rate limiting. |
| `seo/metadata.ts` | `generateMetadata` helper. |

### 12.8 SEO components

| Asset | Path |
|-------|------|
| `StructuredData` | `components/SEO/StructuredData.tsx` |
| Organization/WebSite JSON-LD in `layout.tsx` | Basic; **not** LocalBusiness-rich for a specific address (see gaps). |

### 12.9 Tools

| Asset | Path |
|-------|------|
| `tools/registry.ts`, `ToolCard`, `ToolRuntime` | Free tools hub; estimator logic-**orthogonal** to URL audit unless repurposed as “preview” tools. |

### 12.10 Types & testing

| Asset | Notes |
|-------|--------|
| `types/chat.ts` | Chat-related types. |
| `vitest`, `@testing-library/react` in `devDependencies` | **No** test files observed under `src/` in this audit pass. |
| `eslint.config.mjs` | ESLint 9 + `eslint-config-next`. |

### 12.11 Dependencies (high signal)

From `myprofile-site/package.json`:

- **Present:** `next`, `react`, `openai`, `firebase` / `firebase-admin`, `zod`, `@upstash/ratelimit`, `framer-motion`.
- **Absent:** `playwright` / `@playwright/test` on the **app** package.
- **`framer-motion`:** Used by `PathPicker` only (see dead code).
- **Analytics:** No `gtag`, Plausible, or Segment in source grep; Firebase Analytics may exist only as transitive deps from `firebase` client (not wired in reviewed files).

### 12.12 Images / public assets

`myprofile-site/public/` was **empty** at last check ([§24](#24-document-coverage--known-omissions)); `businessInfo` references `/assets/images/profile.jpg`-add the file or change the path before launch.

### 12.13 Dead / orphaned code (honest callout)

| Item | Evidence |
|------|----------|
| `PathPicker` | `grep` shows **only** `PathPicker.tsx` defines it-**no imports** elsewhere after homepage refactors. Still depends on `framer-motion`. |
| `docs/myprofile.md` & phase docs | Describe **portfolio MVP**; useful process history but **conflict** with new product story until revised. |

---

## 13. Reference folders (not wired to the app)

These folders live under `Reference Folders/` and are **not imported** by `myprofile-site`. They inform **feasibility** and **patterns**, not current runtime behavior.

### 13.1 `Reference Folders/cloudnet-bot/`

- **Stack:** Node, `express`, **`playwright`**, `@playwright/test`, `better-sqlite3`, `@google/generative-ai`, dotenv.
- **Scripts:** `test:e2e`: `playwright test`; dashboard and batch CSV tooling; `docs/CASE-STUDY-PLAYWRIGHT-AUTOMATION.txt` describes production Playwright patterns (sessions, checkpointing, logging).
- **Relevance:** Strong **reference** for running Playwright in a **long-lived Node process** or worker-not copy-paste into Vercel serverless without redesign.
- **Caveat:** Contains `.env.local`, `session.json`, CSV outputs-**do not commit secrets**; treat as developer artifact.

### 13.2 `Reference Folders/chatrefecne 1/`

- **Content:** “Chat Context Orchestra” pattern-`MessageOrchestrator`, file/text processors, modal managers.
- **Relevance:** Architectural ideas for **complex chat UX** if the audit product adds a multi-step assistant; **not** domain-ready for website audit.

### 13.3 `Reference Folders/chatrefrecne 2/`

- **Content:** Deterministic `answerRouter`, health/supplement domain, cache layer, static responses.
- **Relevance:** Patterns for **routing + guardrails + caching**; domain logic is **not** applicable; **do not** merge blindly.

---

## 14. Missing assets & capabilities

What the **north-star product** needs but **does not exist** in `myprofile-site` today (verified):

| Capability | Status |
|------------|--------|
| URL input + validation (scheme, length, SSRF-safe allowlist, public-only) | **Missing** |
| Website analysis API route (`POST /api/audit` or similar) | **Missing** |
| Playwright (or puppeteer) runner **inside** the Next app | **Missing** (no dependency) |
| Extraction pipeline (DOM, meta, headings, CTAs, phones, schema.org, performance hints) | **Missing** |
| Structured **report schema** (JSON) + versioning | **Missing** |
| OpenAI **structured output** path tied to extracted facts | **Missing** (chat is freeform text) |
| Results page `/audit/[id]` or `/report?...` | **Missing** |
| Job queue / async processing (likely required for Playwright) | **Missing** |
| Storage for audit runs (DB / KV / object store) | **Missing** |
| Google Business Profile scraping / Places API integration | **Missing** (and legally/ToS-sensitive-design explicitly) |
| SSRF / timeout / size limits / robots respect policy | **Missing** |
| Observability (structured logs, trace ids, failure metrics) | **Missing** |
| Admin config (prompt versions, model, feature flags) | **Missing** |
| Industry **landing pages** (`/restaurants`, etc.) | **Missing** |
| Analytics events (funnel: URL submitted → report viewed → contact) | **Missing** in app source |

---

## 15. UX / design gap analysis

**Relative to “AI website growth audit platform”:**

| Gap | Detail |
|-----|--------|
| **Primary action** | Hero optimizes for **industry → contact**, not **URL → audit**. No URL field. |
| **Proof** | `HeroDashboard` is **illustrative**, not proof of product capability-risk of feeling decorative unless labeled or replaced with real preview. |
| **Portfolio sections** | `SkillsSection`, `WorkSection`, `ServicesSection` still read as **developer credibility**, not **audit SaaS**. |
| **Chat positioning** | `ChatWidget` + `/api/chat` reinforce **consulting chat**, not **report generation**. |
| **Trust** | No case studies of audits, no sample report PDF, no logos, no methodology strip tied to URL analysis. |
| **Conversion path** | Strong path to **contact**; weak path to **productized audit**. |
| **Mobile** | Recent hero work improved rhythm; **floating chat** still competes for attention (already mitigated by left dock on small screens). |

Messaging in `config/businessInfo.ts` still says **“Full-Stack Developer”**-directly conflicts with new positioning until updated.

---

## 16. Architecture gap analysis

### 16.1 What is structured well

- **Next.js App Router** with `src/app`, colocated API routes.
- **Zod** on API inputs; **rate limiting** pattern established.
- **Design tokens** centralized in `src/styles/*.css`.
- **OpenAI client** singleton; guardrails for chat.
- **Firebase** optional path for inquiries.

### 16.2 What is messy or risky

- **Product story split:** Marketing UI moved toward “local growth”; `businessInfo` + `docs/` still encode **portfolio** story-**single source of truth** needed.
- **Orphan `PathPicker` + framer-motion:** Extra weight and confusion unless removed or repurposed.
- **No separation** between “marketing site” and “audit application” modules-everything is flat under `components/home/`.
- **Playwright in serverless:** Typical Vercel **function timeouts** and **bundle size** make **inline** Playwright in route handlers **non-trivial**. Reference `cloudnet-bot` assumes **Node worker** model-likely need **queue + worker** (or external crawl service) for MVP+.

### 16.3 Refactor targets (later, not mandatory day one)

- Split `components/audit/` (URL form, progress, report) vs `components/marketing/`.
- Replace decorative dashboard with **real summary** component fed by API.
- Centralize **industry** + **audit** types in `src/types/audit.ts` (new).

---

## 17. Proposed product modules

| Module | Responsibility |
|--------|----------------|
| **Marketing shell** | Homepage narrative, SEO, trust, pricing, resources |
| **URL submission** | Input, validation, consent, captcha if needed |
| **Crawl / fetch job** | Playwright or HTTP fetch w/ safeguards; queue worker |
| **Extraction engine** | Deterministic parsers → structured `AuditFacts` |
| **Scoring / rules** | Weighted signals; thresholds; explainability snippets |
| **LLM report layer** | Prompt templates, structured JSON schema, model fallback |
| **Results UI** | Report page, print/PDF export, share link |
| **Industry router** | Map facts + user industry → playbook / CTAs |
| **Reputation intel** | Optional Places API / manual URL / compliance |
| **Lead & CRM** | Contact, booking, email capture post-report |
| **Admin** | Prompt version, model, kill switch, abuse monitoring |

---

## 18. Suggested system architecture

**Recommended direction (pragmatic):**

1. **Next.js** remains the **web app** + **API façade**.
2. **Audit jobs** are **async**: `POST /api/audit` enqueues job → returns `jobId`.
3. **Worker** (Node process, similar to `cloudnet-bot` patterns) consumes jobs, runs **Playwright**, writes **raw + extracted JSON** to storage (S3/R2/DB).
4. **Next route** `GET /api/audit/:id` or server component loads stored JSON + calls OpenAI **once** (or uses precomputed LLM result from worker).
5. **SSRF controls:** Allow only `http:`/`https:`; block private IPs; DNS rebinding checks; per-request timeout; max redirect count; optional domain allowlist for beta.

*Alternative MVP:* First version **without** Playwright-use **fetch + cheerio/readability** for static HTML only-with clear limitations; add Playwright when budget for worker infra exists.

---

## 19. Recommended component structure (future)

```
src/
  app/
    (marketing)/          # optional route group
    audit/
      page.tsx            # URL submission
      [jobId]/page.tsx    # results
    api/
      audit/
        route.ts          # create job
        [id]/route.ts     # poll status / result
  components/
    marketing/            # Hero, proof, pricing CTA
    audit/                # UrlForm, AuditProgress, ReportSections
    shared/               # Button, Card, layout shells
  lib/
    audit/
      validateUrl.ts
      extractDom.ts
      schema.ts           # Zod for AuditFacts + Report
      prompts.ts
```

Existing `IndustrySelectorPanel` can move under `audit/` or `shared/` once URL flow exists.

---

## 20. Phased implementation roadmap

| Phase | Scope | Outcome |
|-------|--------|---------|
| **0 - Orientation** | Update `businessInfo`, `docs`, README; remove or repurpose dead code (`PathPicker`); align nav copy | One coherent story |
| **1 - Product spine (no crawl)** | Homepage **URL input** + `POST /api/audit` stub returning mock structured JSON + **results page** shell | End-to-end UX fake |
| **2 - Real extraction MVP** | Fetch-based HTML parse + meta/title/h1/cta heuristics + Zod schema | Real **partial** facts |
| **3 - Playwright worker** | Queue + worker (see §18); store artifacts; pass facts to LLM | Richer signals |
| **4 - OpenAI structured report** | JSON schema, prompt versioning, eval fixtures | Owner-readable report |
| **5 - Hardening** | SSRF, abuse limits, logging, deletion/retention policy | Production-safe |
| **6 - Industry depth** | Industry pages, playbooks, internal linking | SEO + conversion |
| **7 - Reputation enrichment** | Places API or manual; legal review | Optional trust layer |
| **8 - Polish** | Analytics, A/B copy, PDF export, admin | Scale |

---

## 21. Immediate next actions

1. **Treat this file as source of truth** until `docs/PROJECT-TRACKER.md` is rewritten for the audit product.  
2. **Update `config/businessInfo.ts` and metadata** so nothing on the site contradicts “website growth audit.”  
3. **Decide MVP crawl strategy:** fetch-only vs Playwright worker (impacts infra timeline).  
4. **Remove or repurpose `PathPicker`** and evaluate dropping `framer-motion` if unused elsewhere.  
5. **Encode schemas in code:** Use [§6](#6-draft-data-model--schemas) as the contract; implement Zod in `src/lib/audit/schema.ts` before more UI churn.

**Deliberately not recommended yet:** Large visual redesign without the URL + results skeleton-otherwise the site stays “pretty marketing” without the product hook.

---

## 22. Open questions & assumptions

| Topic | Question |
|-------|-----------|
| **Hosting** | Will Playwright run on Vercel, a VPS, or a dedicated worker (Railway, Fly, ECS)? |
| **Legal** | Terms for crawling third-party sites; caching; GDPR; robots.txt respect. |
| **Google data** | Places API vs manual entry vs no enrichment in v1? |
| **Pricing** | Free audit tier vs paid depth; rate limits per IP. |
| **Report storage** | How long are reports retained; user accounts or anonymous job links? |

**Assumption:** OpenAI remains the LLM provider (`openai` package already in use); switching to another model is a config change later.

---

## 23. Reuse map (existing → future product)

**Complement:** [§10](#10-keep-vs-deprioritize-legacy-portfolio-identity) names what to **remove or shrink**; this table is what to **keep and wire**.

| Existing asset | Reuse for audit product |
|----------------|-------------------------|
| `HERO_INDUSTRIES` / `IndustrySelectorPanel` | Pre-fill industry context on audit form; route to industry playbooks |
| `tokens.css`, CSS Modules | Continue as design system |
| `POST /api/chat` + `ChatWidget` | **Optional** “Ask about your report” after v1 report exists; or deprecate to reduce noise |
| `POST /api/contact` + Firestore | Capture leads **after** report; add fields: `websiteUrl`, `auditJobId` |
| `StructuredData` / SEO routes | Extend with product-specific schema when audit pages exist |
| `cloudnet-bot` (reference) | Worker patterns, Playwright lifecycle, logging discipline |
| `chatrefrecne 2` (reference) | Ideas for deterministic routing + caching of FAQ answers **about** the product-not for crawl |
| `zod` + `ratelimit` | Apply to all new audit endpoints |
| `openai/config.ts` | Extend with structured-output helper for reports |

---

## 24. Document coverage & known omissions

**Is this audit “100% of everything”?** No. It is **developer-ready for the product pivot and main app**, not a line-by-line inventory of the entire machine. Treat the sections above as the **decision and gap list**; use this subsection as the **honesty boundary**.

### Explicitly in scope (verified against the repo)

- **`myprofile-site/`** - App Router pages, API routes, components, styles, Firebase admin/client wiring, chat + contact flows, SEO helpers, and build tooling as reflected in `package.json` / `next.config.ts`.
- **`Reference Folders/`** - How each reference bundle relates (or does not relate) to shipping code.
- **Cross-cutting risks** - Orphan components, dependency dead weight, crawl/Playwright hosting reality, and copy/config drift (`businessInfo` vs marketing).

### Called out here but not exhaustively “audited”

| Item | Notes |
|------|--------|
| **`next.config.ts`** | Documents **should** mention: Turbopack root, `images.remotePatterns`, **inline** `redirects`, and **security headers** (`Content-Security-Policy`, `X-Frame-Options`, etc.). These affect production behavior and third-party embeds (e.g. chat widgets). |
| **`myprofile-site/config/redirects/`** | `*.ts` files exist; **no import/reference** from `next.config.ts` was found - redirects in config are **currently unused** unless wired later. |
| **Root `SEO/`** | Keyword/research CSVs at repo root; **not** part of the Next app bundle. Useful for content strategy, easy to miss when searching only under `myprofile-site/`. |
| **`myprofile-site/public/`** | **Empty** at time of writing - any `businessInfo` image paths or static assets must be added or URLs updated. |
| **`middleware.ts`** | **Absent** - fine for now; note if you later need geo, auth gating, or bot protection at the edge. |
| **Tests** | `package.json` includes `vitest`; **no** `vitest.config.*` was found under `myprofile-site/` - test story is “scripts exist, config may be default/implicit or incomplete.” |
| **Formatting** | ESLint is configured; **no** Prettier config files were found - formatting may be editor-default only. |

### If you need “full coverage” later

Add a **mechanical appendix**: `tree` / file counts, `npm ls --depth=0`, and a one-page **threat model** (abuse of `/api/chat`, `/api/contact`, future `/api/audit`). That is orthogonal to this document’s purpose and was intentionally not duplicated here.

---

## Document maintenance

- **Owner:** Update this file when phases complete or architecture decisions change.  
- **Pair with:** A short `README.md` in `myprofile-site/` linking here for onboarding.

---

*End of audit.*
