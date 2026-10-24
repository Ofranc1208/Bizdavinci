# Project Tracker - Freelancer Portfolio Website

> **Last Updated:** March 5, 2026  
> **Tech Stack:** Next.js 16 · React 19 · TypeScript 5 · OpenAI v6 · Firebase 12 · Vitest  
> **Deployment:** Vercel  
> **Spec Reference:** `docs/myprofile.md`

---

## Phase Overview

| Phase | Name | Status | Est. Days | Depends On | Doc |
|-------|------|--------|-----------|------------|-----|
| **0** | Foundation & Project Setup | ✅ Complete | 1–2 | - | [PHASE-0](./PHASE-0-FOUNDATION.md) |
| **1** | Core Marketing Site | 🔄 In Progress | 3–5 | Phase 0 | [PHASE-1](./PHASE-1-CORE-SITE.md) |
| **2** | PathPicker + Chat + Contact + Firebase | 🔄 In Progress | 5–7 | Phase 1 | [PHASE-2](./PHASE-2-CHAT-CONTACT-FIREBASE.md) |
| **3** | SEO + Structured Data + AI Crawlers | 🔄 In Progress | 2–3 | Phase 2 | [PHASE-3](./PHASE-3-SEO-STRUCTURED-DATA.md) |
| **-** | SEO Strategy & Keyword Research | ✅ Complete | - | - | [SEO-STRATEGY](./SEO-STRATEGY.md) |
| **4** | Tools Hub + Pricing System | 🔄 In Progress | 7–10 | Phase 3 | [PHASE-4](./PHASE-4-TOOLS-PRICING.md) |
| **5** | Final QA + Performance + Analytics + Launch | ⬜ Not Started | 3–5 | Phase 4 | [PHASE-5](./PHASE-5-QA-PERFORMANCE-LAUNCH.md) |

**Total estimated:** 21–32 days

---

## 2026-Stable Technology Stack

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Framework | Next.js | 16.1.6 | App Router, Turbopack, SSR/SSG |
| UI | React | 19.2.4 | Stable since Dec 2024 |
| Language | TypeScript | ^5 | Strict mode |
| AI | OpenAI SDK | ^6.25.0 | GPT-4o-mini via `chat.completions.create()` |
| Database (Client) | Firebase | ^12.10.0 | Firestore for inquiries |
| Database (Admin) | Firebase Admin | ^13.7.0 | Server SDK for API routes |
| Validation | Zod | ^4.3.6 | All API payloads |
| Rate Limiting | @upstash/ratelimit | ^2.0.8 | Serverless-compatible |
| Rate Limiting (Redis) | @upstash/redis | ^1.36.3 | Peer dep for ratelimit |
| Styling | CSS Variables + Modules | - | Zero dependencies |
| Testing | Vitest | ^4.0.18 | Unit tests |
| E2E Testing | Playwright | ^1.x | Optional |
| Linting | ESLint | ^9 | Flat config (eslint-config-next 16.x) |
| Formatting | Prettier | ^3.8.1 | - |
| Deployment | Vercel | - | Zero-config Next.js |

### Explicitly NOT Used

| Package | Reason |
|---------|--------|
| Framer Motion | CSS transitions only (saves ~60KB) |
| Tailwind CSS | CSS variables + modules (zero-dep) |
| Jest | Vitest is the 2026 standard |
| Axios | Native `fetch` in Next.js 16 |

---

## MVP Route Inventory (13 pages + 2 API routes)

