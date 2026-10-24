# Page map and content ownership

Updated: 2026-10-24. Canonical route inventory for the local frontend. Behavior: [EXPERIENCE.md](EXPERIENCE.md). Implementation: [frontend README](../frontend/README.md).

## Shared pages

| Route | Purpose | Content owner |
|---|---|---|
| `/` | Four service choices, free prompt download, comparison and concept highlights | `frontend/app.js` + `components.js` |
| `/what-we-do` | Review, design direction, managed implementation positioning and service-specific planning views | `frontend/pages.js` |
| `/industries` | Searchable, category-filtered directory of **36 professions** in **11 categories** | `frontend/pages.js` + `professions.js` |
| `/examples` | Five original design families; filterable collection | `frontend/app.js` + `data.js` |
| `/audit` | Fixed fictional review; never claims to analyze the supplied URL | `frontend/app.js` + `data.js` |
| `/preview` | Before/after, sample pages and style controls | `frontend/app.js` + `components.js` |
| `/quote` | Scope configuration and illustrative estimate | `frontend/app.js` + `model.js` |
| `/pricing` | Package comparison and optional care | `frontend/app.js` + `data.js` |
| `/about` | About Us: purpose, approach and principles | `frontend/app.js` |
| `/faq` | 12 answers in three categories; keyboard-accessible disclosures | `frontend/pages.js` |
| `/how-it-works` | Four-step demonstration journey | `frontend/app.js` |
| `/contact` | Optional local proposal draft and download | `frontend/app.js` + `model.js` |

### Service query views

`/what-we-do?service=refresh`, `/what-we-do?service=rebuild` and `/what-we-do?service=marketing` render `servicePlanPage()` using `serviceChoices` in `frontend/data.js`. Unknown service values fall back to the general page. These are views of an existing route, so the registered route count stays 48. Refresh and rebuild link to `/quote?package=essential` and `/quote?package=rebuild`. Valid package parameters select a sample package; manual selection updates the URL so refresh is consistent. Local prompt/brief downloads do not require additional routes. Interaction rules live in [Experience](EXPERIENCE.md).

## Profession pages

All **36** profession routes use `professionPage()` in `frontend/pages.js`. Each profile is authored in `frontend/professions.js`, with its own headline, introduction, three priorities, three free checklist questions, FAQ, concept identity, services and related professions. The authoritative slug list is `frontend/professions.js` (validated by `frontend/validate-content.mjs` and `frontend/tests/content-integrity.test.mjs`).

| Route | Profession | Design family |
|---|---|---|
| `/industries/dentists` | Dental practices | Dental |
| `/industries/medical-spas` | Medical spas | Spa |
| `/industries/plumbers` | Plumbers | Home services |
| `/industries/hvac` | Heating and cooling | Home services |
| `/industries/electricians` | Electricians | Home services |
| `/industries/salons` | Hair and beauty salons | Spa |
| `/industries/barbers` | Barbershops | Professional |
| `/industries/auto-repair` | Auto repair and detailing | Professional |
| `/industries/restaurants` | Restaurants and catering | Spa |
| `/industries/cafes` | Cafés and bakeries | Spa |
| `/industries/chiropractors` | Chiropractic practices | Healthcare |
| `/industries/medical-practices` | Medical practices | Healthcare |
| `/industries/accountants` | Accountants and advisers | Professional |
| `/industries/pet-services` | Pet grooming and care | Spa |
| `/industries/retailers` | Independent retailers | Spa |
| `/industries/computer-repair` | Computer repair and IT support | Professional |
| `/industries/tailors` | Tailors and alterations | Spa |
| `/industries/landscapers` | Landscapers and garden care | Home services |
| `/industries/financial-advisors` | Financial advisers and planners | Professional |
| `/industries/cpa-firms` | CPA firms | Professional |
| `/industries/bookkeepers` | Bookkeepers and payroll services | Professional |
| `/industries/tax-preparers` | Tax preparation practices | Professional |
| `/industries/insurance-agencies` | Independent insurance agencies | Professional |
| `/industries/mortgage-brokers` | Mortgage brokers and loan officers | Professional |
| `/industries/attorneys` | Law firms and attorneys | Professional |
| `/industries/real-estate-agents` | Real estate agents and brokers | Professional |
| `/industries/property-managers` | Property management firms | Professional |
| `/industries/architects` | Architectural practices | Professional |
| `/industries/interior-designers` | Interior designers | Spa |
| `/industries/roofers` | Roofing contractors | Home services |
| `/industries/cleaning-services` | Cleaning companies | Home services |
| `/industries/pest-control` | Pest control companies | Home services |
| `/industries/physical-therapists` | Physical therapy practices | Healthcare |
| `/industries/therapists` | Therapists and counseling practices | Healthcare |
| `/industries/veterinarians` | Veterinary practices | Healthcare |
| `/industries/tutors` | Tutors and learning centers | Professional |

These are curated starting points across the supplied business categories, not every possible profession or a one-to-one copy of the workbook's 38 labels. The directory has **11** browsing categories; those intentionally differ from the historical inventory's nine analytical groups. Design families control visual treatment, not eligibility or service specialization. A generated copy of this table lives in [ROUTE_INVENTORY.md](audits/biz-da-vinci-remediation/ROUTE_INVENTORY.md).

## Connection contract

```text
Home / shared navigation
  → Industries directory
    → /industries/<approved-slug>
      → /preview?profession=<slug>
      → /audit?profession=<slug>
      → /quote?profession=<slug>
        → /contact → local Markdown download
```

The query selects a profile and its design family; context persists in session storage through the subsequent journey. A visible notice identifies the current profession and fictional concept. Changing the general industry selector clears profession context and removes its query parameter. Reset clears app selections. Unknown profession routes return HTTP 404. Unknown query values are discarded.

Header: What We Do, Industries, Design Collection, Pricing, About Us, estimate CTA. Footer: every shared destination including FAQ and process. Profession pages link back to the directory and to three related profiles. The homepage industry-strip label also opens the directory.

## Adding a profession

1. Add a reviewed profile to `frontend/professions.js`; use a unique stable slug and an existing design family.
2. Write useful profession-specific content. Do not merely substitute a profession name into identical copy.
3. Reference an existing licensed asset or add a new asset with provenance in `frontend/ASSETS.md`.
4. Choose valid related slugs. The directory, route labels, local server and app renderer derive their routes from this registry.
5. Update this inventory, check direct entry and context handoff, run the documented checks, and record evidence.

These routes are client-rendered demonstration pages with `noindex,nofollow`. Static generation, production metadata, canonical URLs, sitemaps and indexability remain future work; slugs alone do not make this a production SEO system.
