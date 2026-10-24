# Comparison and visual refinement

Reviewed and implemented 2026-10-23. Scope: the owner's circled comparison problem, palette, readability and scrolling. Local frontend only.

## 1. Enter the homepage — improved

The initial wipe cut through the fictional business heading and left an awkward narrow image slice. Its handle sat on the artwork. The initial white surfaces also gave adjacent sections little visual distinction.

Changed: complete redesign shown first; controls placed below the artwork; ivory background, restrained indigo actions and more readable supporting text. Existing Manrope/DM Serif typography and local licensed photos retained.

Evidence: [before](01-before.png), [revised desktop](home-desktop.png), [revised phone](05-home-mobile.png).

## 2. Compare a design — improved

Before/After buttons and the two-position range switch between complete canvases. Home selects Before; End selects After. Pointer dragging was verified to change to After and update its accessible description. Side by side uses separate desktop canvases and stacks on mobile. Button targets are at least 44px tall. Corrected the original sample's small-screen line boxes so its lower content fits.

Evidence: [desktop dual view](03-desktop-both.png), [phone dual view](04-mobile-both.png), [redesign page](preview-desktop.png), [estimate on phone](quote-mobile.png). The desktop dual-view capture precedes the final button-height adjustment; the final homepage/preview screenshots include it.

## 3. Scroll and browse — improved

Native page scrolling retained with a subdued scrollbar. The explanation now uses a divided layout, followed by a sage collection surface and a deep-forest closing section. No nested scroll region was introduced in the comparison. The actual responsive app is the review destination; the fixed-width QA frame is only a test tool.

Evidence: [scrolling into collection](06-home-scroll.png), [closing section/footer](07-home-bottom.png), [desktop collection](examples-desktop.png), [phone collection](examples-mobile.png).

## Verification and limits

- All nine routes at 1440, 1024, 390 and 360px: 36 checks, no document-width overflow or broken images. [Measurements](layout-results.json).
- JavaScript syntax and five existing model tests pass. Existing estimate/proposal logic was not changed.
- Inspected saved desktop and phone captures, and exercised the actual page's native scrolling.
- Mobbin V7 informed separate comparison canvases; COLLINS informed warm, restrained composition. Exact sources and tokens are in [DESIGN.md](../../DESIGN.md).
- This is not a physical-device, cross-browser, screen-reader or conversion study. Small fictional website artwork demonstrates visual direction; its embedded navigation is not a real client website. All scores, prices and designs remain illustrative.

The observed clipping problem is resolved. Visual direction remains open to owner review; a premium aesthetic is not a certification that can be established by automated tests.
