# Phase 0 - Foundation & Project Setup

> **Goal:** Create a stable baseline project with zero rework later.  
> **Status:** ✅ Complete  
> **Estimated Time:** 1–2 days  
> **Gate:** Project runs locally, no TS errors, global styles load, env vars configured.

---

## 2026-Stable Technology Stack (Verified March 5, 2026)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | App Router, Turbopack, SSR/SSG |
| **React** | 19.2.4 | UI components (stable since Dec 2024) |
| **TypeScript** | ^5 | Strict mode |
| **OpenAI** | `openai` ^6.25.0 | Chat API via `chat.completions.create()` (GPT-4o-mini) |
| **Firebase** | `firebase` ^12.10.0 | Client SDK - Firestore for inquiries |
| **Firebase Admin** | `firebase-admin` ^13.7.0 | Server SDK - API route writes |
| **Zod** | ^4.3.6 | Schema validation for all API payloads |
| **Upstash** | `@upstash/ratelimit` ^2.0.8 + `@upstash/redis` ^1.36.3 | Rate limiting (serverless-compatible) |
| **Vitest** | ^4.0.18 | Unit testing (2026 standard for Next.js) |
| **Playwright** | ^1.x | E2E tests (optional) |
| **ESLint** | ^9 | Flat config, Next.js 16 compatible |
| **Prettier** | ^3.8.1 | Formatting |

### What NOT to Install

| Package | Reason |
|---------|--------|
| `framer-motion` | Use CSS transitions only (saves ~60KB) |
| `tailwindcss` | Using CSS variables + CSS modules (zero-dep styling) |
| `jest` | Using Vitest instead (faster, native ESM) |
| `axios` | Use native `fetch` (built into Next.js 16) |

---

## Build Scope

### 1. Initialize Project

```bash
npx create-next-app@latest myprofile-site --typescript --tailwind=false --eslint --app --src-dir
cd myprofile-site
```

### 2. Install Dependencies

```bash
npm install openai@latest firebase@latest firebase-admin@latest zod@latest @upstash/ratelimit@latest @upstash/redis@latest
npm install -D vitest @testing-library/react prettier
```

### 3. Configure Path Aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Rule:** `@/` resolves to `src/*` only. Do not create `@/app/*` aliases.

### 4. Folder Structure (Scaffold)

```
myprofile-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── contact/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── work/page.tsx
│   │   ├── tools/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── learn/ai-automation/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── api/
│   │       ├── chat/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   ├── config/
│   │   ├── site.ts
│   │   └── businessInfo.ts
│   ├── data/
│   │   └── projects.ts
│   ├── types/
│   │   └── chat.ts
│   ├── lib/
│   ├── hooks/
│   └── tools/
├── config/redirects/
│   ├── index.ts
│   ├── canonicalRedirects.ts
│   └── seoFixesRedirects.ts
├── public/
├── .env.local.example
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

### 5. Environment Template (`.env.local.example`)

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (JSON string)
FIREBASE_SERVICE_ACCOUNT=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Global Design Tokens (`app/globals.css`)

```css
:root {
  /* Brand */
  --color-primary: #4f6df5;
  --color-primary-hover: #3d5bd9;
  --color-primary-light: #eef1fe;

  --color-bg: #fafafa;
  --color-bg-warm: #f6f7fb;
  --color-surface: #ffffff;

  --color-text: #3c4257;
  --color-text-strong: #0a0f1e;
  --color-text-muted: #6b7694;

  --color-border: #e4e7ee;

  /* Status */
  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-error: #dc2626;
  --color-info: #4f6df5;

  /* Chat (scoped) */
  --chat-primary: #4f6df5;
  --chat-surface: #ffffff;
  --chat-surface-secondary: #f8f9fc;
  --chat-text-primary: #3c4257;
  --chat-text-secondary: #6b7694;
  --chat-text-muted: #9ca3b8;
  --chat-border: #e4e7ee;

  /* Layout */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;

  /* Z-Index */
  --z-navbar: 100;
  --z-dropdown: 100;
  --z-modal-base: 10000;
  --z-cookie-banner: 9999;
}
```

### 7. Next.js Config (`next.config.ts`)

Key settings for Next.js 16:

- `trailingSlash: false` (canonical URLs)
- `poweredByHeader: false` (security)
- Image optimization with `webp` + `avif`
- Firebase async chunk splitting
- 1-year immutable cache headers for static assets
- Redirect orchestrator from `config/redirects/`

### 8. Site Config (`src/config/site.ts`)

Centralized stats and links - single source of truth for all site-wide values.

### 9. Business Info Config (`src/config/businessInfo.ts`)

Owner name, title, headshot path, services, industries served.

---

## Test Checklist

| Check | Status |
|-------|--------|
| `npm run dev` starts without errors | ✅ |
| No TypeScript compilation errors (`npx tsc --noEmit` clean) | ✅ |
| `npm run build` - zero errors, zero warnings | ✅ |
| `npm run lint` - zero errors | ✅ |
| All 15 pages return HTTP 200 | ✅ |
| Both API routes return HTTP 200 | ✅ |
| All 3 redirects return HTTP 308 | ✅ |
| `robots.txt` serves correctly with AI bot rules | ✅ |
| `sitemap.xml` serves correctly with 13 URLs | ✅ |
| Global CSS variables load in browser | ✅ |
| `.env.local.example` has all required keys | ✅ |
| Path alias `@/` resolves correctly | ✅ |
| Folder structure matches spec | ✅ |
| No secrets files committed (`.env*` in `.gitignore`) | ✅ |

## Gate Output

- Working baseline repo
- All config files in place
- Ready for Phase 1
