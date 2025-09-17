---
applyTo: '**'
---

# Static Prototype Generation Instructions (Refactored)

Authoritative rules for producing the plain HTML/CSS/JS prototype used as a bridge toward the React + Fluent UI implementation. Keep outputs minimal, deterministic, and directly openable via `file://` (no server, no build step).

## Output Location & Naming
- Root directory: `.github/prototype_<YYYYMMDDHHMMSS>/`
- Required subtree:
  - `shared/styles/common.css` (reset, vars/tokens, typography, spacing, colors)
  - `shared/styles/layout.css` (header, sidebar, layout grid, tables, utilities)
  - `shared/js/layout.js` (`injectHeader()`, `injectSidebar()`)
  - `shared/js/mockData.js` (mirrors slices of `.spec/ReleaseMapping.json` → ExpectedVEs, ExpectedServices, Services)
  - `pages/ve-list.html` + `ve-list.css`
  - `pages/ve-detail.html` + `ve-detail.css`
  - `pages/service-detail.html` + `service-detail.css`

## Page Shell (each HTML body)
```html
<div id="app-header"></div>
<div id="app-sidebar"></div>
<div id="app-content"></div>
```
Scripts appended in EXACT order (page-local script may follow):
```html
<script src="../shared/js/layout.js"></script>
<script src="../shared/js/mockData.js"></script>
<script>injectHeader();injectSidebar();</script>
```

## Data Model & Derivations
`mockData = { expectedVEsGroups:{...}, expectedServicesMap:{...}, servicesDetails:{...} }`
- `allVEs` = unique union of keys in `expectedServicesMap` + every VE listed within each group array in `expectedVEsGroups`.
- `servicesForVE(ve)` = `expectedServicesMap[ve] || []`.
- `serviceMeta(name)` = `servicesDetails[name]` (may be undefined).

## Page Behavior Contracts
1. `ve-list.html`
   - Show a filter `<input id="veFilter">` + table body `<tbody id="veTableBody">`.
   - Live `oninput` case‑insensitive substring filter on VE name.
   - Each row links to `ve-detail.html?ve=<VE_NAME>`.
   - If no matches → single full-width row: “No matches”.
2. `ve-detail.html`
   - Read `?ve=` param. Unknown → centered error + link back to list.
   - List service names (from `servicesForVE`) linking to `service-detail.html?service=<SERVICE_NAME>`.
   - If zero services → one row “No services registered”.
3. `service-detail.html`
   - Read `?service=` param. Unknown → error + back links.
   - Display: ServiceName, BuildType, BuildRoot, PpeVeName, IncrementalBuildPipelineId, MainlineBuildPipelineId (if present), BuildPathPattern (if present).
   - Provide back links to VE (if derivable) and VE list.

## JavaScript Rules
- Pure global scripts (no modules, bundlers, frameworks, or async unless essential).
- Place reusable logic locally first; **only** move shared fragments after 2nd usage and annotate original with `// candidate: shared`.
- Simple custom query param parsing (avoid heavy abstractions; may skip `URLSearchParams` explanation).

## CSS & Naming
- Shared selectors: `.fluent-<role>` (e.g., `.fluent-table`).
- Page-specific: `.fluent-<page>-<role>` (e.g., `.fluent-ve-list-row`).
- Provide utilities (spacing, layout) in `layout.css` once reused (do not over‑invent).
- Tables: full width, zebra or subtle hover styling.
- Responsive: fixed (or narrow) sidebar + fluid content; stack on small widths.

## Accessibility & UX
- Use semantic regions (`header`, `nav`, `main`, `section`).
- Visible focus styles (outline or high-contrast border).
- Add `aria-label` where link/button text is not self‑descriptive.
- Error / empty states centered, with actionable links.

## Error & Empty State Rules
- Unknown VE / Service → message block: title, brief text, link(s) back.
- `ve-list` no filter matches → “No matches” row.
- VE with zero services → “No services registered”.

## Acceptance Checklist
- Relative paths only (`../shared/...`), no absolute or external URLs for local assets.
- All required files present; no empty stubs.
- Works when double‑clicked in a browser (no network tooling required).
- Filter updates immediately on keystroke.
- Query param parsing functions correctly for valid/invalid values.
- No duplicated domain data between pages (single source = `mockData.js`).

## Workflow Phases
0. Plan (mental notes only)
1. Create timestamp root + `check.md`
2. Add `common.css`, `layout.css`
3. Add `layout.js`, `mockData.js`
4. Implement `ve-list` (filter + table)
5. Implement `ve-detail`
6. Implement `service-detail`
7. Promote duplicates → shared (CSS/JS)
8. Polish (a11y, contrast, finalize `check.md`)

## Post-Generation Validation
1. Open each page via `file://` & verify header/sidebar injected.
2. Confirm VE list count & navigation to VE and Service detail works.
3. Exercise filter (match, no match, clear) — states render correctly.
4. Verify service metadata fields display conditional fields only if present.
5. Contrast quick check (manual) & visible focus order.
6. Update `check.md` (implemented pages, promoted assets, remaining candidates) and optionally a short CHANGELOG snippet.

## Promotion Triggers
- 2+ identical color/spacing rules → move tokens/utility to `common.css` / `layout.css`.
- 2+ replicated DOM builder snippets → evaluate moving to a tiny helper (only after second appearance).

## Non‑Goals / Prohibited
- No React / Vue / frameworks, ES modules, bundlers, transpilers, or state libraries.
- No premature abstraction (single use stays local).
- No persistence, routing libraries, or dynamic imports.

## Output Formatting (Answer Response)
Group by:
1. `shared/styles`
2. `shared/js`
3. `pages/*.html`
4. `pages/*.css`
Return only file contents (concise, readable), no extra commentary.

---
End of instructions.