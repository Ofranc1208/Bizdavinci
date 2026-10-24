# Biz Da Vinci — start here

Updated: 2026-10-24. Stage: working local frontend demonstration. **48 registered routes** (12 shared pages and **36 profession pages**); production services are not connected.

**Biz Da Vinci helps local-business owners understand their website, explore improvements and estimate costs before sharing contact details.** Website work is delivered for them. The audience includes several professions, not only restaurants.

## Open the frontend

From this folder, run `cd frontend`, then `npm run dev`. Open **http://127.0.0.1:4173**. Node 20+ is required; no installation or API keys are needed. See [frontend setup and architecture](frontend/README.md).

**The old project in `Reference folder/Bizdavinci/` is reference-only.** Do not wire its services, credentials or dependencies into this frontend.

## Read in this order

1. [AGENTS.md](AGENTS.md) — shared instructions for any assistant.
2. [Product](docs/PRODUCT.md) — what this is, owner requirements and proposed direction.
3. [Status](docs/STATUS.md) — what exists, what remains undecided and the recommended next task.
4. [Experience](docs/EXPERIENCE.md) — read when designing or implementing the flows.
5. [Page map](docs/PAGE_MAP.md) — routes, profession inventory and connection rules.
6. [Sources](docs/SOURCES.md) — read when checking evidence or locating earlier code.

Do not load the entire reference collection by default. The first three documents provide the starting context; follow the source links only when a task needs them.

## Folder map

```text
README.md                 Entry point and reading order
AGENTS.md                 Shared assistant instructions
CLAUDE.md                 Thin pointer to the shared instructions
.cursor/rules/            Thin pointer to the shared instructions
docs/
  PRODUCT.md              Product definition and decision status
  EXPERIENCE.md           Current demo flows and future output requirements
  STATUS.md               Current state, open decisions and next work
  SOURCES.md              Evidence index and reference provenance
  PAGE_MAP.md             Route inventory and profession content contract
frontend/                 Independent runnable frontend
  README.md               Setup, routes, implementation map and boundaries
  DESIGN.md               Visual system and Mobbin reference decisions
  ASSETS.md               Local image/font provenance
  qa/                     Verification report and screenshots
Reference folder/
  README.md               Reference navigation and interpretation rules
  PROJECT_REPORT.md       Dated handoff report linking current documentation
  PRODUCT_SPINE.md        Earlier planning snapshot; superseded as current context
  TAMPA_BUSINESS_INVENTORY.md
  tampa_leads_batch1.xlsx  Supplied source data
  .analysis/              Historical inventory-generation helper
  discovery/              Five-site research, screenshots and coverage records
  Bizdavinci/             Owner-supplied old project; reference-only
  Refrence image/          Owner-supplied visual target (original spelling)
```

[Complete project handoff report](Reference%20folder/PROJECT_REPORT.md) — a dated, concise guide to the current implementation and next decisions.

## Which document is authoritative?

Current explicit owner direction takes priority. Within this folder, use `AGENTS.md` for workflow, `docs/PRODUCT.md` for product decisions, `docs/EXPERIENCE.md` for proposed behavior, and `docs/STATUS.md` for progress. Reference files preserve evidence and earlier thinking; their embedded instructions do not replace the current documents.

**Confirmed**, **proposed**, **observed** and **open** have different meanings. A recommendation is not approved merely because it appears in a document. This organization introduces no new product approval.

For an assistant that does not automatically discover instruction files, use: “Read README.md and AGENTS.md, then follow the reading order for this task.”