| Route | Type | Phase | Status | Purpose |
|-------|------|-------|--------|---------|
| `/` | Page | 1 | 🔄 | Homepage |
| `/contact` | Page | 2 | ✅ | Lead capture form |
| `/pricing` | Page | 4 | ✅ | Packages + add-ons |
| `/tools` | Page | 4 | ✅ | Tools directory |
| `/tools/website-cost-estimator` | Page | 4 | ✅ | Cost estimator tool |
| `/tools/timeline-planner` | Page | 4 | ✅ | Timeline planner tool |
| `/tools/questionnaire-generator` | Page | 4 | ✅ | Project questionnaire |
| `/tools/automation-finder` | Page | 4 | ✅ | Automation opportunities |
| `/work` | Page | 4 | ✅ | Portfolio / case studies |
| `/learn/ai-automation` | Page | 4 | ⬜ | AI benefits (educational) |
| `/faqs` | Page | 4 | ⬜ | FAQ page |
| `/privacy` | Page | 1 | ✅ | Privacy policy |
| `/terms` | Page | 1 | ✅ | Terms of service |
| `/api/chat` | API | 2 | ✅ | Chat endpoint |
| `/api/contact` | API | 2 | ✅ | Contact form submission |

---

## Component Inventory

### Homepage (Phase 1)

| Component | Path | Status |
|-----------|------|--------|
| HeroSection | `src/components/home/HeroSection.tsx` | 🔄 |
| ProfilePhoto | `src/components/home/ProfilePhoto.tsx` | ⏭️ |
| SkillsSection | `src/components/home/SkillsSection.tsx` | 🔄 |
| WorkSection | `src/components/home/WorkSection.tsx` | 🔄 |
| ServicesSection | `src/components/home/ServicesSection.tsx` | 🔄 |
| CTASection | `src/components/home/CTASection.tsx` | 🔄 |

### Layout (Phase 1)

| Component | Path | Status |
|-----------|------|--------|
| Navbar | `src/components/layout/Navbar.tsx` | ✅ |
| Footer | `src/components/layout/Footer.tsx` | ✅ |

### PathPicker + Chat (Phase 2)

| Component | Path | Status |
|-----------|------|--------|
| PathPicker | `src/components/PathPicker/PathPicker.tsx` | ✅ |
| ChatModal | `src/components/chat/ChatModal.tsx` | ⬜ |
| ChatInterface | `src/components/chat/ChatInterface.tsx` | ⬜ |
| ChatBubble | `src/components/chat/ChatBubble.tsx` | ⬜ |
| ChatInputBar | `src/components/chat/ChatInputBar.tsx` | ⬜ |
| WelcomeSequence | `src/components/chat/WelcomeSequence.tsx` | ⬜ |
| TypingIndicator | `src/components/chat/TypingIndicator.tsx` | ⬜ |
| ContactForm | `src/components/contact/ContactForm.tsx` | ✅ |

### SEO (Phase 3)

| Component | Path | Status |
|-----------|------|--------|
| StructuredData | `src/components/SEO/StructuredData.tsx` | ✅ |

### Tools (Phase 4)

| Component | Path | Status |
|-----------|------|--------|
| ToolLayout | `src/components/tools/ToolLayout.tsx` | ⬜ |
| ToolCard | `src/components/tools/ToolCard.tsx` | ✅ |
| ToolResultCTA | `src/components/tools/ToolResultCTA.tsx` | ⬜ |
| CostEstimatorTool | `src/tools/cost-estimator/CostEstimatorTool.tsx` | ⬜ |
| TimelinePlannerTool | `src/tools/timeline-planner/TimelinePlannerTool.tsx` | ⬜ |
| QuestionnaireTool | `src/tools/questionnaire-generator/QuestionnaireGeneratorTool.tsx` | ⬜ |
| AutomationFinderTool | `src/tools/automation-finder/AutomationFinderTool.tsx` | ⬜ |

### Pricing (Phase 4)

| Component | Path | Status |
|-----------|------|--------|
| PackageCard | `src/components/pricing/PackageCard.tsx` | ⬜ |
| AddOnCard | `src/components/pricing/AddOnCard.tsx` | ⬜ |

### Shared (Phase 5)

| Component | Path | Status |
|-----------|------|--------|
| CookieConsent | `src/components/CookieConsent/CookieConsent.tsx` | ⬜ |
| PerformanceOptimizer | `app/components/PerformanceOptimizer.tsx` | ⬜ |
| LoadingScreen | `src/components/shared/LoadingScreen.tsx` | ⬜ |

