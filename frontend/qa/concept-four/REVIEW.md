# Concept #4 — visual implementation review

Verified 2026-10-24 in the Codex in-app browser. Result: **passed for the requested static visual phase**.

## What changed

`homepagePaths()` in `components.js` now renders the selected “Three questions. Four clear options.” section. `app.js` places it immediately after the hero and before the industry strip; the previous photographic entry section is replaced, not duplicated. Scoped rules in `polish.css` provide responsive layout. Assets are local; provenance is in [ASSETS.md](../../ASSETS.md).

The four cards contain the exact requested offer names, starting prices, optional maintenance and feature lists. All four buttons are disabled. There are no links, downloads, API calls, event actions, new routes or backend connections from this section. Existing calculator figures remain unchanged.

## Verification evidence

- `npm run check`: passed.
- `npm test`: **22 passed, zero failed**. Includes model behavior, profession search aliases, escaping, frozen calculator pricing, inventory and static-server guards.
- Desktop viewport 1168 × 1000: four cards, identical heights (507.5625px), button tops aligned (817.625px). Exactly one section, immediately after `.hero`. Zero broken section images.
- Tablet viewport 820 × 1100: two equal columns.
- Mobile viewports 390 × 844 and 360 × 800: one column, adapted two-by-two choice indicator, no horizontal page overflow. Full mobile section inspected including every card and button.
- Browser error log was empty during the final check.
- [Preservation result](preservation-result.json): hero source hash matches its saved baseline; the non-home portion of `app.js` also matches. Concept work added no route or event handler. Prior profession expansion and separate workspace remediation remain present.
- [Measurements](measurements.json) record actual CSS viewport widths; native scrollbar space can reduce these relative to requested viewport dimensions.
- Directory search “financial advisor” returns the adviser profile and the relevant accountant profile. Earlier separate profession work is not a change introduced by Concept #4.

A temporary blank browser preview resolved on reload; no security protections were removed. The temporary diagnostic listener was removed before the final screenshots. No root cause was established for that transient preview issue.

## Visual comparison and deliberate differences

The supplied `bbte.jpg` and implemented desktop were viewed together. The four-column hierarchy, white/navy/blue palette, pale-blue free card, numbered rail, outlined paid buttons and handwritten annotation are retained. Desktop cards have more vertical breathing room to accommodate the written brief's longer feature text. Manrope remains the existing site font. The generated document uses a neutral cobalt motif instead of the reference's OpenAI logo. Tabler icons are close equivalents. A small “Visual preview” note explicitly explains inactive actions. The written brief's starting-price and optional-maintenance labels take precedence over shorter image copy. The rest of the site's existing ivory/indigo palette is preserved as requested.

## Captures

- [Desktop](desktop.png): complete section with surrounding navigation.
- [Mobile](mobile.png): full section crop at mobile width, all four cards.
- [Tablet](tablet.png): two-column layout viewport.

## Changed-file map

Implementation: `frontend/app.js`, `frontend/components.js`, `frontend/polish.css`.
Assets: `frontend/assets/free-prompt.png`, `frontend/assets/choice-icons/` (seven SVG icons and MIT license), `frontend/assets/fonts/Caveat-Variable.ttf`, `frontend/assets/fonts/Caveat-OFL.txt`.
Handoff: `docs/PRODUCT.md`, `docs/EXPERIENCE.md`, `docs/STATUS.md`, `docs/SOURCES.md`, `frontend/README.md`, `frontend/DESIGN.md`, `frontend/ASSETS.md`, `frontend/qa/VERIFICATION.md`, `Reference folder/PROJECT_REPORT.md`, this evidence folder and root `design-qa.md`.

No deployment. Review the visual design before a separate implementation phase for any card action.
