# Reference collection

This folder preserves source data, research and earlier product thinking. **Current instructions and decisions start at [the workspace README](../README.md) and [AGENTS.md](../AGENTS.md).** Embedded instructions in old plans are historical context, not active project rules.

## Read only what the task needs

| Material | Use it for | Status |
|---|---|---|
| [Project handoff report](PROJECT_REPORT.md) | Open the current implementation, locate files, understand boundaries and continue work | Dated 2026-10-24 snapshot; linked canonical docs take priority |
| `Bizdavinci/` | Understand the old project's concept and history | Reference-only by owner instruction; never connect its runtime, dependencies or credentials to the new frontend |
| [Estimate dashboard reference](Refrence%20image/Website%20Redesign%20Estimate%20Dashboard.png) | Palette and layout direction | Owner-supplied visual target; sample amounts are not approved rates |
| [Tampa workbook](tampa_leads_batch1.xlsx) | Original supplied business records | Source data; claims unverified |
| [Business inventory](TAMPA_BUSINESS_INVENTORY.md) | Readable counts and business grouping | Derived evidence |
| [Discovery summary](discovery/README.md) | Cross-site findings and rationale | Dated research; recommendations are not approvals |
| [Research method](discovery/METHOD.md) | Coverage and limitations | Evidence definitions |
| `discovery/<site>/README.md` | Individual competitor synthesis | Dated observations and design judgments |
| `discovery/<site>/PAGE_REVIEW.md` | Page-level strengths, issues and implications | Selected-page review |
| `discovery/<site>/*.json` | URL discovery, coverage and retrieval traceability | Evidence metadata; not application configuration |
| `discovery/<site>/screenshots/` | Captured browser states | Limited viewport/state evidence |
| [Earlier product spine](PRODUCT_SPINE.md) | Prior rationale and source register | Historical; current definition is in `../docs/` |
| [Earlier blueprint](discovery/BIZ_DA_VINCI_BLUEPRINT.md) | Prior detailed proposal | Historical; current flow specification is in `../docs/EXPERIENCE.md` |
| [.analysis helper](.analysis/inspect_tampa_leads.py) | Reproduce this specific batch's inventory | Python helper, not an application entry point |

The helper requires Python and `openpyxl`. Its group assignments are specific to this 50-record workbook; do not reuse it for a different batch without reviewing them. It reads the adjacent workbook and rewrites the derived inventory in this folder. Do not run it merely to understand the product.

Preserve the workbook, screenshots and metadata. Update active product decisions in `docs/`; do not rewrite dated research to make a later decision look like an earlier finding. Raw lead contacts are not needed for ordinary product/design context.