---

## Config Files

| Config | Path | Phase | Status |
|--------|------|-------|--------|
| Site identity | `src/config/site.ts` | 0 | ✅ |
| Business profile | `src/config/businessInfo.ts` | 0 | ✅ |
| Pricing | `src/config/pricing.ts` | 4 | ✅ |
| Estimator math | `src/config/estimator.ts` | 4 | ✅ |
| OpenAI config | `src/lib/openai/config.ts` | 2 | ✅ |
| Rate limiting | `src/lib/ratelimit.ts` | 2 | ✅ |
| SEO keywords | `src/lib/seo/seoKeywords.ts` | 3 | ⬜ |
| Tool registry | `src/tools/registry.ts` | 4 | ✅ |
| Firebase client | `src/lib/firebase/config.ts` | 2 | ⬜ |
| Firebase admin | `src/lib/firebase/admin.ts` | 2 | ✅ |

---

## Hooks

| Hook | Purpose | Phase | Status |
|------|---------|-------|--------|
| `useChatMessages` | Messages state + orchestration | 2 | ⬜ |
| `useChatApi` | Fetch to /api/chat | 2 | ⬜ |
| `useContactForm` | Form state + validation + submit | 2 | ⬜ |
| `useAssistantModal` | Global modal state | 2 | ⬜ |
| `useCookieConsent` | Cookie consent state | 5 | ⬜ |

---

## Lib / Services

| Module | Path | Phase | Status |
|--------|------|-------|--------|
| Guardrails | `src/lib/chat/guardrails.ts` | 2 | ⬜ |
| Industry detector | `src/lib/chat/industryDetector.ts` | 2 | ⬜ |
| Knowledge base | `src/lib/prompts/knowledgeBase.ts` | 2 | ⬜ |
| System prompt | `src/lib/prompts/mainPrompts.ts` | 2 | ⬜ |
| Metadata generator | `src/lib/seo/metadata.ts` | 3 | ⬜ |
| Structured data schemas | `src/lib/structured-data/schemas.ts` | 3 | ⬜ |
| Fallback message | `src/lib/chat/fallback.ts` | 2 | ⬜ |

---

## Environment Variables Required

| Variable | Required For | Phase |
|----------|-------------|-------|
| `OPENAI_API_KEY` | Chat API | 2 |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase client | 2 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase client | 2 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase client | 2 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase client | 2 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase client | 2 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase client | 2 |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase admin (API routes) | 2 |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | 2 |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | 2 |
| `NEXT_PUBLIC_APP_URL` | Canonical URLs, OG | 0 |

---

## Key Decisions (Scope Guardrails)

| Decision | Rationale |
|----------|-----------|
| Light mode only in v1 | Ship fast; dark mode via `[data-theme]` later |
| CSS variables + modules (no Tailwind) | Zero-dependency styling, stable |
| No Framer Motion | CSS transitions only, saves ~60KB |
| OpenAI v6 (upgraded from spec's v4) | v6 stable, `chat.completions.create()` unchanged |
| Next.js 16 + React 19 | 2026 stable standard |
| Vitest (not Jest) | 2026 standard, native ESM, faster |
| Non-streaming chat (MVP) | Simpler; streaming can be added later |
| Plain text chat bubbles (MVP) | Zero XSS risk; markdown later |
| API-only Firestore writes | No client writes in v1 |
| No user auth in v1 | Contact form works without auth |
| No payment processing in v1 | Manual invoicing for now |
| PDF export post-MVP | Copy-to-clipboard first |

---

## Post-Launch Routes (Do NOT Build Before Launch)

| Route | When |
|-------|------|
| `/learn/business-efficiency` | Post-launch |
| `/learn/website-strategy` | Post-launch |
| `/blog` | Post-launch |
| `/tools/share/[id]` | Post-launch |

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ⬜ | Not started |
| 🔄 | In progress |
| ✅ | Complete |
| ❌ | Blocked |
| ⏭️ | Deferred |
