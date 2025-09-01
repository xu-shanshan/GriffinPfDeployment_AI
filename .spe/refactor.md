create a new prototype following the established instructions and keeping the existing UI/UX design patterns. 

The new prototype will include:
1. Updated folder structure with timestamp
2. Consolidated shared assets (layout.js, improved mockData.js)
3. Enhanced pages with consistent UI/UX patterns
4. Better accessibility and responsive design
5. Improved navigation and state management
6. Align new timestamp prototype dashboard with legacy prototype UI, I like legacy prototype UI color scheme and data show styles
7. New prototype classes normalized to fluent-* prefix. Non‑fluent legacy class names removed from page markup.

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

Implemented dashboard content (prototype_20250901121530):
- Added stats cards (derived counts) with fluent-dashboard-* classes
- Added VE & Service favorite cards (truncation, overflow “… +X more”)
- Added footer summaries per favorite card
- Added sidebar favorites sync (visible subset) via layout.js syncSidebarFavorites()
- Extended common.css (badges + grids)
- Added page-specific dashboard.css styling

<!-- Let's create a empty dashboard page first.only contains sidebar and header -->

Let's implement the dashboard page with content area for new prototype .github/prototype_20250901121530.





you are a Interaction Designer/Visual Designer/UI/UX Designer，

Make the dashboard cards look more engaging and visually dynamic.
Right now, they look too rigid and flat. Add variety in layout, spacing, and visual accents to improve aesthetics and usability.

Dashboard visual upgrade (prototype_20250901121530):
- Added accent system (data-accent / fluent-stat-accent-* classes)
- Featured first stat card spans 2 columns on wide viewports
- Layered gradient + subtle pattern + animated shine (reduced-motion safe)
- Added micro trend chip + secondary label space

Continuation (prototype_20250901121530):
- Sidebar: collapse toggle, aria-current on active item, keyboard accessibility
- Added .fluent-sidebar-toggle + collapsed width behavior
- Added unified focus ring & helper utilities
- Enhanced layout.js (toggle, active nav setter, safe re-sync of favorites)


The sidebar can collapse and expand, but the right content area keeps the same width. It does not resize when the sidebar changes.

Enhancement: Sidebar collapse now dynamically adjusts content width
- Introduced CSS variable --sidebar-width consumed by .fluent-main-shell
- body.sidebar-collapsed overrides variable (64px desktop / 0px mobile)
- Smooth transition added for margin-left