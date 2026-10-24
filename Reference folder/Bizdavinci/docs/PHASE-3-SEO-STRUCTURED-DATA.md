# Phase 3 - SEO Foundation + Structured Data + AI Crawlers

> **Goal:** Ensure discoverability - every page has unique metadata, structured data validates, sitemaps and robots work, AI bots are explicitly allowed.  
> **Status:** 🔄 In Progress  
> **Estimated Time:** 2–3 days  
> **Depends On:** Phase 2 complete  
> **Gate:** All pages have unique titles/descriptions, sitemap.xml and robots.txt resolve, JSON-LD validates, OG tags preview correctly.

---

## Build Scope

### 1. Universal Metadata Generator (`src/lib/seo/metadata.ts`)

Single function used by every page:

```typescript
export interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
  canonical?: string;
}

export function generateMetadata(options: MetadataOptions): Metadata { ... }
```

**Rules:**
- Strips duplicate branding from title
- Enforces 55-char max title (template adds " | Your Name")
- Generates canonical URL from `path`
- Produces matching OG + Twitter cards
- Optional `noindex` for 404, admin, draft pages

**Usage in any page:**
```typescript
export const metadata = generateMetadata({
  title: 'Contact',
  description: 'Get in touch to discuss your project.',
  path: '/contact',
});
```

### 2. SEO Config (`src/lib/seo/metadata.ts`)

```typescript
export const SEO_CONFIG = {
  siteName: 'Your Name',
  siteUrl: 'https://yourdomain.com',
  defaultOgImage: 'https://yourdomain.com/assets/images/og-image.png',
  twitterHandle: '@yourhandle',
  locale: 'en_US',
  author: 'Your Name',
} as const;
```

### 3. Keyword Database (`src/lib/seo/seoKeywords.ts`)

Centralized keyword file all pages pull from. See `docs/SEO-STRATEGY.md` for full strategy and data sources.

```typescript
export const keywordsByPageType = {
  homepage: { primary: ['freelance web developer', 'react developer for hire'] },
  tools: { primary: ['website cost estimator', 'web project planner'] },
  pricing: { primary: ['website development cost', 'website design pricing'] },
  contact: { primary: ['hire web developer', 'freelance developer contact'] },
};
```

### 4. Title Patterns

| Page | Title | Max chars |
|------|-------|-----------|
| Homepage | "Your Name - Full-Stack Engineer (React / TypeScript)" | Full |
| Contact | "Contact" | 7 |
| Pricing | "Pricing & Packages" | 20 |
| Tools index | "Free Tools for Business Owners" | 31 |
| Individual tool | "Website Cost Estimator" | 23 |
| FAQs | "Frequently Asked Questions" | 27 |
| 404 | "404 - Page Not Found" + `noindex: true` | 21 |

### 5. OG Image

- **Required file:** `public/assets/images/og-image.png`
- **Dimensions:** 1200 × 630 pixels
- **Content:** Name, title, brief value proposition
- **Validate:** [opengraph.xyz](https://www.opengraph.xyz)

### 6. Robots.ts (`app/robots.ts`)

Programmatic robots.txt with explicit AI bot allow rules:

```typescript
rules: [
  { userAgent: 'GPTBot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'Googlebot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'Bingbot', allow: '/', disallow: ['/api/*'] },
  { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api/*'] },
  { userAgent: '*', allow: '/', disallow: ['/api/*', '/admin'] },
]
```

### 7. Sitemap (`app/sitemap.ts`)

Priority-ranked pages:

| Route | Priority | Frequency |
|-------|----------|-----------|
| `/` | 1.0 | weekly |
| `/contact` | 0.9 | monthly |
| `/pricing` | 0.9 | weekly |
| `/tools` | 0.8 | weekly |
| `/tools/website-cost-estimator` | 0.8 | monthly |
| `/tools/timeline-planner` | 0.8 | monthly |
| `/work` | 0.7 | monthly |
| `/faqs` | 0.7 | monthly |
| `/learn/ai-automation` | 0.7 | monthly |
| `/privacy` | 0.3 | yearly |
| `/terms` | 0.3 | yearly |

Legal pages deliberately demoted to `0.3` so tool/conversion pages rank higher in crawl priority.

### 8. Structured Data (JSON-LD) - Orchestra Pattern

**Component:** `src/components/SEO/StructuredData.tsx`

```typescript
export function StructuredData({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Schemas to implement:**

| Schema | Where | Priority |
|--------|-------|----------|
| Organization | Root layout (global) | High |
| WebSite | Root layout (global) | High |
| Person | Homepage | High (E-E-A-T) |
| FAQPage | Pricing, FAQs | Medium (rich results) |
| BreadcrumbList | Tools, nested pages | Medium |
| ContactPage | `/contact` | Low |

**Schema files:**

```
src/lib/structured-data/
├── schemas.ts              # Central orchestrator
├── core/
│   ├── organization.ts
│   └── website.ts
├── person/
│   └── expertSchema.ts
├── content/
│   └── faq.ts
└── navigation/
    └── breadcrumb.ts
```

### 9. AI Crawler Files

**`public/llms.txt`** - Brand disambiguation for AI models. Tells ChatGPT, Claude, Perplexity how to describe and recommend you.

**`public/ai.txt`** - Training permissions and entity verification.

### 10. Redirect Architecture

```
config/redirects/
├── index.js                # Orchestrator
├── canonicalRedirects.js   # Typo fixes, old URLs
└── seoFixesRedirects.js    # 404 fixes from Search Console
```

---

## Test Checklist

| Check | Status |
|-------|--------|
| Every page has unique `<title>` under 55 chars | ☐ |
| Every page has unique `meta description` | ☐ |
| No two pages share the same description | ☐ |
| Canonical URL present on all pages | ☐ |
| OG tags preview correctly (opengraph.xyz) | ☐ |
| `/robots.txt` resolves and allows correct bots | ☐ |
| `/sitemap.xml` resolves and lists all pages | ☐ |
| JSON-LD validates (schema.org validator) | ☐ |
| `llms.txt` and `ai.txt` accessible at root | ☐ |
| Core Web Vitals pass (LCP < 2.5s, CLS < 0.1) | ☐ |

## Gate Output

- Search-ready technical SEO baseline
- AI crawlers explicitly allowed
- Structured data validates
- Ready for Phase 4
