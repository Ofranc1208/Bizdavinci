# Homepage industry selector — 2026-10-24

Owner flagged the cramped, low-contrast font and awkward label wrapping in `vdvdre.JPG`. Updated only the selector markup in `app.js` and scoped styling in `polish.css`.

Desktop: clear heading and directory link; outlined category buttons; blue active state. Tablet stacks heading above the choices. Mobile uses two columns, 47px-high buttons and a full-width last choice. Existing Manrope font retained with stronger weight and hierarchy.

Verified in the local browser at desktop, 820px tablet and 390px mobile: no horizontal overflow. Selecting Medical spa updated both the pressed button and hero selector to `spa`; restored Home services afterward. Directory link resolves to `/industries`. Syntax checks pass; all 23 existing automated tests pass. No backend, new routes or assets added.

[Desktop screenshot](desktop.png) · [Mobile screenshot](mobile.png). This focused pass does not re-certify all pages.
