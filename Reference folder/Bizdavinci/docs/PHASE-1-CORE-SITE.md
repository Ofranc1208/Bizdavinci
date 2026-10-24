# Phase 1 - Core Marketing Site (Homepage + Layout + Navigation)

> **Goal:** Ship the front-of-house website foundation - hero, skills, work, services, CTA, navbar, footer.  
> **Status:** 🔄 In Progress (visual polish pass)  
> **Estimated Time:** 3–5 days  
> **Depends On:** Phase 0 complete  
> **Gate:** Homepage renders fully responsive, all sections visible, navigation works, spacing rhythm feels premium on mobile and desktop.

---

## MVP Route List (This Phase)

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Page | Homepage (all sections) |
| `/privacy` | Page | Privacy policy (placeholder) |
| `/terms` | Page | Terms of service (placeholder) |

---

## Build Scope

### 1. Root Layout (`app/layout.tsx`)

- Geist + Geist Mono via `next/font`
- Global metadata (title template, OG defaults)
- `<Navbar />` + `<Footer />` + `{children}`
- Responsive shell for all pages

### 2. Homepage Sections (in order)

| # | Section | Component | Path |
|---|---------|-----------|------|
| 1 | Hero + Single CTA Card | `HeroSection.tsx` | `src/components/home/` |
| 2 | Skills / Tech Summary | `SkillsSection.tsx` | `src/components/home/` |
| 3 | Selected Work / Case Studies | `WorkSection.tsx` | `src/components/home/` |
| 4 | Services | `ServicesSection.tsx` | `src/components/home/` |
| 5 | Contact CTA | `CTASection.tsx` | `src/components/home/` |

### 3. Hero Spec (Current)

**Layout:** clean content-first hero with one primary conversion path
- Eyebrow + question-style H1
- Supporting subtitle
- Single CTA card with one clear action
- Avoid fake social-proof counters or inflated claims

**Tone:** premium, modern, direct (no hype/coupon style copy)

### 4. Projects / Case Studies Data

```typescript
// src/data/projects.ts
interface Project {
  id: string;
  title: string;
  description: string;
  industry?: string;
  tech: string[];
  image?: string;
  link?: string;
  featured?: boolean;
}
```

### 5. Layout Components

| Component | Path | Purpose |
|-----------|------|---------|
| `Navbar` | `src/components/layout/Navbar.tsx` | Responsive nav with mobile menu |
| `Footer` | `src/components/layout/Footer.tsx` | Links, copyright, cookie settings |

**Nav items (MVP):**

| Nav Item | Route / Action |
|----------|----------------|
| Home | `/` |
| Start Here | Links to `/contact` (PathPicker wiring in Phase 2) |
| Pricing | `/pricing` |
| Free Tools | `/tools` |
| Work | `/work` |
| Contact | `/contact` |

**Navbar behavior:**
- Desktop: horizontal links, 64px height
- Mobile: hamburger menu, 54px height
- SSR placeholder to prevent layout shift
- Sticky positioning with `z-index: var(--z-navbar)`

### 6. Design System Implementation

**Typography:**

| Element | Size | Weight | Color Token |
|---------|------|--------|-------------|
| H2 (Section) | 1.75rem | 700 | `--color-text` |
| H3 Large | 1.3rem | 600 | `--color-text` |
| Body | 1rem | 400 | `--color-text-muted` |

**Layout:**

| Property | Value |
|----------|-------|
| Container max-width | 1100px |
| Container padding | 3rem 1.5rem |
| Section rhythm | Controlled via page-level `gap` |
| Card padding | 2rem |
| Card border-radius | 12px |
| Card shadow | `0 1px 3px rgba(0,0,0,0.08)` |

**Responsive breakpoints:**

| Breakpoint | Width |
|------------|-------|
| Mobile | `< 768px` |
| Tablet | `≥ 768px` |
| Desktop | `≥ 1024px` |

**Grid:**
```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
```

### 7. Privacy + Terms Pages

Placeholder content with proper metadata. These are required for launch but content can be refined later.

---

## Component-to-Token Mapping

| Component | Token(s) |
|-----------|----------|
| Primary button | bg: `--color-primary`, hover: `--color-primary-hover`, text: `#fff` |
| Secondary button | bg: `--color-surface`, border: `--color-border`, text: `--color-text` |
| Links | color: `--color-primary`, hover: `--color-primary-hover` |
| Page bg | `--color-bg` |
| Cards | bg: `--color-surface`, border: `--color-border` |
| Input | bg: `--color-surface`, border: `--color-border`, focus: `--color-primary-light` |

---

## Animation Rules (CSS Only)

All hover and transition effects use CSS tokens:

```css
transition: all var(--transition-fast);    /* 0.15s ease */
transform: translateY(-2px);               /* card lift */
transform: translateY(-1px);               /* button lift */
```

No Framer Motion. No JavaScript animations.

---

## Test Checklist

| Check | Status |
|-------|--------|
| Hero renders with single primary CTA card | ✅ |
| No fake metrics/claims in hero copy | ✅ |
| Skills, Work, Services, CTA sections render | ✅ |
| Navbar responsive: desktop horizontal, mobile hamburger | ✅ |
| Footer renders with links and copyright | ✅ |
| Mobile spacing rhythm (390px) is clean and readable | 🔄 |
| Tablet (768px), Desktop (1024px) pass QA | 🔄 |
| Navigation links point to correct routes | ✅ |
| Privacy + Terms pages render with metadata | ✅ |
| All buttons use design tokens (no hardcoded colors) | ✅ |

## Gate Output

- Production-ready homepage foundation
- Responsive layout across all breakpoints
- Ready for Phase 2 (PathPicker + Chat)
