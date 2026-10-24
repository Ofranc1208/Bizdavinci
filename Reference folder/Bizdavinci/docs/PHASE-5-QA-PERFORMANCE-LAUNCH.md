# Phase 5 - Final QA, Performance, Analytics & Launch

> **Goal:** Stabilize, verify accessibility, optimize performance, wire analytics, and ship with confidence.  
> **Status:** Not Started  
> **Estimated Time:** 3–5 days  
> **Depends On:** Phase 4 complete  
> **Gate:** No critical bugs, Lighthouse scores acceptable, all CTAs and lead paths functional, analytics events fire, deployment verified.

---

## Build Scope

### 1. Cross-Browser QA

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ☐ | ☐ |
| Edge | ☐ | ☐ |
| Safari | ☐ | ☐ |
| Firefox | ☐ | ☐ |

### 2. Accessibility Pass

| Requirement | Standard |
|-------------|----------|
| Color contrast | WCAG AA |
| Keyboard navigation | All forms, modals, tool steps |
| Focus management | Modal focus trap, return focus on close |
| Semantic HTML | Proper heading hierarchy, landmarks |
| Alt text | All images have descriptive alt |
| Form labels | All inputs have associated labels |
| Skip navigation | Skip-to-content link |

### 3. Performance Optimization

**Core Web Vitals targets:**

| Metric | Budget | What It Means |
|--------|--------|---------------|
| LCP | < 2,500ms | Main content loads fast |
| FID/INP | < 100ms | First interaction is instant |
| CLS | < 0.1 | Page doesn't jump around |
| FCP | < 1,800ms | Something visible quickly |
| TTFB | < 800ms | Server responds fast |

**Actions:**
- Verify all images use `next/image` with proper `sizes` and `priority`
- Confirm Firebase chunk is async-loaded (not on initial page load)
- Remove `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` from `next.config.ts`
- Run Lighthouse on all key pages
- Verify font optimization (Inter via `next/font`, no external requests)

### 4. Performance Optimizer Component

```typescript
// app/components/PerformanceOptimizer.tsx
'use client';

// Prefetches critical pages during idle time:
// /contact, /pricing, /tools
// Uses requestIdleCallback (non-blocking)
```

Add to `app/layout.tsx`.

### 5. Analytics & Tracking

**Stack:**

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Real visitor tracking (`<Analytics />`) |
| Vercel Speed Insights | Real performance monitoring (`<SpeedInsights />`) |
| GA4 | Core event tracking (gated behind cookie consent) |

**Core events to verify:**

| Event | Trigger |
|-------|---------|
| `cta_start_here_click` | User clicks Start Here |
| `tool_open` | User opens any tool |
| `tool_completed` | User reaches tool result |
| `tool_result_cta_chat` | User asks AI about results |
| `tool_result_cta_quote` | User requests quote from results |
| `pricing_package_click` | User clicks package CTA |
| `contact_submitted` | Contact form submitted |
| `chat_message_sent` | User sends chat message |

**Cookie consent integration:**
- GA4 only loads after `cookie-consent: accepted` in localStorage
- Vercel Analytics/Speed Insights are typically cookie-less (check compliance)
- Cookie consent banner at bottom of page (non-blocking)

### 6. Cookie Consent System

```
src/components/CookieConsent/
├── CookieConsent.tsx          # Banner UI
├── CookieConsent.module.css   # Styles
├── useCookieConsent.ts        # Hook: read/write localStorage
├── types.ts                   # ConsentStatus type
└── index.ts
```

**Behavior:**
- Non-intrusive bottom banner
- Two buttons: "Accept All Cookies" | "Decline"
- Footer link "Cookie Settings" re-shows banner
- Custom events: `cookieConsentAccepted`, `cookieConsentDeclined`

### 7. Error Monitoring (Optional)

- Sentry integration for runtime exceptions
- Capture API failures (`/api/chat`, `/api/contact`)
- Track tool calculation failures

### 8. Security Final Check

| Requirement | Status |
|-------------|--------|
| All API input validated with Zod | ☐ |
| User text sanitized before storing | ☐ |
| Firebase admin keys not exposed to client | ☐ |
| Rate limits on chat + contact endpoints | ☐ |
| No secrets in code or Git | ☐ |
| HTTPS enforced (Vercel auto) | ☐ |
| Honeypot on contact form | ☐ |
| `poweredByHeader: false` in next.config | ☐ |
| `ignoreBuildErrors` REMOVED from next.config | ☐ |

### 9. Deployment

**Platform:** Vercel (optimized for Next.js)

**Required env vars in Vercel dashboard:**

| Variable | Source |
|----------|--------|
| `OPENAI_API_KEY` | OpenAI dashboard |
| `NEXT_PUBLIC_FIREBASE_*` (6 vars) | Firebase console |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON |
| `UPSTASH_REDIS_REST_URL` | Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash dashboard |
| `NEXT_PUBLIC_APP_URL` | Your production domain |

**Vercel settings:**
- Framework: Next.js
- Node.js: 20.x
- Build: `npm run build`
- Output: `.next`

### 10. Post-Launch Verification

| Check | Method |
|-------|--------|
| Homepage loads on production URL | Browser |
| All nav links work (no 404s) | Click each link |
| Chat sends/receives messages | Manual test |
| Contact form submits to Firestore | Submit + check Firebase |
| Tools produce results | Complete each wizard |
| OG tags preview on social | Facebook Debugger |
| Sitemap accessible | `/sitemap.xml` |
| robots.txt accessible | `/robots.txt` |
| SSL/HTTPS active | Browser lock icon |
| Analytics events fire | GA4 realtime / Vercel dashboard |

---

## Routes NOT to Build (Post-Launch)

These return 404 until post-launch phases:

| Route | When to Build |
|-------|---------------|
| `/learn/business-efficiency` | Post-launch |
| `/learn/website-strategy` | Post-launch |
| `/blog` | Post-launch |
| `/tools/share/[id]` | Post-launch (shareable results) |

---

## Gate Review Template

| Item | Status | Notes |
|------|--------|-------|
| Scope completed | ☐ Pass / ☐ Fail | |
| Functional tests passed | ☐ Pass / ☐ Fail | |
| Responsive tests passed | ☐ Pass / ☐ Fail | |
| Accessibility checks passed | ☐ Pass / ☐ Fail | |
| Performance (Lighthouse) acceptable | ☐ Pass / ☐ Fail | |
| Security checklist complete | ☐ Pass / ☐ Fail | |
| Analytics verified | ☐ Pass / ☐ Fail | |
| Bugs fixed / deferred list | ☐ Complete / ☐ Pending | |
| Client sign-off | ☐ Approved / ☐ Changes requested | |

**If any item fails, phase remains open. Do not launch.**

## Gate Output

- Launch-ready release candidate
- All systems verified end-to-end
- Production deployment live
