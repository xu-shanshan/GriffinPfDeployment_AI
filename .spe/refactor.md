create a new prototype following the established instructions and keeping the existing UI/UX design patterns. 

The new prototype will include:
1. Updated folder structure with timestamp
2. Consolidated shared assets (layout.js, improved mockData.js)
3. Enhanced pages with consistent UI/UX patterns
4. Better accessibility and responsive design
5. Improved navigation and state management
6. Align new timestamp prototype dashboard with legacy prototype UI, I like legacy prototype UI color scheme and data show styles

layout.js:
- Unified layout.js (header + sidebar + favorites + active nav)
- Centralized mockData with derived aggregates + events
- Consistent fluent-* classes & responsive grids

dashboard.html:
- Consistent fluent-dashboard-* classes & responsive grids
Favorites UI keep with:
- two dashboard-favorite-card (VEs & Services).
- dashboard-favorite-card
  - dashboard-favorite-card-header
  - dashboard-favorite-card-content
  - dashboard-favorite-card-footer Implement truncation logic (show latest N; older collapsed into an overflow card with “… +X more”).
- Sync sidebar favorites with visible subset (cap total).

sidebar styles:
- Consistent use of fluent-* classes
- Responsive design for different screen sizes
- Improved spacing and alignment for better readability
- Reference to the old prototype design

New prototype scaffold:
- Folder: .github/prototype_20250901121530/
- Added shared assets (tokens, layout, mockData stub, layout.js)
- Created empty dashboard page (header + sidebar only) ready for iterative content build

Added (new prototype only):
- Introduced fluent-* layout aliases: .fluent-container, .fluent-grid-stats, .fluent-grid-favorites, .fluent-grid-auto
- Added gap design tokens (--gap-sm/md/lg) in new prototype common.css
- Dashboard page updated to use .fluent-container alongside legacy .web-container

Update: New prototype classes normalized to fluent-* prefix (sidebar, header, layout, utilities). Non‑fluent legacy class names removed from page markup.

Let's create a empty dashboard page first.only contains sidebar and header

only change new prototype code