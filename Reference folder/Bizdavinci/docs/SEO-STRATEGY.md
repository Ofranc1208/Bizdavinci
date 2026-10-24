# SEO Strategy - Biz DaVinci (2026)

> **Goal:** Establish topical authority and capture high-intent leads through a 3-layer keyword strategy.  
> **Status:** Active  
> **Data Source:** `SEO/` folder (SEMrush exports)  
> **Primary Tools:** Keyword Magic Tool, Keyword Overview, Keyword Gap

---

## 1. Core Strategy Overview

We are targeting three distinct keyword groups to capture users at different stages of the funnel:

1.  **Money Keywords (High Intent):** Users ready to hire or buy.
2.  **Tool Keywords (Traffic Magnets):** Users looking for calculators/generators. High volume, easier to rank.
3.  **Educational Keywords (Authority):** Users asking "how-to" questions. Builds trust.

### Site Structure Alignment

| Section | Keyword Focus | Examples |
| :--- | :--- | :--- |
| **Homepage** | Broad service terms | `web developer`, `freelance developer` |
| **Pricing** | Cost-specific terms | `website development cost`, `design pricing` |
| **Tools** | Calculator/Generator terms | `website cost calculator`, `timeline planner` |
| **Learn/FAQ** | Question-based terms | `how much does a website cost`, `ai automation for business` |

---

## 2. Keyword Groups & Targets

### Group 1: High Intent (Money Keywords)
**Goal:** Direct conversion.  
**Target Pages:** `/pricing`, `/contact`, `/work`

| Keyword | Volume | KD % | Intent |
| :--- | :--- | :--- | :--- |
| `website development cost` | 590 | 48 | Info/Comm |
| `hire web developer` | 880 | 29 | Commercial |
| `custom website development` | ~300 | ~40 | Commercial |
| `website developer for small business` | ~200 | ~35 | Commercial |
| `automation consultant` | ~150 | ~30 | Commercial |

*Data Source: `SEO/hire-web-developer_broad-match_us_2026-03-05.csv`*

### Group 2: Tool Keywords (Traffic Magnets)
**Goal:** High-volume traffic entry points.  
**Target Pages:** `/tools/*`

| Keyword | Volume | KD % | Intent | Target URL |
| :--- | :--- | :--- | :--- | :--- |
| `website cost calculator` | 590 | 25 | Info/Comm | `/tools/website-cost-estimator` |
| `website cost estimator` | ~400 | ~25 | Info | `/tools/website-cost-estimator` |
| `project timeline calculator` | ~100 | ~20 | Info | `/tools/timeline-planner` |
| `website questionnaire generator` | ~50 | ~15 | Info | `/tools/questionnaire-generator` |
| `automation ideas for business` | ~100 | ~20 | Info | `/tools/automation-finder` |

*Data Source: `SEO/website-cost-calculator_broad-match_us_2026-03-05.csv`*

**Why this works:** Google favors "interactive" content like calculators. These pages often rank with lower domain authority than long-form articles.

### Group 3: Educational Keywords (Authority)
**Goal:** Answer questions and build trust.  
**Target Pages:** `/learn/*`, `/faqs`

| Keyword | Volume | KD % | Intent |
| :--- | :--- | :--- | :--- |
| `how much does a website cost` | 480 | 51 | Info |
| `ai automation for small business` | ~200 | ~30 | Info |
| `what pages should a business website have` | ~150 | ~20 | Info |
| `website planning checklist` | ~100 | ~15 | Info |

*Data Source: `SEO/website-development-cost_broad-match_us_2026-03-05.csv`*

---

## 3. Competitor Analysis

Do not compete with giants (Upwork, Fiverr) directly on broad terms. Compete with niche tools and specialized agencies.

### Direct Competitors to Analyze (Keyword Gap)
1.  **Webflow / Wix / Squarespace:** Analyze their "cost calculator" and "pricing" pages.
2.  **Toptal / Arc.dev:** Analyze their "hire developer" landing pages.
3.  **Niche Agencies:** Look for "automation consulting" firms.

### What to Look For
-   **Keywords:** What specific long-tail terms bring them traffic?
-   **Content Structure:** How do they structure their calculator pages?
-   **Backlinks:** Where are they getting links from?

---

## 4. Implementation Plan

### Phase 1: Foundation (Current)
-   [x] Create `SEO/` folder with raw data.
-   [x] Define keyword strategy (this doc).
-   [ ] Map keywords to specific routes in `sitemap.ts`.

### Phase 2: Content Creation
-   **Tools:** Ensure H1s and metadata on tool pages match Group 2 keywords exactly.
    -   *Example:* Title: "Free Website Cost Calculator 2026"
-   **Pricing:** Build the pricing page around "website development cost" queries.
-   **Learn:** Write FAQ answers targeting "People Also Ask" questions (Group 3).

### Phase 3: Technical SEO
-   **Schema:** Implement `SoftwareApplication` schema for tools (Calculator).
-   **Internal Linking:** Link from `/learn` articles to `/tools` (e.g., "Calculate your cost here").

---

## 5. The "Secret" Weapon: Question Keywords

In SEMrush Keyword Magic Tool, filter by **"Questions"**.
Target these in your FAQ section and blog posts.

**Examples:**
-   "How to build a website for my business"
-   "How much does a developer cost per hour"
-   "Is custom web development worth it"

---

**Note on 2026 Trends:**
-   **AI Overviews:** Informational queries often trigger AI summaries. Structured data (Schema) is critical to appearing here.
-   **Video:** "How-to" keywords often show video results. Consider embedding short explainers on `/learn` pages.
