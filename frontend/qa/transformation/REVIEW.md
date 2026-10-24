# Transformation and scale

2026-10-23. Owner requested a stronger pass and specifically identified the unresolved transformation scale.

## 1. Homepage proportions — improved

Reduced desktop hero padding, comparison height and metric-card spacing. Tightened the editorial section's vertical spacing while retaining its photographs and hierarchy. [Before](01-before.png), [after](02-home.png).

## 2. Original to redesign — verified

The old two-position switch is replaced by a full-width native range, 0–100 in one-point increments. Moving it reveals the redesign over the original without resizing either website. At intermediate positions, a divider marks the revealed edge; partial clipping is expected during this interaction. The default still shows the complete redesign. Before/After and Home/End reach complete endpoints. Show both retains separate complete views. View larger opens the dedicated preview.

Keyboard checks at 0, 25, 50, 75 and 100 passed. At 25/50/75, both canvases measured exactly 692 × 461.328125px in the active browser viewport. Pointer dragging produced 77% redesign / 23% original. Show both revealed both canvases. [Measurements](reveal-checks.json), [dragged state](03-dragged.png).

## 3. Responsive layout — checked

Home, preview and quote at 1440, 1024, 390 and 360px: 12 checks, no horizontal document overflow or broken images. [Results](layouts.json). Saved desktop and mobile screenshots inspected. JavaScript syntax check passed. Existing calculation logic was not changed.

This is a local frontend demonstration. No production integration, old-project connection or additional external dependency was introduced. This is not a cross-browser or physical-device certification. Earlier no-divider/two-position documentation is superseded by the latest owner request and this implementation.
